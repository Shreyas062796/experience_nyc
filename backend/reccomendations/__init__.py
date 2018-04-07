from flask import Blueprint 
from .reccomendations import Reccomendations


def add_routes(app=None):

	reccomendations = Blueprint("reccomendations", __name__, url_prefix="/reccomendations")

	@reccomendations.route('/placeReccomendations', methods=['POST'])
	def getPlaceReccomendations():
		info = request.get_json()
		print(info['username'])
		print(info['address'])
		reccomendations = Reccomendations(info['username'],info['address']).PlaceReccomendation()
		if(reccomendations == "empty"):
			return(jsonify({"response":"the database is empty"}))
		else:
			return(jsonify(reccomendations))

	@reccomendations.route('eventReccomendations', methods=['POST'])
	def getEventReccomendations():
		pass
	app.register_blueprint(reccomendations)