import googlemaps
import sys
import json

geoencodingkey = "AIzaSyDcnc92jRlww69hL1IA_CXHyh7xo-D9VeI"

def addressToGeo(addressStr):
	gmap = googlemaps.Client(key = geoencodingkey)	
	loc = gmap.geocode(addressStr)

	# FOR NOW JUST RETURN THE FIRST OPTION FOUND
	location = loc[0]

	returnLoc = dict()

	returnLoc['place_id'] = location['place_id']
	returnLoc['lat'] = location['geometry']['location']['lat']
	returnLoc['lng'] = location['geometry']['location']['lng']
	returnLoc['name'] = location['formatted_address']

	# print(returnLoc)
	return(returnLoc)

# addressToGeo(sys.argv[1])



#although this function is in the filtering class
# it will most likely change and i want to preserve it

# this is accomplished using the haversine formula (using the radius of earth in km)
# assumes earth is a sphere, 0.5% error range
def coorDistance(latitude, longitude, to_lat, to_lon, units='kms'):
	R = 6373.0 # approximate radius of earth

	# equation works in radians
	lat1 = radians(latitude)
	lon1 = radians(longitude)
	lat2 = radians(to_lat)
	lon2 = radians(to_lon)

	dlat = lat2-lat1
	dlon = lon2-lon1

	# haversine formula
	a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
	c = 2* atan2(sqrt(a), sqrt(1-a))
	distance = R*c

	if units=='miles':
		#1km = 0.621371 miles
		distance = distance * 0.621371

	return distance