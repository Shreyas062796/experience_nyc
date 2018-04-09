
import googlemaps
import time
from pprint import pprint
from datetime import datetime
'''
coor_list is a list of lat, long respectivly
a radius is the radius (in meters) to a maximum of 50,000m/50 km
this is for later
for other than bars and restaurants
there are more, these are the relevant ones
'''

def getNYCBars():
	# AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o
	obj = NYCPlaces("AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A", 40,-73)
	return(obj.getNYCBars())

place_types = [
	'amusement_park', 
	'bakery',
	'bar', 
	'book_store',
	'bowling_alley',
	'cafe', 
	'casino',
	'clothing_store', 
	'convenience_store', 
	'department_store', 
	'florist', 
	'hair_care', 
	'home_goods_store',
	'jewelry_store',
	'library', 
	'meal_takeaway',
	'movie_theater', 
	'museum', 
	'night_club', 
	'painter',
	'park',
	'restaurant', 
	'shopping_mall',
	'stadium', 
	'store', 
	'zoo'
]

# 3 points in manhattan
coors_manhatan = [(40.733588, -73.993926), (40.780789, -73.973756), (40.813667, -73.935647)]
# coors_manhatan = [(40.733588, -73.993926)]

class NYCPlaces:
	def __init__(self,key,lat,lng):
		self.key = key
		self.lat = lat
		self.lng = lng


	def setClient(self):
		#AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o
		gmap = googlemaps.Client(key=self.key)
		return(gmap)

	def getAllPlaces(self):
		gmap = self.setClient() # client setter
		allPlaces = {} # to store the data
		# initialize all values for when you load them in
		for place in place_types:
			allPlaces[place] = list()

		for coors in coors_manhatan:
			for place in place_types:
				# ok so i have to go around the limitation of google
				reply = gmap.places("", location=[coors[0],coors[1]],type=place, radius=3219)
				results = reply['results']
				
				# this will check if there is an extra page, allowing me to get upto 60 places
				next_page_token = ""
				time.sleep(2) # have to wait for key to be up
				while next_page_token != "DONE":
					try:
						next_page_token = reply['next_page_token']
						reply = gmap.places('',page_token=str(next_page_token))
						results.extend(reply['results'])
						time.sleep(2) # have to wait for key to be up
					except KeyError:
						next_page_token = "DONE"

				allPlaces[place].extend(results) # 2 miles
				print("finished: {} found: {} current time: {}".format(place, len(allPlaces[place]), datetime.now()))
		# print total amount of places
		count = 0
		for place in allPlaces:
			for location in allPlaces[place]:
				count+=1
		# create a set of unique places
		places_set = dict()
		for place in allPlaces:
			for location in allPlaces[place]:
				places_set[location["id"]] = location
		# this can be avoided if you optimize the first loop
		# come back to it later

		#return dictionary containing all places in random order
		return(places_set)
	
	# get restaurants in a area based on coordinates
	def getNYCRestaurantsByLoc(self,coor_list, aradius=5000):
		gmap = self.setClient()
		return(gmap.places('restaurant', location=coor_list,type="restaurant", radius=aradius))

	def getNYCByLoc(self,coor_list, aradius=5000):
		gmap = self.setClient()
		return(gmap.places('restaurant', location=coor_list,type="restaurant", radius=aradius))

	# get bars in an area based on coordinates
	def getNYCBarsByLoc(self,coor_list, aradius=5000):
		gmap = self.setClient()
		return(gmap.places("bar",location=coor_list,type="bar", radius=aradius))

if __name__ == "__main__":
	places = NYCPlaces('AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A',40.7831,-73.9712)
	# places.getNYCRestaurants()
	# places.getNYCBars()
	places.getAllPlaces()
