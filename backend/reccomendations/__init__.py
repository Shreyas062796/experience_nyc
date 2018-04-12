from flask import Blueprint
from flask import Flask, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import random, json
import sys, os, time, threading, requests
import json
import datetime

#Development
# from reccomendations.reccomendations import Reccomendations

#Production
from reccomendations.reccomendations import Reccomendations


def add_routes(app=None):

	reccomendations = Blueprint("recommendations", __name__, url_prefix="/recommendations")

	@reccomendations.route('/placeRecommendations', methods=['POST'])
	def getPlaceReccomendations():
		"""get the reccomended places based off of favorites for now (gonna change later)"""
		info = request.get_json()
		print(info['username'])
		print(info['address'])
		reccomendations = Reccomendations(info['username'],info['address']).PlaceReccomendation()
		if(reccomendations == "empty"):
			return(jsonify({"response":"the database is empty"}))
		else:
			return(jsonify(reccomendations))

	@reccomendations.route('/eventRecommendations', methods=['POST'])
	def getEventReccomendations():
		"""get event reccomendations"""
		pass
	app.register_blueprint(reccomendations)