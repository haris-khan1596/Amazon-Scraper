import requests
from bs4 import BeautifulSoup
import time
from .model import Product

class AmazonScraper:
    BASE_URL = "https://www.amazon.com/s?k={query}&page={page}"
    
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            "Accept-Language": "en-US, en;q=0.5",
            "Accept-Encoding": "gzip",
            "Connection": "keep-alive",
            "max-age": "0",
            }

    def scrape(self, query):
        results = []
        for page in range(1, 21):
            url = self.BASE_URL.format(query=query, page=page)
            print("Requesting %s" % url)
            try:
                response = requests.get(url, headers=self.headers)
            except requests.exceptions.ConnectionError:
                print("No internet connection. Check your connection and try again.")
                return None
            except requests.exceptions.Timeout:
                print("Connection timed out. Check your connection and try again.")
                return None
            except requests.exceptions.RequestException as e:
                print("Error occurred: %s" % e)
                return None
            if response.status_code != 200:
                continue
            soup = BeautifulSoup(response.content, 'html.parser')
            products = self.parse_page(soup)
            print("Found %d products on page %d" % (len(products), page))
            results.extend(products)
            time.sleep(1)  # to prevent getting blocked
        return results

    def parse_page(self, soup):
        items = []
        for product in soup.select('.s-main-slot .s-result-item'):
            title = product.select_one('h2 a span')
            reviews = product.select_one('.a-row.a-size-small span')
            price = product.select_one('.a-price-whole')
            image_url = product.select_one('.s-image')
            
            if title and price:
                items.append(Product(
                    title.get_text(strip=True),
                    reviews.get_text(strip=True) if reviews else '0',
                    price.get_text(strip=True),
                    image_url['src'] if image_url else None,
                    time.strftime('%Y-%m-%d %H:%M:%S')
                )
                )
        return items
