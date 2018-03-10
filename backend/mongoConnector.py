from pymongo import *
from places import *
from bson.objectid import *


class MongoConnector:

	# client = MongoClient('mongodb://localhost:27017/')
	def __init__(self,clientHost,clientPort):
		self.clientHost = clientHost
		self.clientPort = clientPort
	def clientConnect(self):
		connection = "mongodb://" + str(self.clientHost) + ":" + str(self.clientPort) + str("/")
		client = MongoClient(connection)
		return(client)
	def placesConnect(self):
		client = self.clientConnect()
		placesdb = client.places
		return(placesdb)

	def loginConnect(self):
		client = self.clientConnect()
		logindb = client.loginInfo
		return(logindb)

	def tagsConnect(self):
		client = self.clientConnect()
		tagsdb = client.Tags
		return(tagsdb)

	def tripsConnect(self):
		client = self.clientConnect()
		tripsdb = client.trips
		return(tripsdb)

	#adds initital restaurant data to database
	def populateRestaurants(self):
		restaurants = getNYCRestaurants()
		db = self.placesConnect()
		for restaurant in restaurants['results']:
			db.restaurants.insert_one(restaurant)

	#adds initital Bars data to database
	def populateBars(self):
		bars = getNYCBars()
		db = self.placesConnect()
		for bar in bars['results']:
			db.bars.insert_one(bar)

	#test to see if you can get all the bar data in database
	def getBars(self):
		allBars = []
		db = self.placesConnect()
		for document in db.bars.find():
			allBars.append(document)
		return(allBars)

	#populates login table with json data
	def populateLogin(self,login):
		db = self.loginConnect()
		db.Info.insert_one(login)

	def authenticateLogin(self,username,password):
		db = self.loginConnect()
		login = db.Info.find_one({"username": username})
		if(login):
			if(login["password"] == password):
				return(True)
		return(False)
		#authenticate login and return true or false


	def populateTags(self,tags):
		db = self.tagsConnect()
		for tag in tags:
			db.Tags.insert_one(tag)

	def getRestaurants(self):
		allRestaurants = []
		db = self.placesConnect()
		for document in db.restaurants.find():
			allRestaurants.append(document)
		return(allRestaurants)

	def QueryRestaurants(self,cost,rating,num):
		queriedRestaurant = []
		for restaurant in self.getRestaurants():
			if('price_level' in restaurant and 'rating' in restaurant):
				if(restaurant['rating'] >= rating and restaurant['price_level'] >= cost):
					queriedRestaurant.append(restaurant)
		return(queriedRestaurant[:num])

	def QueryBars(self,cost,rating,num):
		queriedBars = []
		for bar in self.getBars():
			if('price_level' in bar and 'rating' in bar):
				if(bar['rating'] >= rating and bar['price_level'] >= cost):
					queriedBars.append(restaurant)
		return(queriedBars[:num])

if __name__ == "__main__":
	Experience = MongoConnector("localhost","27017")
	Experience.populateBars()
	Experience.populateRestaurants()
	#print(getBars())
	#QueryRestaurants(3,4)