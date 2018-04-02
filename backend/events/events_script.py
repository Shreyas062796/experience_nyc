import requests
import sys
import time
import json

from pymongo import *

"""
These are geocodes for Manhattan area,
starting less than a mile from the george washington bridge
until south of battery park
restricting to this area for now to limit the data
"""
# Loc | LAT | LONG
TOP_LEFT = [40.850074, -73.947387]
TOP_RIGHT = [40.835389, -73.878768]
BOTTOM_LEFT = [40.701147, -74.040328]
BOTTOM_RIGHT = [40.687712, -74.002422]

# Remove the token later on
EVENT_LINK = "https://www.eventbriteapi.com/v3/events/search/?token=3PLRBVBROECU3VJOPGUY"
VENUE_LINK = "https://www.eventbriteapi.com/v3/venues/:id/?token=3PLRBVBROECU3VJOPGUY"

DEFAULT_KEYWORDS = ['music', 'dance', 'convention', 'exercise', 'sports', 'concerts']




class getEvents:

	def __init__(self):
		self.geocode = "location.viewport.northeast.latitude={0}&location.viewport.northeast.longitude={1}&location.viewport.southwest.latitude={2}&location.viewport.southwest.longitude={3}"
		self.events = list()


	def getEventsOfTheDay(self):
		today_events = list()
		rectangle = self.geocode.format(TOP_LEFT[0], TOP_LEFT[1], BOTTOM_RIGHT[0], BOTTOM_RIGHT[1])
		request_link = EVENT_LINK + "&start_date.keyword=today&sort_by=best"

		data = requests.get(request_link)
		events = data.json()

		pages = events['pagination']['page_count']
		documents = events['pagination']['object_count']
		today_events.extend(events['events'])

		print("pages: {}".format(pages))
		print("documents: {}".format(documents))


		# for page in range(2, pages+1):
		# 	print("Page number is #{} and size of db is: {}".format(page, len(self.events)))

		# 	new_request = request_link+"&page={}".format(page)
		# 	new_data = requests.get(new_request)

		# 	today_events.extend(new_data.json()['events'])
		# 	time.sleep(0.01)

		# get at max 100 events less if there is not that much
		if int(pages)>1:
			new_request = request_link+"&page=".format(2)
			new_data = requests.get(new_request)

			today_events.extend(new_data.json()['events'])
			time.sleep(0.01)

		today_events = [event for event in today_events if event['start']['timezone']=='America/New_York']

		return today_events


	def getEverythingIn(self):
		rectangle = self.geocode.format(TOP_LEFT[0], TOP_LEFT[1], BOTTOM_RIGHT[0], BOTTOM_RIGHT[1])

		temp = "&start_date.keyword=this_week"
		rectangle+=temp 

		request_link = EVENT_LINK + "&" + rectangle

		data = requests.get(request_link)

		pages = data.json()['pagination']['page_count']
		print("found a total of {} pages, or documents".format(pages))
		print(data.json()['pagination']['object_count'])


		self.events.extend(data.json()['events'])

		for page in range(2, pages+1): #pages+1 
			
			new_request = request_link+"&page={}".format(page)
			new_data = requests.get(new_request)

			self.events.extend(new_data.json()['events'])
			print("Page number is #{} and size of db is: {}".format(page, len(self.events)))
			time.sleep(0.01)

		print("All have been added")

		print(sys.getsizeof(self.events))


		# this is code to isert the initial batcj of data into the db
		# mc = cm.mongoConnector('ds123619.mlab.com', '23619', 'admin2', 'admin2', 'enyc')
		mc = ConnectMongo('ds123619.mlab.com', '23619', 'admin2', 'admin2', 'enyc')
		db = mc.clientConnect()
		mc.initialPopulate(self.events)
		
		# cm = ConnectMongo('ds123619.mlab.com', '23619', 'admin2', 'admin2', 'enyc')
		# cm.initialPopulate(self.events)
		# cm.seeIf()

	def venueInfo(self, venue_id):
		return requests.get(VENUE_LINK.replace(":id", str(venue_id))).json()

# this is for testing, repeating old code
class ConnectMongo:
	def __init__(self,clientHost,clientPort,username,password,database):
		self.clientHost = clientHost
		self.clientPort = clientPort
		self.username = username
		self.password = password
		self.database = database

	def clientConnect(self):
		connection = 'mongodb://' + str(self.username) + ':' + str(self.password) + '@' + str(self.clientHost) + ':' + str(self.clientPort) + '/' + str(self.database)
		client = MongoClient(connection).enyc
		return(client)


	def initialPopulate(self, alist):
		db = self.clientConnect()

		# db.events.insert_many(alist)
		for item in alist:
			# print(item)
			db.events.insert_one(item)


# this is to initialize the event data
def initialPopulate():
	ge = getEvents()
	# print(ge.getEverythingIn())
	# ge.seeIf()

# initialPopulate()
# print(getEvents().getEventsOfTheDay())


