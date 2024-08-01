# Amazon Scraper

## Description
A Python script to scrape product details from Amazon based on a list of search queries. It includes a React frontend to display the data.

## Components
There are three components:
1. Scraper
2. Output
3. React App 
### Scraper
In this Component, we have used following libraries of python:
1. `Requests` For sending requests to Amazon link to get the desired pages from where we can Scrape
1. `BeautifulSoup` from `bs4` To easily parse the data from the desired page. This library helps to access components from the html very easy.
1. `Json` To store fetched data into the data folder. To read data from user_queries and convert them into python list for further execution
### Output
This module store output of scraped data into `data` folder in different json files.
### React App
Frontend to show the data which we scraped:
`Screenshots`

## How to use
This is the guide on how to use different components.
### Scraper
1. Update `user_queries.json` on which data you want to scrape. Example:
    ```json
    [
    "Speakers",
    "Tablet",
    "Laptop"
    ]
    ```
1. First make an virtual enviroment (Optional)
    ```bash
    python -m venv venv
    ```
2. Activate enviroment (Optional)
   - Windows cmd
    ```bash
    "venv/Scripts/activate"
    ```
    - Linux Terminal
    ```bash
    ./venv/Scripts/activate
    ```
3. Install Python Packages
    ```bash
    pip install -r requirements.txt
    ```
4. Run Python Script
    ```bash
    python -m scraper
    ```
