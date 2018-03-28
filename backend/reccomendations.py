import pandas as pd
import mongoConnector as mg
from pprint import pprint
from maps.geo import addressToGeo

connector = mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc")
class placeReccomendations:
	def __init__(self,user):
		self.user = user

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
		# print(newtripdf.shape)
		# print(newplacedf.shape)
		# print(newtripdf.columns)
		# print(newplacedf.columns)
		# print(newtripdf.info())
		# print(newplacedf.info())
		# print(newtripdf)
		print(newplacedf)
		return(newtripdf,newplacedf)

	#run the machine learning for all the places and if its in a 2 mile radius then it should
	#return

	def getPlacesInRadius(self,address):
		reccomendedplaces = []
		curCoordinates = addressToGeo(address)
		print(curCoordinates)
		places = connector.getPlacesInRadius(curCoordinates['lat'],curCoordinates['lng'],2)
		userplaces = self.getTripsandPlaces()[1]
		for place in places:
			for userplaceid in userplaces['id']:
				if(place['id'] != userplaceid and place not in reccomendedplaces):
					reccomendedplaces.append(place)
		pprint(reccomendedplaces)
		return(reccomendedplaces)
	#every user is going to have an address and filter what the 
	#user likes based on what they like

	
if __name__ == "__main__":
	reccomender = placeReccomendations('goat')
	# reccomender.getPlacesInRadius('269 Amsterdam Ave, New York, NY 10023')
	reccomender.getTripsandPlaces()