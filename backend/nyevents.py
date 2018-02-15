from mytoken import *
import bs4
import requests
import json


DEBUG = True

# make this a library to get events for a person

web_link = "https://www.eventbriteapi.com/v3/events/search/?location.within=6mi&location.latitude=40.785416&location.longitude=-73.963165&token="


# ========================
# Globals

BASE_LINK = "https://www.eventbriteapi.com/v3/events/search/?"
WEB_LINK = ""

EVENTS = dict()
HEADER = dict()
# ========================

# ========================
#SETUP FOR WHEN IMPORTING
try:
	WEB_LINK= BASE_LINK + mytoken.the_token # github safety
except AttributeError:
	print("nycevents: Could not find token to authenticate")
	raise AttributeError()
# ========================


def getEventSample(amount):
	global g_events

	sample = list()

	for event in range(amount):
		print(g_events[event])


# Exclusily for eventbrite

# let n = total number of pages, each page will have 
# at least 50 entries if n > 1

def getEvents(pages=1):
	global WEB_LINK
	global g_events, g_header

	# r will be a bytestring
	r = requests.get(WEB_LINK) # get request to website
	# print(r.status_code)
	my_json = r.content.decode('utf-8') 
	data = json.loads(my_json) # we now have an iterable python dictionary

	g_header = data['pagination']
	g_events = data['events']

	# add code later to create a list of dics where each item contains the 
	# events of about 50 events since now I'm only getting the reply from 1 page



def setParams(latitude, longitude, within=5, sortby= None, query=None, price=None, period_start=None, period_end=None):
	global WEB_LINK
	global g_events, g_header
	# need to sanitize these inputs to raise error if param is invalid

	lat = "&location.latitude={}".format(latitude)
	lng = "&location.longitude={}".format(longitude)
	lwithin = "&location.within={}".format(within)
	
	# basic vars
	WEB_LINK = lat+lng+lwithin

	# setup will grow as we allow for more params
	if sortby:
		WEB_LINK+="&sort_by={}".format(sortby)
	if query:
		WEB_LINK+="&q={}".format(query)
	if price:
		WEB_LINK+="&price={}"format(price)
	



def main():
	if DEBUG:
		pass


if __name__ == '__main__':
	main()