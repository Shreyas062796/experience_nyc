from pymongo import *
import places as ps
from bson.objectid import *
import random
import json
import hashlib
import uuid
from pprint import pprint

places = ps.NYCPlaces('AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A',40.7831,-73.9712)

class MongoConnector:
	def __init__(self,clientHost,clientPort,username,password,database):
		self.clientHost = clientHost
		self.clientPort = clientPort
		self.username = username
		self.password = password
		self.database = database

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

	def getPlaces(self):
		allPlaces = []
		db = self.clientConnect()
		for document in db.places.find({}):
			allPlaces.append(document)
		return(allPlaces)

	def getPlacesInRadius(self,lat,lng,radius):
		allPlaces = []
		db = self.clientConnect()
		# db.places.find({'geometry.location':{'$geoWithin':{'$centerSphere': [[-73.93414657,40.82302903], 5]}}})
		for document in db.places.find({'geometry.location':{'$nearSphere':[lng,lat],'$maxDistance':radius*1609}}):
			allPlaces.append(document)
		# pprint(allPlaces)
		return(allPlaces)

	#populates login table with json data
	def populateLogin(self,login):
		db = self.clientConnect()
		login['password'] = hashlib.md5(login['password'].encode('utf-8')).hexdigest()
		db.users.insert_one(login)

	def authenticateLogin(self,username,password):
		db = self.clientConnect()
		login = db.users.find_one({"username": username})
		if(login):
			if(login["password"] == hashlib.md5(password.encode('utf-8')).hexdigest()):
				return(True)
		return(False)

	def verifyEmail(self,username,unique_id):
		db = self.clientConnect()
		user = db.users.find_one({"username": username})
		if(user['user_unique_id'] == unique_id):
			user['verify'] = True
			return(True)
		return(False)
		#authenticate login and return true or false
	def addFavoritePlaces(self,username,place_id):
		db = self.clientConnect()
		if(place_id not in db.users.find({'username': username})):
			db.users.update_one({'username': username},{'$push':{'favorite_places':place_id}})
			return("Added")
		else:
			return("Already Exists")

	def removeFavoritePlaces(self,username,place_id):
		db = self.clientConnect()
		db.users.update_one({'username': username},{'$pull':{'favorite_places':place_id}})
		print("added")

	def getFavoritePlacesIds(self,username):
		db = self.clientConnect()
		user = db.users.find_one({"username": username})
		print(user['favorite_places'])
		return(user['favorite_places'])

	def getFavoritePlaces(self,username):
		db = self.clientConnect()
		favoritePlaces = []
		user = db.users.find_one({"username": username})
		for placeId in user['favorite_places']:
			place = db.places.find_one({"id": placeId})
			if(place is not None):
				place['_id'] = str(place['_id'])
				favoritePlaces.append(place)
		return(favoritePlaces)
			
	def populateTags(self,tags):
		db = self.clientConnect()
		for tag in tags:
			db.tags.insert_one(tag)

	def queryPlaces(self,types,price,num):
		db = self.clientConnect()
		params = {}
		count = 0
		queriedPlaces = []
		if types != '':
			params['types'] = types
		if price != '':
			params['price_level'] = int(price)
		for place in db.places.find(params):
			if(count == int(num)):
				random.shuffle(queriedPlaces)
				return(queriedPlaces)
			place['_id'] = str(place['_id'])
			if('photos' in place):
				queriedPlaces.append(place)
				count += 1
# 	{
#   trip_id:"1242112",
#   trip_name:"bored in nyc",
#   user:"bored kid on speed",
#   num_places:3,
#   public: true/false,
#   rating: 3,
#   distance: 2.3,
#   places: [
#     Have json about places, in order of places you visited

#   ],
#   add some more stuff whatever you feel is important
# }
	def createTrip(self,numofplaces,tripName):
		tripPlaces = []
		trip = {}
		db = self.clientConnect()
		places = self.getPlaces()
		for i in range(numofplaces):
			place = places[random.randint(1,len(places)-1)]
			place['user_rating'] = round(random.uniform(1,5), 2)
			tripPlaces.append(place)
		trip['trip_id'] = str(uuid.uuid4())
		trip['user'] = 'goat'
		trip['trip_name'] = tripName
		trip['number_of_places'] = numofplaces
		trip['public'] = False
		trip['rating'] = None
		trip['distance'] = round(random.uniform(1,3), 2)
		trip['places'] = tripPlaces
		return(trip)

	def populateTrip(self,trip):
		db = self.clientConnect()
		db.trips.insert_one(trip)

	def queryTrip(self,username,rating=None):
		trips = []
		db = self.clientConnect()
		for trip in db.trips.find({'user': username}):
			trips.append(trip)
		return(trips)
# mongodb://<dbuser>:<dbpassword>@ds163918.mlab.com:63918/experience_nyc
	def updateTripRating(self,tripId,rating):
		db = self.clientConnect()

	def updatePlaceRating(self,tripId,placeId,rating):
		db = self.clientConnect()

if __name__ == "__main__":
	Experience = MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc")
	# Experience = MongoConnector('ds123619.mlab.com', '23619', 'admin', 'admin', 'enyc'
	# Experience.populatePlaces()
	# pprint(Experience.getPlacesInRadius(40.7733125,-73.9837555,2))
	# print(Experience.getFavoritePlaces('test1'))
	# Experience.getBars()
	# Experience.getRestaurants()
	# pprint(Experience.QueryRestaurants(2,2,2))
	Experience.queryPlaces('','',10)
	# pprint(Experience.QueryBars(2,2,2))
	# Experience.addFavoritePlaces("testUser",134)
	# tripnames = ['dastrip','drunknight','badnight','boys are lit','drama is bad']
	# for i in tripnames:
	# 	trip = Experience.createTrip(3,i)
	# 	Experience.populateTrip(trip)
	# pprint(Experience.queryTrip('goat'))
	#QueryRestaurants(3,4)