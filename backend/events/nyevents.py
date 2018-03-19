from mytoken import *
import bs4
import requests
import json
from datetime import datetime


DEBUG = False

# make this a library to get events for a person

web_link = "https://www.eventbriteapi.com/v3/events/search/?location.within=6mi&location.latitude=40.785416&location.longitude=-73.963165&token="


# ========================
# Globals

BASE_LINK = "https://www.eventbriteapi.com/v3/events/search/?"
WEB_LINK = ""


DEFAULT_KEYWORDS = ['music', 'dance', 'convention', 'exercise']


EVENTS = dict()
HEADER = dict()
# ========================

# ========================
#SETUP FOR WHEN IMPORTING
try:
	WEB_LINK= BASE_LINK + "token=" + the_token # github safety
except AttributeError:
	print("nycevents: Could not find token to authenticate")
	raise AttributeError()
# ========================


# rework for when you have an array of dicts (each dict will be a page)
def getEventSample(amount):
	global EVENTS

	sample = list()

	for event in range(amount):
		print(EVENTS[event])


# Exclusily for eventbrite

# let n = total number of pages, each page will have 
# at least 50 entries if n > 1

def getEvents(pages=1): # RIGHT NOW STICK TO ONE PAGE TO MINIMIZE TIME
	global WEB_LINK
	global EVENTS, HEADER

	# r will be a bytestring
	r = requests.get(WEB_LINK) # get request to website
	# print(r.status_code)
	my_json = r.content.decode('utf-8') 
	data = json.loads(my_json) # we now have an iterable python dictionary


	HEADER = data['pagination']
	EVENTS = data['events']

	# Unpacking info
	page_size = HEADER['page_size']
	page_count = HEADER['page_count']
	page_number = HEADER['page_number']
	object_count = HEADER['object_count']


	print(HEADER)
	# add code later to create a list of dics where each item contains the 
	# events of about 50 events since now I'm only getting the reply from 1 page


# force the location to decrese the amount of results
# have some of this data cached but allow the user to query
# some of it themselves
def setParams(latitude, longitude, within=5, keyword=None, sortby= None, query=None, price=None, period_start=None, period_end=None):
	global WEB_LINK
	global EVENTS, HEADER

	# need to sanitize these inputs to raise error if param is invalid
	lat = "&location.latitude={}".format(latitude)
	lng = "&location.longitude={}".format(longitude)
	lwithin = "&location.within={}".format(within)
	
	WEB_LINK = lat+lng+lwithin

	# setup will grow as we allow for more params
	if sortby:
		WEB_LINK+="&sort_by={}".format(sortby)
	if query:
		WEB_LINK+="&q={}".format(query)
	if price:
		WEB_LINK+="&price={}".format(price)
	

	# add querys late on as needed
	if keyword:
		WEB_LINK+="&q={}".format(keyword)


def main():
	if DEBUG:
		nt = datetime.now()
		getEvents() #right now averages about 3 seconds to make a single request to a page, this should be the thing that works
		# on cache
		print(datetime.now()-nt)


if __name__ == '__main__':
	main()	