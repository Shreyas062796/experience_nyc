import googlemaps
from pprint import pprint
'''
coor_list is a list of lat, long respectivly
a radius is the radius (in meters) to a maximum of 50,000m/50 km


this is for later
for other than bars and restaurants
there are more, these are the relevant ones
'''
google_types = ['amusement_park', 'bakery', 'cafe', 'clothing_store', 'convenience_store', 'department_store', 'florist', 'hair_care', 'library', 'movie_theater', 'museum', 'night_club', 'bar', 'restaurant', 'stadium', 'store', 'zoo']


def setClient():
    gmap = googlemaps.Client(key="AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o")
    return(gmap)


def getNYCRestaurants():
    gmap = setClient()
    return(gmap.places("restaurant",location=[40.7831,-73.9712],type="restaurant"))

# get restaurants in a area based on coordinates
def getNYCRestaurantsByLoc(coor_list, aradius=5000):
	gmap = setClient()
	return(gmap.places('restaurant', location=coor_list,type="restaurant", radius=aradius))


def getNYCBars():
	gmap = setClient()
	return(gmap.places("bar",location=[40.7831,-73.9712],type="bar"))

# get bars in an area based on coordinates
def getNYCBarsByLoc(coor_list, aradius=5000):
	gmap = setClient()
	return(gmap.places("bar",location=coor_list,type="bar", radius=aradius))


if __name__ == "__main__":
    getNYCRestaurants()
    getNYCBars()
