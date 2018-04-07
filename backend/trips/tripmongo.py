from pymongo import *
from bson.objectid import *
import random
import json
import hashlib
import uuid
from pprint import pprint
import sys, os
sys.path.append(os.path.abspath(os.path.join('..', 'places')))
import placesmongo as ps

places = ps.NYCPlaces('AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A',40.7831,-73.9712)

class TripMongo:
	def __init__(self,clientHost,clientPort,username,password,database):
		self.clientHost = clientHost
		self.clientPort = clientPort
		self.username = username
		self.password = password
		self.database = database

	def createTrip(self,placeIds,trip_id,user,distance):
		tripPlaces = []
		trip = {}
		db = self.clientConnect()
		places = self.getPlaces()
		for place_id in placeIds:
			place = db.places.find_one({"id": place_id})
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