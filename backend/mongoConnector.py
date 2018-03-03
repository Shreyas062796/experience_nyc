from pymongo import *
from places import *
from bson.objectid import *

client = MongoClient('mongodb://localhost:27017/')

def placesConnect():
	placesdb = client.places
	return(placesdb)

def loginConnect():
	#client = MongoClient('mongodb://localhost:27017/')
	logindb = client.loginInfo
	return(logindb)

def tagsConnect():
	#client = MongoClient('mongodb://localhost:27017/')
	tagsdb = client.Tags
	return(tagsdb)

#adds initital restaurant data to database
def populateRestaurants():
	restaurants = getNYCRestaurants()
	db = placesConnect()
	for restaurant in restaurants['results']:
		db.restaurants.insert_one(restaurant)

#adds initital Bars data to database
def populateBars():
	bars = getNYCBars()
	db = placesConnect()
	for bar in bars['results']:
		db.bars.insert_one(bar)

#test to see if you can get all the bar data in database
def getBars():
	allBars = []
	db = placesConnect()
	for document in db.bars.find():
		allBars.append(document)
	return(allBars)

#populates login table with json data
def populateLogin(login):
	db = loginConnect()
	db.Info.insert_one(tag)

def authenticateLogin(username,password):
	db = loginConnect()
	login = db.Info.find_one({"username": username})
	if(login):
		if(login["password"] == password):
			return(True)
	return(False)
	#authenticate login and return true or false


def populateTags(tags):
	db = tagsConnect()
	for tag in tags:
		db.Tags.insert_one(tag)

def getRestaurants():
	allRestaurants = []
	db = placesConnect()
	for document in db.restaurants.find():
		allRestaurants.append(document)
	return(allRestaurants)

def QueryRestaurants(cost,rating):
	queriedRestaurant = []
	for restaurant in getRestaurants():
		if('price_level' in restaurant and 'rating' in restaurant):
			if(restaurant['rating'] >= rating and restaurant['price_level'] >= cost):
				queriedRestaurant.append(restaurant)
	return(queriedRestaurant)

if __name__ == "__main__":
	#populateRestaurants()
	#populateBars()
	#print(getBars())
	QueryRestaurants(3,4)