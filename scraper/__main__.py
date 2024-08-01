from .scraper import AmazonScraper
from .utils import save_data, read_queries

def main():
    queries = read_queries('user_queries.json')
    print(queries)
    scraper = AmazonScraper()
    print("Scraping...")
    for query in queries:
        print(f"Query: {query}")
        data = scraper.scrape(query)
        if data is None:
            print("No data found. Skipping...")
            break
        print("\n\n\nSaving...")
        save_data(query, data)

if __name__ == "__main__":
    main()