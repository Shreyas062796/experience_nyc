from pymongo import *
from places import *
from bson.objectid import *


class MongoConnector:

	# client = MongoClient('mongodb://localhost:27017/')
	def __init__(self,clientHost,clientPort,username,password,database):
		self.clientHost = clientHost
		self.clientPort = clientPort
		self.username = username
		self.password = password
		self.database = database
	def clientConnect(self):
		connection = 'mongodb://' + str(self.username) + ':' + str(self.password) + '@' + str(self.clientHost) + ':' + str(self.clientPort) + '/' + str(self.database)
		client = MongoClient(connection).experience_nyc
		return(client)
	# def placesConnect(self):
	# 	client = self.clientConnect()
	# 	placesdb = client.places
	# 	return(placesdb)

	# def loginConnect(self):
	# 	client = self.clientConnect()
	# 	logindb = client.loginInfo
	# 	return(logindb)

	# def tagsConnect(self):
	# 	client = self.clientConnect()
	# 	tagsdb = client.Tags
	# 	return(tagsdb)

	# def tripsConnect(self):
	# 	client = self.clientConnect()
	# 	tripsdb = client.trips
	# 	return(tripsdb)

	#adds initital restaurant data to database
	def populateRestaurants(self):
		restaurants = getNYCRestaurants()
		db = self.clientConnect()
		for restaurant in restaurants['results']:
			db.places.insert_one(restaurant)

	#adds initital Bars data to database
	def populateBars(self):
		bars = getNYCBars()
		db = self.clientConnect()
		for bar in bars['results']:
			db.places.insert_one(bar)

	#test to see if you can get all the bar data in database
	def getBars(self):
		allBars = []
		db = self.clientConnect()
		for document in db.places.find({'types': 'bar'}):
			allBars.append(document)
		pprint(allBars)
		return(allBars)

	#populates login table with json data
	def populateLogin(self,login):
		db = self.clientConnect()
		db.users.insert_one(login)

	def authenticateLogin(self,username,password):
		db = self.clientConnect()
		login = db.users.find_one({"username": username})
		if(login):
			if(login["password"] == password):
				return(True)
		return(False)
		#authenticate login and return true or false


	def populateTags(self,tags):
		db = self.clientConnect()
		for tag in tags:
			db.tags.insert_one(tag)

	def getRestaurants(self):
		allRestaurants = []
		db = self.clientConnect()
		for document in db.places.find({'types': 'restaurant'}):
			allRestaurants.append(document)
		pprint(allRestaurants)
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

# mongodb://<dbuser>:<dbpassword>@ds163918.mlab.com:63918/experience_nyc
if __name__ == "__main__":
	pass
	#Experience = MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc")
	# Experience.populateBars()
	# Experience.populateRestaurants()
	#Experience.getBars()
	# Experience.getRestaurants()
	#QueryRestaurants(3,4)