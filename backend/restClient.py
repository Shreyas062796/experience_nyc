from flask import Flask, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import random, json
import sys, os, time, threading, requests
import json
import datetime

# our libraries
# import mongoConnector as mg
# import reccomendations as rec
# import filtering
import lib.sendmail as mail
from events import events, events_script
from maps.geo import addressToGeo
from lib.caching import Cacher, EventCacher


# import blueprints here
#Development
import sys, os
# sys.path.append(os.path.abspath(os.path.join('..', '')))
# import backend.events as events
# import backend.places as places
# import backend.reccomendations as reccomendations
# import backend.trips as trips
# import backend.users as users

#Production
sys.path.append(os.path.abspath(os.path.join('..', '')))
import events as events
import places as places
import reccomendations as reccomendations
import trips as trips
import users as users



DEBUG = True
CACHE = Cacher()
EVENT_CACHE = EventCacher()



restClient = Flask(__name__)

# add routes for individual apps
events.add_routes(restClient)
places.add_routes(restClient)
reccomendations.add_routes(restClient)
trips.add_routes(restClient)
users.add_routes(restClient)

CORS(restClient)

# this works, it may not be the best way to do it, but works
# this way whenever the server loads up you have data for the 
# user to work with and will keep updating hourly

@restClient.route('/api/help', methods = ['GET'])
def help():
	"""Print available functions."""
	func_list = {}
	for rule in restClient.url_map.iter_rules():
		if rule.endpoint != 'static':
			func_list[rule.rule] = restClient.view_functions[rule.endpoint].__doc__
	return jsonify(func_list)


@restClient.before_first_request
def activate_job():
	def get_data():
		# events_script.initialPopulate()
		hour = datetime.datetime.now().hour # for first setup
		# keep checking when you reach the end of the first hour
		while hour == datetime.datetime.now().hour:
			time.sleep(60)
		while True:
			time.sleep(810) # sleep for an hour
			requests.get('https://experiencenyc.herokuapp.com/') # ping back so it doesn't fall asleep
			requests.get('https://reactnycapp.herokuapp.com/') # ping front so it doesn't fall alseep
			time.sleep(90)
			print('Hour Notification')
			EVENT_CACHE.setTopToday(events_script.getEvents().getEventsOfTheDay())

	CACHE.
	EVENT_CACHE.setTopToday(events_script.getEvents().getEventsOfTheDay())
	thread = threading.Thread(target=get_data)
	thread.start()


@restClient.route('/todayevents', methods=['GET'])
def getTopEvents():
	if request.method == "GET":
		n = int(request.args['amount'])
		return jsonify(EVENT_CACHE.getTopN(n))


@restClient.route('/')
def index():
	"""Initial starting point"""
	return '<h1>Flask Client is up and running</h1>'

if __name__ == '__main__':
	restClient.run(debug=DEBUG)

