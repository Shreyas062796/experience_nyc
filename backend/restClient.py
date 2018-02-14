from flask import Flask, render_template, request, redirect, Response
import random, json

restApi = Flask(__name__)


@restApi.route('/createuser', methods = ['POST'])
def addUser():
    loginInfo = requests.get_json()
    #add to database

@restApi.route('/authenticate', methods = ['POST'])
def auth():
    info = requests.get_json()
#authenticates user for database
    
@restApi.route('/verify', methods = ['POST'])
def verify():
    info = requests.get_json()
    
    #querydb for user and compare user
    #return response back to frontend saying if it passed or failed

@restApi.route('/restaurants/', methods = ['POST'])#have some parameters
def getRestaurants():
    #query db and return json to the front end

@restApi.route('/restaurants/', methods = ['POST'])#have some parameters                 
def getRestaurants():
    #query db and return json to the front end 



if __name__ == '__main__':
    app.run()

