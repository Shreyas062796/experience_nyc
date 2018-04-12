import pandas as pd
# import mongoConnector as mg
import random
from pprint import pprint
import sys, os

#development
# from backend.places.placesmongo import *
# from backend.lib.getKeywords import *
# from backend.events.events_script import *
# from backend.maps.geo import *

#production
sys.path.append(os.path.abspath(os.path.join('..', '')))
from places.placesmongo import *
from trips.tripmongo import *
from users.usersmongo import *
from lib.getKeywords import *
from events.events_script import *
from maps.geo import *

placesconnector = PlacesMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc")
tripconnector = TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc")
userconnector = UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc")
keywords = GetKeywords("AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o")
events = getEvents()
class Reccomendations:
	def __init__(self,username,address):
		self.user = username
		self.address = address

	#creates dataframes for places and trips that is going to be used for machine learning
	def getTripsandPlaces(self):
		trips = tripconnector.queryTrip(self.user)
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
		if not tripdf.empty and not placesdf.empty:
			newtripdf = tripdf[['rating','trip_id','distance']].copy()
			newplacedf = placesdf[['price_level','name','types','user_rating','id','rating']].copy()
			newplacedf['counts'] = newplacedf.groupby('types')['rating'].transform('count')
			return(newtripdf,newplacedf)
		return("empty","empty")

	#run the machine learning for all the places and if its in a 2 mile radius then it should
	#return

	#gets all the places with a given radius and address
	def getPlacesInRadius(self):
		reccomendedplaces = []
		curCoordinates = addressToGeo(self.address)
		# print(curCoordinates)
		places = placesconnector.getPlacesInRadius(curCoordinates['lat'],curCoordinates['lng'],30)
		userplaces = self.getTripsandPlaces()[1]
		if userplaces != "empty":
			for place in places:
				for userplaceid in userplaces['id']:
					if(place['id'] != userplaceid and place not in reccomendedplaces):
						reccomendedplaces.append(place)
			return(reccomendedplaces)
		else:
			return(places)
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

	def GetPlacesBasedFavs(self):
		recommendedplaces = self.getPlacesInRadius()
		favorites = userconnector.getFavoritePlaces(self.user)

		# get the users average price level that they enjoy
		total = 0
		count = 0 # because not all locations have a price_level
		for location in favorites:
			try:
				total+=int(location['price_level'])
				count+=1
			except KeyError:
				pass
		avg_level = round(total/count)

		#get the main keywords that the user has
		types = dict()
		for location in favorites:
			l = list()
			try:
				l = location['types']
			except KeyError:
				continue
			for word in l:
				if not word in types:
					types[word] = 1 
				else:
					types[word] += 1
		print(types)
		user_types = sorted(types, key=types.get)[::-1]
		print(user_types)

		total_reccomended = 15 # this is static change later

		# create reply list
		reccomended_list = list()
		random.shuffle(recommendedplaces)
		for location in recommendedplaces:
			loc_types = list()
			try:
				loc_types = location['types']
			except KeyError:
				continue
			for atype in user_types[:3]:
				if atype in loc_types:
					reccomended_list.append(location)
					break
			if len(reccomended_list) >= total_reccomended:
				break

		for location in reccomended_list:
			location['_id'] = str(location['_id'])


		print(reccomended_list)
		return reccomended_list
		# print(price_level)	


	def EventReccomendations(self):
		reccomendedplaces = self.PlaceReccomendation()
		curCoordinates = addressToGeo(self.address)
		# print(curCoordinates['name'])
		# for x in db.events.find({'address':{'$nearSphere':[curCoordinates['lng'],curCoordinates['lat']],'$maxDistance':3*1609}}):
		# 	print(x)
		
# if __name__ == "__main__":
	# reccomender = Reccomendations('test','269 Amsterdam Ave, New York, NY 10023')
# 	# reccomender.getPlacesInRadius('269 Amsterdam Ave, New York, NY 10023')
# 	print(reccomender.PlaceReccomendation())
# 	# reccomender.PlaceReccomendation()
# 	print('starting')
# 	reccomender.GetPlacesBasedFavs()
# 	# reccomender.getTripsandPlaces()
# 	# reccomender.EventReccomendations()