import json

class Product:
    def __init__(self, title, reviews, price, image_url, scrape_date):
        self.title = title
        self.reviews = reviews
        self.price = price
        self.image_url = image_url
        self.scrape_date = scrape_date

    def to_dict(self):
        return {
            'title': self.title,
            'reviews': self.reviews,
            'price': self.price,
            'image_url': self.image_url,
            'scrape_date': self.scrape_date
        }
class ProductEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Product):
            return obj.to_dict()
        return super(ProductEncoder, self).default(obj)
