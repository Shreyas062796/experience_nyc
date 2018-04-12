from pymongo import *
from bson.objectid import *
import random
import json
import hashlib
import uuid
from pprint import pprint

#development
# from backend.places.placesmongo import *

#production
import sys,os
sys.path.append(os.path.abspath(os.path.join('..', '')))
from places.placesmongo import *

places = NYCPlaces('AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A',40.7831,-73.9712)

class TripMongo:
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

	def createTrip(self,placeIds,trip_id,user,distance):
		tripPlaces = []
		trip = {}
		db = self.clientConnect()
		places = PlacesMongo(self.clientHost,self.clientPort,self.username,self.password,self.database).getPlaces()
		for place_id in placeIds:
			place = db.places.find_one({"id": place_id})
			if place is not None:
				place['user_rating'] = random.randint(1,5)
				tripPlaces.append(place)
		trip['trip_id'] = trip_id
		trip['user'] = user
		trip['number_of_places'] = len(tripPlaces)
		trip['public'] = False
		trip['rating'] = random.randint(1,5)
		trip['distance'] = distance
		trip['places'] = tripPlaces
		return(trip)

	#adds to the database
	def populateTrip(self,trip):
		db = self.clientConnect()
		db.trips.insert_one(trip)
		return("added")

	#query the trips by the username
	def queryTrip(self,username,rating=None):
		trips = []
		db = self.clientConnect()
		for trip in db.trips.find({'user': username}):
			trips.append(trip)
		return(trips)

	#code to update trips and make them public
	def makeTripPublic(self,tripId):
		db = self.clientConnect()
		db.trips.update_one({'trip_id': tripId},{'public':True})
		return("updated")

	#updates the trip rating
	def updateTripRating(self,tripId,rating):
		db = self.clientConnect()
		db.trips.update_one({'trip_id': tripId},{'rating':rating})
		return("updated")
	
	#updates the place rating
	def updatePlaceRating(self,tripId,placeId,rating):
		db = self.clientConnect()

# if __name__ == "__main__":
# 	Experience = TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc")
# 	tripnames = ['dastrip','drunknight','badnight','boys are lit','drama is bad','as','da']
# 	# tripPlaces =[['8f01b4b28a3d06af43a7df2f58adf9522a3fb2a9','791ead07b3b855e3ca3d7171d74e05f523e211db'],[]
# 	for i in tripnames:
# 		trip = Experience.createTrip(["11b2bcd4b94f0bf8a0bf06a53c6c23eba5a82f19", "03a612fcf14c158ec2f7c4b61b02c534d095efde", "05cd1fdae128118f2497b55431d31201a7b4ac96", "90e1dd76028177af6ecc196b71a32695e59e6ef7", "ea7d77a25db19a89439ab5495e2d862b7cfb4337", "fd152323e7aba37814dda9b37aaff31d40b70f04", "8f15b543b258c3cd0bea4c1d5e9caa5d0e7af52a"],i,'Shrey123',10)
# 		Experience.populateTrip(trip)
# 		print("populated")