from flask import Flask, render_template, request, redirect, session, jsonify
import random, json
from mongoConnector import *
import sys, os, time
import json

import filtering
from maps.geo import addressToGeo
# [print("{} {}".format(keys, values)) for keys,values in sys.modules(__name__).items()]

DEBUG = True

restClient = Flask(__name__)

# this works, it may not be the best way to do it, but works
# this way whenever the server loads up you have data for the 
# user to work with and will keep updating hourly
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

			time.sleep(3600) # sleep for an hour
	#==============================================

	# This is for the caching of data
	# sets up the data for when the first first goes up
	# updateEvents()
	# updatePlaces()

	thread = threading.Thread(target=get_data)
	thread.start()


#any personal or important info is a post request
#any other information is get request
@restClient.route('/createuser', methods = ['POST'])
def addUser():
	info = request.get_json()
	populateLogin(info)
	print("login data was populated")
	#creates session when the person creates account
	session['user'] = info['username']

#authenticates user for database
@restClient.route('/authenticate', methods = ['POST'])
def auth():
	info = requests.get_json()
	if(authenticateLogin(info["username"],info["password"])):
		session['user'] = info["username"]
	else:
		print("The password or the username that you have entered doesnt exist")


@restClient.route('/restaurants/', methods = ['POST'])#have some parameters
def getRestaurants():
	#query db and return json to the front end
	pass

# gets bars that right now have preset coordinates
@restClient.route('/topbars/<amount>', methods = ['GET'])#have some parameters
def getTopBars(amount):
	defaultlat  = 40.7831
	defaultlong = 73.9712

	myobj = filtering.Filtering(defaultlat, defaultlong)
	return jsonify(myobj.getTopBars(int(amount)))


#temporary for testing geochange
# and everything will be passed as a querystring
# this works for new places as your trip grows
@restClient.route('/topbar', methods=['POST'])
def getTopBar():
	if request.method == 'POST':

		amount = request.form['amount']
		location = request.form['address']

		place = addressToGeo(location)	
		lat, lng = place['lat'], place['lng']
		myobj = filtering.Filtering(lat,lng)

		return myobj.getTopBars(int(amount), output='json')
	else:
		return "<h1> Error </h1>"


@restClient.route('/events', methods = ['POST', 'GET'])
def getEvents():
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

	return jsonString


@restClient.route('/')
def index():
	return '<h1>Flask Client is up and running</h1>'


if __name__ == '__main__':
	restClient.run(debug=DEBUG)
