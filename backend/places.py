import googlemaps
from pprint import pprint
'''
coor_list is a list of lat, long respectivly
a radius is the radius (in meters) to a maximum of 50,000m/50 km


this is for later
for other than bars and restaurants
there are more, these are the relevant ones
'''
<<<<<<< HEAD
google_types = ['amusement_park', 'bakery', 'cafe', 'clothing_store', 'convenience_store', 'department_store', 'florist', 'hair_care', 'library', 'movie_theater', 'museum', 'night_club', 'bar', 'restaurant', 'stadium', 'store', 'zoo']
=======

>>>>>>> 37ff80fd04574e31bbd42da84f83fa1359d270d8

google_types = ['amusement_park', 'bakery', 'cafe', 'clothing_store', 'convenience_store', 'department_store', 'florist', 'hair_care', 'library', 'movie_theater', 'museum', 'night_club', 'bar', 'restaurant', 'stadium', 'store', 'zoo']
class NYCPlaces:
	def __init__(self,key,lat,lng):
		self.key = key
		self.lat = lat
		self.lng = lng
	def setClient(self):
		gmap = googlemaps.Client(key="AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o")
		return(gmap)

	def getNYCRestaurants(self):
		gmap = setClient()
		return(gmap.places("restaurant",location=[40.7831,-73.9712],type="restaurant"))

	def getNYCRestaurants(self):
		gmap = setClient()
		return(gmap.places("restaurant",location=[40.7831,-73.9712],type="restaurant"))

	# get restaurants in a area based on coordinates
	def getNYCRestaurantsByLoc(self,coor_list, aradius=5000):
		gmap = setClient()
		return(gmap.places('restaurant', location=coor_list,type="restaurant", radius=aradius))

	def getNYCBars(self):
		gmap = setClient()
		return(gmap.places("bar",location=[40.7831,-73.9712],type="bar"))

	# get bars in an area based on coordinates
	def getNYCBarsByLoc(self,coor_list, aradius=5000):
		gmap = setClient()
		return(gmap.places("bar",location=coor_list,type="bar", radius=aradius))

if __name__ == "__main__":
	getNYCRestaurants()
	getNYCBars()
