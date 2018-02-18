from flask import Flask, render_template, request, redirect, session
import random, json
from mongoConnector import *

restApi = Flask(__name__)

#any personal or important info is a post request
#any other information is get request
@restApi.route('/createuser', methods = ['POST'])
def addUser():
	info = requests.get_json()
    populateLogin(info)
    print("login data was populated")
    #creates session when the person creates account
    session['user'] = info['username']

#authenticates user for database
@restApi.route('/authenticate', methods = ['POST'])
def auth():
    info = requests.get_json()
    if(authenticateLogin(info["username"],info["password"])):
    	session['user'] = info["username"]
    else:
    	print("The password or the username that you have entered doesnt exist")


@restApi.route('/restaurants/', methods = ['POST'])#have some parameters
def getRestaurants():
    #query db and return json to the front end

@restApi.route('/restaurants/', methods = ['POST'])#have some parameters                 
def getRestaurants():
    #query db and return json to the front end 



if __name__ == '__main__':
    app.run()

