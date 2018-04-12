from flask import Blueprint
from flask import request, jsonify
# import sys, os
# sys.path.append(os.path.abspath(os.path.join('..', 'places')))
from .placesmongo import PlacesMongo


def add_routes(app=None):

	places = Blueprint("places", __name__, url_prefix="/places")

	@places.route('/queryplaces', methods=['GET'])
	def queryplaces():
		if request.method == 'GET':
			num = request.args['num']
			price_level = request.args.getlist('price_level[]')
			types = request.args.getlist('types[]')
			places = PlacesMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").queryPlaces(types,price_level,int(num))
			if(places):
				return(jsonify(places))
			elif(places == []):
				return(jsonify({"response":"There is no values"}))
	
	app.register_blueprint(places)