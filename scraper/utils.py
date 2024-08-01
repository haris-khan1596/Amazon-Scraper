import json
from .model import ProductEncoder

def read_queries(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)
def save_data(query, data):
    with open(f'data/{query}.json', 'w') as f:
        json.dump(data, f, cls=ProductEncoder, indent=4)