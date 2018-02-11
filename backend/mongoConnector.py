from pymongo import *
from places import *
from bson.objectid import *

def dbConnect():
	client = MongoClient('mongodb://localhost:27017/')
	restaurantsdb = client.places
	return(restaurantsdb)


def populateRestaurants():
	restaurants = getNYCRestaurants()
	db = dbConnect()
	for restaurant in restaurants['results']:
		db.restaurants.insert_one(restaurant)

def populateBars():
	bars = getNYCBars()
	db = dbConnect()
	for bar in bars['results']:
		db.bars.insert_one(bar)



def getTest():
	db = dbConnect()
	for document in db.bars.find():
		pprint(document)



if __name__ == "__main__":
	#populateRestaurants()
	#populateBars()
	getTest()