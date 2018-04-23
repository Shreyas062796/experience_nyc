import googlemaps
from pprint import pprint
import requests, time
from datetime import datetime 
'''
coor_list is a list of lat, long respectivly
a radius is the radius (in meters) to a maximum of 50,000m/50 km
this is for later
for other than bars and restaurants
there are more, these are the relevant ones
'''

# def getNYCBars():
# 	# AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o
# 	obj = NYCPlaces("AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A", 40,-73)
# 	return(obj.getNYCBars())

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
		gmap = self.setClient()
		allPlaces = {}
		placeType = ['amusement_park','bakery']#,'cafe','clothing_store','convenience_store','department_store','florist','hair_care','library','movie_theater','museum','night_club','bar','restaurant','stadium','store','zoo']
		for place in placeType:
			allPlaces[place] = gmap.places(place,location=[self.lat,self.lng],type=place)
		return(allPlaces)

	
	def getAllNewPlaces(self):
		# coors_manhatan = [(40.733588, -73.993926)]#, (40.780789, -73.973756), (40.813667, -73.935647)]
		coors_manhatan = [(40.733588, -73.993926), (40.780789, -73.973756), (40.813667, -73.935647), (40.710143, -74.006097), (	40.70509,-74.008639), (40.709342, -74.012954), (40.777055, -73.981867), (40.762841,-73.965388), (40.760024, -73.982554), (40.762017,-73.993197), (40.746847,-73.986331), (40.737266,-74.00373), (40.72365,-73.983131), (40.739693,-73.989139), (40.786212,-73.954336), (40.800031,-73.964121), (40.801374,-73.945582)]

		place_types = ['bakery', 'bar','book_store','bowling_alley','cafe','casino','library','meal_takeaway','movie_theater', 'museum','night_club','park','restaurant','shopping_mall','stadium','store','zoo']
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
			# create a set of unique places

		# get a unique set of data
		places_id_list = list()
		for place in allPlaces:
			for location in allPlaces[place]:
				places_id_list.append(location["place_id"])
		places_set = set(places_id_list)

		# get the details of everything
		places_details = list()
		print("total places = {}".format(len(places_set)))
		counter = 0
		for an_id in places_set:
			url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + an_id + '&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A'
			req = requests.get(url)
			places_details.append(req.json())
			counter+=1
			if counter%50==0:
				print("Done with {} details".format(counter))

		return(places_details)

	def getAllDetailPlaces(self):
		gmap = self.setClient()
		allPlaces = []
		placeType = ['amusement_park','bakery','cafe','clothing_store','convenience_store','department_store','florist','hair_care','library','movie_theater','museum','night_club','bar','restaurant','stadium','store','zoo']
		for ty in placeType:
			placesbytype = gmap.places(ty,location=[self.lat,self.lng],type=ty)
			for place in placesbytype['results']:
				url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place['place_id'] + '&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A'
				req = requests.get(url)
				allPlaces.append(req.json())
		return(allPlaces)

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
	places.getAllNewPlaces()
	# places.getNYCRestaurants()
	# places.getNYCBars()
	# places.getAllPlaces()
