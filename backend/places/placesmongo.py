from pymongo import *
#development
# from backend.places.places import NYCPlaces
#Production
from places.places import NYCPlaces
from bson.objectid import *
import random
import json
import hashlib
from datetime import date
import calendar
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

	def populatePlacesNew(self):
		allplaces = places.getAllNewPlaces()
		# connection = 'mongodb://' + str(self.username) + ':' + str(self.password) + '@' + str(self.clientHost) + ':' + str(self.clientPort) + '/' + str(self.database)
		# db = MongoClient(connection).places #places and users database
		db = self.clientConnect()

		for a_id, a_place in allplaces.items():
			try:
				db.places.insert_one(a_place)
			except Exception as e:
				print("couldn't add: {}".format(a_id))
		print("ALL POSSIBLE VALUES HAVE BEEN LOADED INTO THE DATABASE")

	def populateDetailPlaces(self):
		allplaces = places.getAllDetailPlaces()
		db = self.clientConnect()
		count = 0
		for place in allplaces:
			try:
				db.places.insert_one(place['results'])
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

	def queryPlaces(self,types,price,search,num):
		db = self.clientConnect()
		today_date = date.today()
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
		if search == '':
			search = 'coffee'
		for place in db.places.find({'$and':[{'types':{'$in': types},'price_level':{'$in':price},'$text': {'$search': search}}]}):
			place['_id'] = str(place['_id'])
			if('photos' in place and place not in queriedPlaces):
				queriedPlaces.append(place)
		if(len(queriedPlaces) == 0):
			return([])
		random.shuffle(queriedPlaces)
		x = queriedPlaces[:num]
		return(x)

	def getUserTripPlaces(self,placeIds):
		places = []
		db = self.clientConnect()
		if(placeIds):
			for placeid in placeIds:
				place = db.places.find_one({'place_id':placeid})
				place['_id'] = str(place['_id'])
				places.append(place)
		return(places)

if __name__ == "__main__":
	Experience = PlacesMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc")
	Experience.queriedPlaces(['restaurant'],[1],'coffee',10)

