from flask import Flask, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import random, json
import mongoConnector as mg
import sys, os, time, threading
import json
import datetime
import reccomendations as rec
import filtering
from caching import Cacher
from maps.geo import addressToGeo
import lib.sendmail as mail

from events import events

DEBUG = True
CACHE = Cacher()

restClient = Flask(__name__)
CORS(restClient)

# this works, it may not be the best way to do it, but works
# this way whenever the server loads up you have data for the 
# user to work with and will keep updating hourly

def isNotNull(str,request):
   try:
      return(request.args[str])
   except KeyError:
       return(None)

@restClient.before_first_request
def activate_job():
	def get_data():
		hour = datetime.datetime.now().hour # for first setup
		# keep checking when you reach the end of the first hour
		while hour == datetime.datetime.now().hour:
			time.sleep(60)
		while True:
			# updateEvents()	#write this later
			# updatePlaces()	#write this later

			print('Hour Notification')
			time.sleep(900) # sleep for an hour
	#==============================================
	# This is for the caching of data
	# sets up the data for when the first first goes up
	# updateEvents()
	# updatePlaces()
 thread = threading.Thread(target=get_data)
	thread.start()


#any personal or important info is a post request
#any other information is get request
#{"firstName":"Alex","lastName":"Markenzon","username":"testUsername","password":"","email":"testemail@gmial.com"}:
@restClient.route('/createuser', methods = ['POST'])
def addUser():
	print(request.is_json)
	info = request.get_json() 
	print(info)
	info['verify'] = False
	info['user_unique_id'] = mail.sendMail("experiencenycco@gmail.com","anotherone_44").generateCode(info['email'])
	info['favorite_places'] = []
	mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").populateLogin(info)
	return(jsonify({"response":"True"}))

#authenticates user for database
@restClient.route('/authenticate', methods = ['POST'])
def auth():
	info = request.get_json()
	if(mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").authenticateLogin(info["username"],info["password"])):
		return(jsonify({"response":"True"}))
	else:
		return(jsonify({"response":"False"}))


@restClient.route('/verify', methods = ['POST'])
def verify():
	info = request.get_json()
	if(mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").verifyEmail(info['username'],info['unique_id']) == True):
		return(jsonify({"response":"The email was verified"}))
	else:
		return(jsonify({"response":"The email was not verified try again"}))
	#username,unique_id,email

# I'll need a function from you (addToFavorites) that will take a unique place id as a single param and inserts it into the db as a list of favorite places
# I'll also need you to write a function that will retreive the favorites returned as a json list
@restClient.route('/addfavoriteplaces', methods=['POST'])
def addfavoriteplaces():
	info = request.get_json()
	mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").addFavoritePlaces(info['username'],info['place_id'])
	return "True"

@restClient.route('/getfavoriteplaces', methods=['POST'])
def getfavoriteplaces():
	info = request.get_json()
	return(jsonify(mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").getFavoritePlaces(info['username'])))



@restClient.route('/queryplaces', methods=['GET'])
def queryplaces():
	# info = request.get_json()
	# print("useigiusehfugihserulhgirtghligwherluihgwliergluwuier")

	if request.method == 'GET':	
		num = request.args['num']
		price_level = request.args['price_level']
		types= request.args['types']
		# print("{}:{}\n{}:{}\n{}:{}".format(num,type(num), price_level,type(price_level), types,type(types)))

		places = mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").queryPlaces(types,price_level,int(num))
		if(places):
			return(jsonify(places))
		else:
			return(jsonify({"response":"There is no values"}))

# gets bars that right now have preset coordinates
@restClient.route('/topbars/<amount>', methods = ['GET'])#have some parameters
def getTopBars(amount):
	defaultlat  = 40.7831
	defaultlong = 73.9712
	myobj = filtering.Filtering(defaultlat, defaultlong)
	print(type(jsonify(myobj.getTopBars(int(amount)))))
	return jsonify(myobj.getTopBars(int(amount)))

#temporary for testing geochange
# and everything will be passed as a querystrin
# this works for new places as your trip grows
@restClient.route('/reccomendplaces/<user>', methods=['GET'])
def getReccomendations(user):
	reccomendations = rec.placeReccomendations(user).getTrips()
	return(reccomendations)




@restClient.route('/getevents_temp')
def getEvents():
	# Checks if key exists, work this out later
	def getkey(a_str, a_request):
		try:
			return a_request.args[a_str]
		except KeyError:
			return None
	
	#default lat long for now
	lat = 40.7831
	lon = -73.9712

	gevents = events.getEvents()

	if request.method== 'GET':
		q = getkey('q', request)
		address = getkey('address', request)

		place = addressToGeo(address)	
		lat, lng = place['lat'], place['lng']


		eb_events = gevents.setParams(lat, lng, 2)		
		# print(type(eb_events))
		return jsonify(eb_events)

	return 'Not calling the proper method'

@restClient.route('/events_old', methods = ['GET'])
def getEvents_old():
	#temporary just for front testing

	# this block is for heroku
	cwd = os.getcwd()
	jsonfile = ''
	if DEBUG:
		jsonfile = cwd + '/example.json'
	

	jsonString = ''

	with open(jsonfile, 'r') as File:
		a = json.loads(File.read())

		returndic = list()
		for i in range(len(a)):
			temp = dict()
			temp['rating'] = a[i]['rating']
			temp['name'] = a[i]['name']
			temp['opening_hours'] = a[i]['opening_hours']
			# temp['price_level'] = a[i]['price_level']
			returndic.append(temp)

		jsonString = json.dumps(returndic)

	return(jsonString)


@restClient.route('/')
def index():
	return '<h1>Flask Client is up and running</h1>'


if __name__ == '__main__':
	restClient.run(debug=DEBUG)
