import googlemaps
from pprint import pprint
'''
coor_list is a list of lat, long respectivly
a radius is the radius (in meters) to a maximum of 50,000m/50 km
this is for later
for other than bars and restaurants
there are more, these are the relevant ones
'''

def getNYCBars():
	obj = NYCPlaces("AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o", 40,-73)
	return(obj.getNYCBars())


google_types = ['amusement_park', 'bakery', 'cafe', 'clothing_store', 'convenience_store', 'department_store', 'florist', 'hair_care', 'library', 'movie_theater', 'museum', 'night_club', 'bar', 'restaurant', 'stadium', 'store', 'zoo']
class NYCPlaces:
	def __init__(self,key,lat,lng):
		self.key = key
		self.lat = lat
		self.lng = lng


	def setClient(self):
		#AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o
		gmap = googlemaps.Client(key=self.key)
		return(gmap)

	def getNYCRestaurants(self):
		gmap = self.setClient()
		return(gmap.places("restaurant",location=[self.lat,self.lng],type="restaurant"))

	def getNYCCafes(self):
		gmap = self.setClient()
		return(gmap.places("cafe",location=[self.lat,self.lng],type="cafe"))

	def getNYCBars(self):
		gmap = self.setClient()
		return(gmap.places("bar",location=[self.lat,self.lng],type="bar"))

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
	places = NYCPlaces('AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o',40.7831,-73.9712)
	places.getNYCRestaurants()
	places.getNYCBars()
