from flask import Blueprint
from flask import Flask, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import random, json
import sys, os, time, threading, requests
import json
import datetime

#development
# from backend.trips.tripmongo import TripMongo

#production
from trips.tripmongo import TripMongo


def add_routes(app=None):

	trips = Blueprint("trips", __name__, url_prefix="/trips")

	@trips.route('/createtrip', methods=['POST'])
	def createTrip():
		"""create a trip given certain parameters"""
		info = request.get_json()
		trip = TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").createTrip(info['placeIds'],info['trip_id'],info['username'],info['distance'])
		populated = TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").populateTrip(trip)
		if(populated == "added"):
			return(jsonify({"response":"Trip Added"}))
		else:
			return(jsonify({"response":"Trip Not Added"}))

	@trips.route('/maketrippublic', methods=['POST'])
	def makeTripPublic():
		"""Making a trip public"""
		if request.method == "GET":
			tripid = int(request.args['amount'])
		trip = TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").makeTripPublic(tripid)
		if(trip == "updated"):
			return("updated")
		else:
			return("not updated")

	@trips.route('/updateplacerating', methods=['GET'])
	def queryTrip():
		"""update the place rating"""
		if request.method == "GET":
			tripid = request.args['trip_id']
			placeid = request.args['place_id']
			rating = int(request.args['amount'])

	@trips.route('/updatetriprating', methods=['POST'])
	def updateTripRating():
		"""update the trip place rating"""
		pass
		
	app.register_blueprint(trips)