from mytoken import *
import bs4
import requests
import json

# ========================
# Globals
web_link = "https://www.eventbriteapi.com/v3/events/search/?location.within=6mi&location.latitude=40.785416&location.longitude=-73.963165&token="

g_events = dict()
g_header = dict()
# ========================


# for this example let me use eventbrite

#this is for coordinates in central park 6 mile radius

def grabKeys():
	global web_link
	web_link+= the_token # github safety



# as of now this will only request a single page and will
# only have about 50 events
def getEvents():
	global g_events, g_header

	# r will be a bytestring
	r = requests.get(web_link) # get request to website
	# print(r.status_code)
	my_json = r.content.decode('utf-8') 
	data = json.loads(my_json) # we now have an iterable python dictionary

	g_header = data['pagination']
	g_events = data['events']

def getEventSample(amount):
	global g_events

	sample = list()

	for event in range(amount):
		print(g_events[event])



# print(data['events'][0])
# data = json.loads(my_json)

def main():
	grabKeys()
	getEvents()
	getEventSample(2)



if __name__ == '__main__':
	main()

