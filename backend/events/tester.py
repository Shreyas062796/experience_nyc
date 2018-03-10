from bs4 import BeautifulSoup
import requests


nl = 'https://www.newyorker.com/goings-on-about-town/night-life'

nyev = 'https://www.nyc.com/events/'


def savedata(link):
	r = requests.get(nyev)

	soup = BeautifulSoup(r.text, 'html.parser')
	data = soup.prettify()

	# with open('data.txt', 'w') as File:
	# 	File.write(data)

	# mydivs = soup.find_all("div", {"class": "col-sm-9 col-xs-12 eventsbody"})

	# mydivs = soup.find_all("div", {"class": "col-sm-9 col-xs-12 eventsbody"})
	# mydivs = soup.find_all("p", {"class": "nyc-mobile-hidden"})

	events = soup.find("li", {"itemtype": "http://schema.org/Event"})
	# <li class="" itemscope="" itemtype="http://schema.org/Event">
	
	# mydates = soup.find("div", {"class", "col-sm-9 col-xs-12 eventsbody"})
	# mydivs = soup.find_all("p", {"class": "nyc-mobile-hidden"})
	
	# with open("cotester.txt", "w") as ofo:
	# 	ofo.write(mydates.prettify())


	print(len(events))
	# print("{}:\t{}".format(mydates[0], mydivs[0]))
	# print(soup.title)





savedata(nyev)

# print(soup.findAll("div", {"class": "listing grid-item component is-happening-today"}))
# divs = soup.findAll("div", {"id": "app"})
# print(divs[0].findAll("div", {"class": "listing grid-item component is-happening-today  "}))

# for row in soup.find_all('div', attrs={'class': 'listing grid-item component is-happening-today'}):
# 	print(row.text)



# ad = soup.find_all("div", {"class": "listing grid-item component is-happening-today"})
# print(type(ad[1]))
# adl = ad[0]
# print(adl[0])

# print(dir(adl[0]))
# for i in range(len(adl)):
	# print(adl[i].find_all("div"), {"class": "listing grid-item component is-happening-today"})



# for i,j in ad[1].items():
	# print("{}:  {}".format(i,j))

#FOR FILTERING.PY

# from filtering import Filtering
# import places


# ex_lat = 40.7831
# ex_lng = 73.9712


# dFilter = Filtering(ex_lat, ex_lng)
# dFilter.getBars()

# places = dFilterfilterby(dPlaces.bars)
# [print("{}:\t{}".format(key,val)) for key,val in places.items()]

