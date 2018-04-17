from flask import Blueprint 
from flask import Flask, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import random, json
import sys, os, time, threading, requests
import json
import datetime

#Development
# from backend.users.usersmongo import UsersMongo

#Production
# import sys,os
# sys.path.append(os.path.abspath(os.path.join('..', '')))
from users.usersmongo import UsersMongo
from lib.sendmail import sendMail


def add_routes(app=None):

	users = Blueprint("users", __name__, url_prefix="/users")
	@users.route('/createuser', methods = ['POST'])
	def addUser():
		"""add user to the database"""
		print(request.is_json)
		info = request.get_json() 
		print(info)
		info['verify'] = False
		info['user_unique_id'] = sendMail("experiencenycco@gmail.com","anotherone_44").generateCode(info['email'])
		info['favorite_places'] = []
		info['current_trip_places'] = []
		info['tags'] = []
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").populateLogin(info)
		sendMail("experiencenycco@gmail.com","anotherone_44")._sendmail(info['email'], "Welcome To Experience NYC","Please verify your email here")
		return(jsonify({"response":"True"}))

	@users.route('/getuserdata', methods=['GET'])
	def getUserData():
		"""get the user data"""
		username = request.get_json()['username']
		# print(info)
		# info = request.args['username']
		userinfo = UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getUserInfo(username)
		return jsonify(userinfo)

	#authenticates user for database
	@users.route('/authenticate', methods = ['POST'])
	def auth():
		"""authenticate user in the database"""
		info = request.get_json()
		if(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").authenticateLogin(info["username"],info["password"])):
			return(jsonify({"response":"True"}))
		else:
			return(jsonify({"response":"False"}))

	@users.route('/verify', methods = ['POST'])
	def verify():
		"""Verify the email when the person signs up"""
		info = request.get_json()
		if(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").verifyEmail(info['username'],info['unique_id']) == True):
			return(jsonify({"response":"The email was verified"}))
		else:
			return(jsonify({"response":"The email was not verified try again"}))
		#username,unique_id,email

	@users.route('/updateEmailVerified', methods = ['POST'])
	def updateEmailVerified():
		info = request.get_json()
		if(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").updateVerifiedEmail(info['username'])):
			return(jsonify({"response":"True"}))
		else:
			return(jsonify({"response":"False"}))

	# I'll need a function from you (addToFavorites) tha will take a unique place id as a single param and inserts it into the db as a list of favorite places
	# I'll also need you to write a function that will retreive the favorites returned as a json list
	@users.route('/addfavoriteplaces', methods=['POST'])
	def addfavoriteplaces():
		"""adding to favorite places of a given user"""
		info = request.get_json()
		favorite = UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").addFavoritePlaces(info['username'],info['place_id'])
		if(favorite == "Added"):
			return(jsonify({"response":"True"}))
		else:
			return(jsonify({"response":"Place already Exists"}))

	@users.route('/removefavoriteplaces', methods=['POST'])
	def removefavoriteplaces():
		"""removing from favorite places of a given user"""
		info = request.get_json()
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").removeFavoritePlaces(info['username'],info['place_id'])
		return(jsonify({"response":"True"}))

	@users.route('/getfavoriteplacesIds', methods=['POST'])
	def getfavoriteplacesIds():
		"""removing from favorite places of a given user"""
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getFavoritePlacesIds(info['username'])))

	@users.route('/getfavoriteplaces', methods=['POST'])
	def getfavoriteplaces():
		"""gets all the favorite places of a given user"""
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getFavoritePlaces(info['username'])))

	@users.route('/addtripplaces', methods=['POST'])
	def addtripplaces():
		"""add trips to places"""
		info = request.get_json()
		favorite = UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").addTripPlaces(info['username'],info['place_id'])
		if(favorite == "Added"):
			return(jsonify({"response":"True"}))
		else:
			return(jsonify({"response":"Place already Exists"}))

	@users.route('/removetripplaces', methods=['POST'])
	def removetripplaces():
		"""remove trips to places"""
		info = request.get_json()
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").removeTripPlaces(info['username'],info['place_id'])
		return(jsonify({"response":"True"}))

	@users.route('/gettripplacesIds', methods=['POST'])
	def gettripplacesIds():
		"""get a list of trip ids"""
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getTripPlacesIds(info['username'])))

	@users.route('/gettripplaces', methods=['POST'])
	def gettripplaces():
		"""get all places in a trip"""
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getTripPlaces(info['username'])))

	@users.route('/addtags', methods=['POST'])
	def addTags():
		"""add tags to the user profile"""
		info = request.get_json()
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").addTags(info['username'],info['tags'])
		return(jsonify({"response":"True"}))

	@users.route('/removetags', methods=['POST'])
	def removeTags():
		"""remove tags from the user profile"""
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").removeTags(info['username'],info['tags'])))

	@users.route('/gettags', methods=['POST'])
	def getTags():
		"""get all the tags"""
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getTags(info['username'])))

	app.register_blueprint(users)