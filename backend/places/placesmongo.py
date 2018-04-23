from pymongo import *
#development
# from backend.places.places import NYCPlaces
#Production
import requests
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

		for a_place in allplaces:
			try:
				db.places.insert_one(a_place['result'])
			except Exception as e:
				print("couldn't add: {}".format("an item"))
		print("ALL POSSIBLE VALUES HAVE BEEN LOADED INTO THE DATABASE")

	def populateDetailPlaces(self):
		allplaces = places.getAllDetailPlaces()
		db = self.clientConnect()
		count = 0
		for place in allplaces:
			try:
				db.places.insert_one(place['result'])
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
		return(allPlaces)

	def updateOpen(self,place):
		url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place['place_id'] + '&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A'
		req = requests.get(url)
		return(req.json())

	def queryPlaces(self,types,price,search,num):
		db = self.clientConnect()
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

	def queryAllPlaces(self,types,price,search):
		db = self.clientConnect()
		today_date = date.today()
		queriedPlaces = []
		if types == ['']:
			types = ['restaurant','cafe','bar','florist','amusement_park','bakery','clothing_store','convenience_store','department_store','hair_care','library','movie_theater','museum','night_club','stadium','store','zoo']
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
	#this should work
		return queriedPlaces



	def queryBasedOnSearch(self, types, price, search, page=1):
		db = self.clientConnect()

		base_query = {'$and':[{}]}
		return_amount = 150 # 10 pages
		return_list = list() #list to be returned

		# get everything in n amount
		if (types==[''] and price==[''] and search==''):
			for place in db.places.aggregate([{'$sample': {'size':15}}]):#db.places.find().skip(6+int(page)).limit(15):
				place['_id'] = str(place['_id'])
				if('photos' in place):
					return_list.append(place)
			return return_list

		# create a search query based on given data
		if (types!=['']):
			base_query['$and'][0]['types'] = {'$in':types }
		if (price!=['']):
			for i in range(len(price)):
				price[i] = len(price[i])
			base_query['$and'][0]['price_level'] = {'$in':price} 
		if (search!=''):
			base_query['$and'][0]['$text'] = {'$search': search}  
		print(base_query)

		# create a way for pagination
		page_size = 15

		skips = page_size * (int(page) - 1)

		for place in db.places.find(base_query).skip(skips).limit(page_size):
			place['_id'] = str(place['_id'])
			if('photos' in place):
				return_list.append(place)
		if(len(return_list) == 0):
			return([])

		return return_list

	def queryLiterallyAll(self):
		db = self.clientConnect()
		allData = list()

		queryResult = db.places.find()
		print(len(list(queryResult)))
		for place in queryResult:
			place["_id"] = str(place["_id"])
			if('photos' in place.keys()):
				allData.append(place)
		return allData

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
	Experience = PlacesMongo("ds159217.mlab.com","59217","admin","admin","experience_nyc")
	Experience.populatePlacesNew()
	# print(len(Experience.queryAllPlaces([''],[''],'')))
	# print(len(Experience.queryLiterallyAll()))
	# print(len(Experience.queryBasedOnSearch(['bar'],[''],'bar')))
# # 	# Experience.queriedPlaces(['restaurant'],[1],'coffee',10)
# # 	Experience.populateDetailPlaces()
