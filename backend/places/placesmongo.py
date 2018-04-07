from pymongo import *
from places import NYCPlaces
from bson.objectid import *
import random
import json
import hashlib
import uuid
from pprint import pprint

places = NYCPlaces('AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A',40.7831,-73.9712)

class PlacesMongo:
	def __init__(self,clientHost,clientPort,username,password,database):
		self.clientHost = clientHost
		self.clientPort = clientPort
		self.username = username
		self.password = password
		self.database = database

	#connects to mongo server based on parameters
	def clientConnect(self):
		connection = 'mongodb://' + str(self.username) + ':' + str(self.password) + '@' + str(self.clientHost) + ':' + str(self.clientPort) + '/' + str(self.database)
		client = MongoClient(connection).experience_nyc #places and users database
		# client = MongoClient(connection).enyc #events database
		return(client)

	def populatePlaces(self):
		allplaces = places.getAllPlaces()
		db = self.clientConnect()
		count = 0
		for placeId in allplaces:
			for place in allplaces[placeId]['results']:
				try:
					db.places.insert_one(place)
					print("populated")
				except:
					continue

	#gets all documents from places collection
	def getPlaces(self):
		allPlaces = []
		db = self.clientConnect()
		for document in db.places.find({}):
			allPlaces.append(document)
		return(allPlaces)

	#gets all the places in a certain radius around a coordinate
	def getPlacesInRadius(self,lat,lng,radius):
		allPlaces = []
		db = self.clientConnect()
		# db.places.find({'geometry.location':{'$geoWithin':{'$centerSphere': [[-73.93414657,40.82302903], 5]}}})
		for document in db.places.find({'geometry.location':{'$nearSphere':[lng,lat],'$maxDistance':radius*1609}}):
			allPlaces.append(document)
		# pprint(allPlaces)
		return(allPlaces)

	def queryPlaces(self,types,price,num):
		db = self.clientConnect()
		params = {}
		queriedPlaces = []
		if types == ['']:
			types = ['restaurant','cafe','bar','florist','amusement_park','bakery','clothing_store','convenience_store','department_store','hair_care','library','movie_theater','museum','night_club'
			,'stadium','store','zoo']
		if price == ['']:
			price = [1,2,3]
		else:
			for i in range(len(price)):
				price[i] = len(price[i])
		for place in db.places.find({'$and':[{'types':{'$in': types},'price_level':{'$in':price}}]}):
			place['_id'] = str(place['_id'])
			if('photos' in place):
				queriedPlaces.append(place)
		if(len(queriedPlaces) == 0):
			return([])
		random.shuffle(queriedPlaces)
		x = queriedPlaces[:num]
		return(x)

	def getQueriedPlaces(self,placeIds):
		places = []
		db = self.clientConnect()
		if(placeIds):
			for placeid in placeIds:
				place = db.places.find_one({'id':placeid})
				place['_id'] = str(place['_id'])
				places.append(place)
		return(places)