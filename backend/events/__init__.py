from flask import Blueprint 
from flask import Flask, render_template, request, redirect, session, jsonify
from flask_cors import CORS
import random, json
import sys, os, time, threading, requests
import json
import datetime



# Call files from top package here
# from .ExperienceNYC.backend import blue # just testing if i can get mongoconnector


def add_routes(app=None):

	events = Blueprint("events", __name__, url_prefix="/events")

	@events.route('/sample')
	def sample():
		"""This is just a test to see how would the blueprints work"""
		return "<h1> Seems like blueprints are working </h1>"


	app.register_blueprint(events)