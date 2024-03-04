from bs4 import BeautifulSoup
import requests


def _get_html_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup


def _get_content_from_page(soup: BeautifulSoup):
    p = soup.find_all('p')
    raw_text = [raw.text.strip() for raw in p if len(raw.text.split()) > 30]
    return "".join([_remove_quotations(text) for text in raw_text])


def _remove_quotations(text):
    return text.replace('’', '') \
        .replace('‘', '') \
        .replace('“', '') \
        .replace('”', '') \
        .replace("'", '')


def get_webpage_content(url: str) -> str:
    soup = _get_html_page(url)
    return _get_content_from_page(soup)
