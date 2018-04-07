from flask import Blueprint 
import tripmongo as trip


def add_routes(app=None):

	trips = Blueprint("trips", __name__, url_prefix="/trips")

	@trips.route('/createtrip', methods=['POST'])
	def createTrip():
		#for if the user is not logged in
		# placeIds,trip_id,user,distance
		# placeIds = request.args['placeIds']
		# trip_id = request.args['trip_id']
		# distance = request.args['types']
		# if(request.method == 'POST'):
		# 	username = request.args['username']
		info = request.get_json()
		trip = trip.TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").createTrip(info['placeIds'],info['trip_id'],info['username'],info['distance'])
		populated = trip.TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").populateTrip(trip)
		if(populated == "added"):
			return(jsonify({"response":"Trip Added"}))
		else:
			return(jsonify({"response":"Trip Not Added"}))

	@trips.route('/maketrippublic', methods=['POST'])
	def makeTripPublic():
		if request.method == "GET":
			tripid = int(request.args['amount'])
		trip = trip.TripMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").makeTripPublic(tripid)
		if(trip == "updated"):
			return("updated")
		else:
			return("not updated")

	@trips.route('/updateplacerating', methods=['GET'])
	def queryTrip():
		if request.method == "GET":
			tripid = request.args['trip_id']
			placeid = request.args['place_id']
			rating = int(request.args['amount'])

	@trips.route('/updatetriprating', methods=['POST'])
	def updateTripRating():
		pass
		
	app.register_blueprint(trips)