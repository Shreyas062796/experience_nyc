import pandas as pd
import mongoConnector as mg
from pprint import pprint

class placeReccomendations:
	def __init__(self,user):
		self.user = user

	def getTrips(self):
		trips = mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").queryTrip(self.user)
		alltrips = []
		places = []
		for trip in trips:
			for place in trip['places']:
				places.append(place)
			alltrips.append(trip)
		tripdf = pd.DataFrame(alltrips)
		placesdf = pd.DataFrame(places)
		newtripdf = tripdf[['rating','trip_name','distance']].copy()
		newplacedf = placesdf[['price_level','name','types','user_rating']].copy()
		# print(newtripdf.shape)
		# print(newplacedf.shape)
		# print(newtripdf.columns)
		# print(newplacedf.columns)
		# print(newtripdf.info())
		# print(newplacedf.info())
		# print(newtripdf)
		print(newplacedf)
		return(newtripdf)
	#filter places by lattitude and longitude for the places and give like a 2 mile location



if __name__ == "__main__":
	reccomender = placeReccomendations('goat')
	reccomender.getTrips()

