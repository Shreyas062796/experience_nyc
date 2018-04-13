from flask import Blueprint
from flask import Flask, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import random, json
import sys, os, time, threading, requests
import json
import datetime

#Development
# sys.path.append(os.path.abspath(os.path.join('..', '')))
# from places.placesmongo import PlacesMongo

#Production
from places.placesmongo import PlacesMongo

def add_routes(app=None):

	places = Blueprint("places", __name__, url_prefix="/places")

	@places.route('/queryplaces', methods=['GET'])
	def queryplaces():
		"""used to query places"""
		if request.method == 'GET':
			num = request.args['num']
			search = request.args['search']
			price_level = request.args.getlist('price_level[]')
			types = request.args.getlist('types[]')
			places = PlacesMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").queryPlaces(types,price_level,search,int(num))
			if(places):
				return(jsonify(places))
			elif(places == []):
				return(jsonify({"response":"There is no values"}))
	
	@places.route('/getusertripplaces', methods=['GET'])
	def getusertripplaces():
		""" get the places from the users profile given list of place ids """
		if request.method == 'GET':
			placeIds = request.args.getlist('placeIds[]')
			print(placeIds)
			places = PlacesMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getUserTripPlaces(placeIds)
			if(places):
				return(jsonify(places))
			elif(places == []):
				return(jsonify({"response":"There is no values"}))

	app.register_blueprint(places)