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

	frontend_url = "https://reactnycapp.herokuapp.com/"
	users = Blueprint("users", __name__, url_prefix="/users")


	@users.route('/createuser', methods = ['POST'])
	def createUser():
		"""add user to the database"""
		print(request.is_json)
		info = request.get_json() 
		print(info)

		# initialize the email
		mailbot = sendMail("experiencenycco@gmail.com","Shreyas_code_is_bad69")

		# setup data for creating a user
		info['verify'] = False
		info['user_unique_id'], message = mailbot.generateCode(info['email'])
		info['favorite_places'] = []
		info['current_trip_places'] = []
		info['tags'] = []

		#send a verification email
		mailbot.Send(info['email'], "ExperienceNYC Verification", message) # to_email, email_subject

		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").populateLogin(info)
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

	@users.route('/verify/<auth_code>', methods = ['GET'])
	def verify(auth_code):
		"""Verify the email when the person signs up"""
		
		# print(auth_code)
		# return "<h1>hello</h1>"
		# info = request.get_json()
		if UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").verifyEmail(auth_code):
			return redirect(frontend_url)
			# return(jsonify({"response":"The email was verified"}))
		else:
			# return(jsonify({"response":"The email was not verified try again"}))
			return redirect(frontend_url)

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