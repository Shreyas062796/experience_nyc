import pandas as pd
# import mongoConnector as mg
from pprint import pprint
import sys, os
sys.path.append(os.path.abspath(os.path.join('..', '')))
import places.PlacesMongo as ps
import lib.getKeywords as key
import events.events_script as ev
from maps.geo import addressToGeo

placesconnector = ps.PlacesMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc")
eventsconnector = mg.MongoConnector("ds123619.mlab.com", "23619", "admin","admin","enyc")
keywords = key.GetKeywords("AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o")
events = ev.getEvents()
class Reccomendations:
	def __init__(self,username,address):
		self.user = username
		self.address = address

	#creates dataframes for places and trips that is going to be used for machine learning
	def getTripsandPlaces(self):
		trips = placesconnector.queryTrip(self.user)
		alltrips = []
		places = []
		for trip in trips:
			for place in trip['places']:
				place['types'] = place['types'][0]
				if('price_level' not in place):
					place['price_level'] = 2
				places.append(place)
			alltrips.append(trip)
		tripdf = pd.DataFrame(alltrips)
		placesdf = pd.DataFrame(places)
		newtripdf = tripdf[['rating','trip_id','distance']].copy()
		newplacedf = placesdf[['price_level','name','types','user_rating','id','rating']].copy()
		newplacedf['counts'] = newplacedf.groupby('types')['rating'].transform('count')
		# print(newplacedf)
		return(newtripdf,newplacedf)

	#run the machine learning for all the places and if its in a 2 mile radius then it should
	#return

	#gets all the places with a given radius and address
	def getPlacesInRadius(self):
		reccomendedplaces = []
		curCoordinates = addressToGeo(self.address)
		# print(curCoordinates)
		places = placesconnector.getPlacesInRadius(curCoordinates['lat'],curCoordinates['lng'],30)
		userplaces = self.getTripsandPlaces()[1]
		for place in places:
			for userplaceid in userplaces['id']:
				if(place['id'] != userplaceid and place not in reccomendedplaces):
					reccomendedplaces.append(place)
		return(reccomendedplaces)
	#every user is going to have an address and filter what the 
	#user likes based on what they like

	# Reccomends places based on machine learning algorithm as well as places in a certain radius
	def PlaceReccomendation(self):
		typescores = {}
		radiusPlaces = self.getPlacesInRadius()
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
					place['_id'] = str(place['_id'])
					placeIds.append(place['id'])
					arr.append(place)
			if(len(arr) > sortedScores.index(placeType)+1):
				num = sortedScores.index(placeType)+1
			else:
				num = len(arr)
			for element in arr[:num]:
				reccomendedplaces.append(element)
		if(reccomendedplaces):
			return(reccomendedplaces)
		else:
			return("empty")

	def EventReccomendations(self):
		reccomendedplaces = self.PlaceReccomendation()
		db = eventsconnector.EventsclientConnect()
		curCoordinates = addressToGeo(self.address)
		# print(curCoordinates['name'])
		# for x in db.events.find({'address':{'$nearSphere':[curCoordinates['lng'],curCoordinates['lat']],'$maxDistance':3*1609}}):
		# 	print(x)
		for x in db.events.find({}):
			print(x)
			
if __name__ == "__main__":
	reccomender = Reccomendations('test','269 Amsterdam Ave, New York, NY 10023')
	# reccomender.getPlacesInRadius('269 Amsterdam Ave, New York, NY 10023')
	print(reccomender.PlaceReccomendation())
	# reccomender.getTripsandPlaces()
	# reccomender.EventReccomendations()