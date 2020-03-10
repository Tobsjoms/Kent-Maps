import csv
import requests
from bs4 import BeautifulSoup as bs
import codecs


url = requests.get("https://www.cs.kent.ac.uk/people/index.html#Canterbury")
soup = bs(url.content, 'html.parser')

filename = "/Users/Tobsjoms/desktop/names.csv"
csv_writer = csv.writer(open(filename, 'w'))


for tr in soup.find_all("tr"):
    data = []
    # for headers ( entered only once - the first time - )
    for th in tr.find_all("th"):
        data.append(th.text.encode("ascii" , "ignore"))
    if data:
        print("Inserting headers : {}".format(','.join(data)))
        csv_writer.writerow(data)
        continue

    for td in tr.find_all("td"):
        if td.a:
            data.append(td.a.text.strip().encode("ascii" , "ignore"))
        else:
            data.append(td.text.strip().encode("ascii" , "ignore"))
    if data:
        print("Inserting data: {}".format(','.join(data)))
        csv_writer.writerow(data)
