import pandas as pd
import mongoConnector as mg
from pprint import pprint
from maps.geo import addressToGeo

connector = mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc")
class placeReccomendations:
	def __init__(self,user,address):
		self.user = user
		self.address = address

	def getTripsandPlaces(self):
		trips = connector.queryTrip(self.user)
		alltrips = []
		places = []
		for trip in trips:
			for place in trip['places']:
				place['types'] = place['types'][0]
				places.append(place)
			alltrips.append(trip)
		tripdf = pd.DataFrame(alltrips)
		placesdf = pd.DataFrame(places)
		newtripdf = tripdf[['rating','trip_name','distance']].copy()
		newplacedf = placesdf[['price_level','name','types','user_rating','id']].copy()
		x = newplacedf.groupby(["types"]).mean()
		print(x)
		# print(newtripdf.shape)
		# print(newplacedf.shape)
		# print(newtripdf.columns)
		# print(newplacedf.columns)
		# print(newtripdf.info())
		# print(newplacedf.info())
		# print(newtripdf)
		# print(newplacedf)
		return(newtripdf,newplacedf)

	#filter places by lattitude and longitude for the places and give like a 2 mile location
	def 

	def getTestingPlaces(self):
		testdata = []
		curCoordinates = addressToGeo(address)
		places = connector.getPlaces()
		userplaces = self.getTripsandPlaces()[1]
		for place in places:
			for userplaceid in userplaces['id']:
				if(place['id'] != userplaceid):
					testdata.append(place)
		pprint(testdata)

	def reccomendations(self):
		pass

if __name__ == "__main__":
	reccomender = placeReccomendations('goat','269 Amsterdam Ave, New York, NY 10023')
	reccomender.getTripsandPlaces()
	# reccomender.train()
