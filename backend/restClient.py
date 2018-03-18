from flask import Flask, render_template, request, redirect, session, jsonify
import random, json
import mongoConnector as mg
import sys, os, time, threading
import json
import datetime
import reccomendations as rec
import filtering
from caching import Chacher
from maps.geo import addressToGeo
import lib.sendmail as mail
# [print("{} {}".format(keys, values)) for keys,values in sys.modules(__name__).items()]

DEBUG = True
CACHE = Chacher()

restClient = Flask(__name__)
#mongoInstance = mg.MongoConnector("localhost","27017")
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
#{"type":"Register","firstName":"Alex","lastName":"Markenzon","username":"testUsername","password":"","email":"testemail@gmial.com"}:
@restClient.route('/createuser', methods = ['POST'])
def addUser():
	info = request.get_json()
	info['verify'] = False
	info['user_unique_id'] = mail.sendMail("experiencenycco@gmail.com","anotherone_44")._generateCode(info['email'])
	mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").populateLogin(info)
	# populateLogin(info)

	print("login data was populated")
	#creates session when the person creates account
	session['user'] = info['username']

#authenticates user for database
@restClient.route('/authenticate', methods = ['POST'])
def auth():
	info = requests.get_json()
	if(mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").authenticateLogin(info["username"],info["password"])):
		return(True)
	else:
		return(False)

@restClient.route('/verify', methods = ['POST'])
def verify():
	info = request.get_json()
	if(info['username']):
		return(True)
	#username,unique_id,email

@restClient.route('/queryrestaurants/<cost>/<rating>', methods = ['GET'])#have some parameters
def getRestaurants(cost,rating):
	#query db and return json to the front end
	return(mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").QueryRestaurants(cost,rating))

@restClient.route('/querybars/<cost>/<rating>/<num>', methods = ['GET'])#have some parameters
def getBars(cost,rating,num):
	#query db and return json to the front end
	return(mg.MongoConnector("ds163918.mlab.com","63918","admin","admin","experience_nyc").QueryBars(cost,rating))


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
@restClient.route('/reccomendplaces<user>', methods=['GET'])
def getReccomendations(user):
	reccomendations = rec.placeReccomendations(user).getTrips()
	return(reccomendations)


@restClient.route('/topbar', methods=['GET'])
def getTopBar():
	if request.method == 'GET':	
		amount = request.args['amount']
		location = request.args['address']

		data = CACHE.retrieveJson(location)
		if data is not None:
			return data 
		else:
			place = addressToGeo(location)	
			lat, lng = place['lat'], place['lng']
			myobj = filtering.Filtering(lat,lng)

			outdata = myobj.getTopBars(int(amount), output='json')
			CACHE.addToCache(location, outdata)
			return outdata

	else:
		return "<h1> Error </h1>"


@restClient.route('/events', methods = ['GET'])
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

	return(jsonString)


@restClient.route('/authenticate/<string:code>')
def authenticate(code):
	'''
	check the code againts something in mongo 
	where the user can click, make it timeout after a
	certain amount of time
	'''
	return "OK"




@restClient.route('/')
def index():
	return '<h1>Flask Client is up and running</h1>'

if __name__ == '__main__':
	restClient.run(debug=DEBUG)
