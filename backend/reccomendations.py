import pandas as pd
import mongoConnector as mg
from pprint import pprint
import lib.getKeywords as key
from maps.geo import addressToGeo

connector = mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc")
keywords = key.GetKeywords("AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o")
class Reccomendations:
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
		newplacedf = placesdf[['price_level','name','types','user_rating','id','rating']].copy()
		newplacedf['counts'] = newplacedf.groupby('types')['rating'].transform('count')
		# print(newtripdf.shape)
		# print(newplacedf.shape)
		# print(newtripdf.columns)
		# print(newplacedf.columns)
		# print(newtripdf.info())
		# print(newplacedf.info())
		# print(newtripdf)
		return(newtripdf,newplacedf)

	#run the machine learning for all the places and if its in a 2 mile radius then it should
	#return

	def getPlacesInRadius(self,address):
		reccomendedplaces = []
		curCoordinates = addressToGeo(address)
		print(curCoordinates)
		places = connector.getPlacesInRadius(curCoordinates['lat'],curCoordinates['lng'],5)
		userplaces = self.getTripsandPlaces()[1]
		for place in places:
			for userplaceid in userplaces['id']:
				if(place['id'] != userplaceid and place not in reccomendedplaces):
					reccomendedplaces.append(place)
		return(reccomendedplaces)
	#every user is going to have an address and filter what the 
	#user likes based on what they like

	def PlaceReccomendation(self):
		typescores = {}
		radiusPlaces = reccomender.getPlacesInRadius('269 Amsterdam Ave, New York, NY 10023')
		placesdf = self.getTripsandPlaces()[1]
		df = placesdf.groupby(["types"]).mean()
		reccomendedplaces = []
		for i in range(len(df)):
			score = df.iloc[i].price_level * 1 + df.iloc[i].rating * 2 + df.iloc[i].user_rating * 3
			typescores[score] = df.iloc[i].name
		sortedScores = sorted(list(typescores.keys()))
		placeIds = []
		for placeType in sortedScores:
			arr = []
			for place in radiusPlaces:
				if(typescores[placeType] in place['types'] and place['id'] not in placeIds):
					placeIds.append(place['id'])
					arr.append(place)
			if(len(arr) > sortedScores.index(placeType)+1):
				num = sortedScores.index(placeType)+1
			else:
				num = len(arr)
			for element in arr[:num]:
				reccomendedplaces.append(element)
		return(reccomendedplaces)

	def EventReccomendations(self):
		reccomendedplaces = self.PlaceReccomendation()
		for place in reccomendedplaces:
			print(keywords.getData())
if __name__ == "__main__":
	reccomender = Reccomendations('goat')
	# reccomender.getPlacesInRadius('269 Amsterdam Ave, New York, NY 10023')
	reccomender.PlaceReccomendation()
	# reccomender.getTripsandPlaces()