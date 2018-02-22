from flask import Flask, render_template, request, redirect, session
import random, json
from mongoConnector import *
import sys

# [print("{} {}".format(keys, values)) for keys,values in sys.modules(__name__).items()]

restClient = Flask(__name__)

#any personal or important info is a post request
#any other information is get request
@restClient.route('/createuser', methods = ['POST'])
def addUser():
	info = requests.get_json()
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

@restClient.route('/events', methods = ['POST', 'GET'])
def getEvents():
	#temporary just for front testing
	pass

@restClient.route('/')
def index():
	return '<h1>It is live</h1>'


if __name__ == '__main__':
	restClient.run()

