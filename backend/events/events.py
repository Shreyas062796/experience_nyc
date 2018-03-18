import bs4
import requests
import json
from datetime import datetime

DEBUG = True
# make this a library to get events for a person

web_link = "https://www.eventbriteapi.com/v3/events/search/?location.within=6mi&location.latitude=40.785416&location.longitude=-73.963165&token="


# ========================
# Globals

BASE_LINK = "https://www.eventbriteapi.com/v3/events/search/?token=3PLRBVBROECU3VJOPGUY"
WEB_LINK = "https://www.eventbriteapi.com/v3/events/search/?token=3PLRBVBROECU3VJOPGUY"


DEFAULT_KEYWORDS = ['music', 'dance', 'convention', 'exercise']
# ========================



# force the location to decrese the amount of results
# have some of this data cached but allow the user to query
# some of it themselves
def setParams(latitude, longitude, within=5, pages=1,  query=None, sortby= None, price=None, period_start=None, period_end=None):
	global WEB_LINK

	# need to sanitize these inputs to raise error if param is invalid
	lat = "&location.latitude={}".format(latitude)
	lng = "&location.longitude={}".format(longitude)
	lwithin = "&location.within={}mi".format(within)
	
	WEB_LINK += lat+lng+lwithin

	# setup will grow as we allow for more params
	if sortby:
		WEB_LINK+="&sort_by={}".format(sortby)
	if query:
		WEB_LINK+="&q={}".format(query)
	if price:
		WEB_LINK+="&price={}".format(price)

	# add querys late on as needed
	if query:
		WEB_LINK+="&q={}".format(query)

	# print(WEB_LINK)
	data = requests.get(WEB_LINK)
	print(data.text)



def main():
	if DEBUG:
		print("DEBUG MODE ON")
		setParams(40.785416,-73.963165)


if __name__ == '__main__':
	main()





