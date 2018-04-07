from flask import Blueprint 
from backend.users.usersmongo import UsersMongo


def add_routes(app=None):

	users = Blueprint("users", __name__, url_prefix="/users")
	@users.route('/createuser', methods = ['POST'])
	def addUser():
		print(request.is_json)
		info = request.get_json() 
		print(info)
		info['verify'] = False
		info['user_unique_id'] = mail.sendMail("experiencenycco@gmail.com","anotherone_44").generateCode(info['email'])
		info['favorite_places'] = []
		info['current_trip_places'] = []
		info['tags'] = []
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").populateLogin(info)
		return(jsonify({"response":"True"}))

	#authenticates user for database
	@users.route('/authenticate', methods = ['POST'])
	def auth():
		info = request.get_json()
		if(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").authenticateLogin(info["username"],info["password"])):
			return(jsonify({"response":"True"}))
		else:
			return(jsonify({"response":"False"}))


	@users.route('/verify', methods = ['POST'])
	def verify():
		info = request.get_json()
		if(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").verifyEmail(info['username'],info['unique_id']) == True):
			return(jsonify({"response":"The email was verified"}))
		else:
			return(jsonify({"response":"The email was not verified try again"}))
		#username,unique_id,email

	# I'll need a function from you (addToFavorites) tha will take a unique place id as a single param and inserts it into the db as a list of favorite places
	# I'll also need you to write a function that will retreive the favorites returned as a json list
	@users.route('/addfavoriteplaces', methods=['POST'])
	def addfavoriteplaces():
		info = request.get_json()
		favorite = UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").addFavoritePlaces(info['username'],info['place_id'])
		if(favorite == "Added"):
			return(jsonify({"response":"True"}))
		else:
			return(jsonify({"response":"Place already Exists"}))

	@users.route('/removefavoriteplaces', methods=['POST'])
	def removefavoriteplaces():
		info = request.get_json()
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").removeFavoritePlaces(info['username'],info['place_id'])
		return(jsonify({"response":"True"}))

	@users.route('/getfavoriteplacesIds', methods=['POST'])
	def getfavoriteplacesIds():
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getFavoritePlacesIds(info['username'])))

	@users.route('/getfavoriteplaces', methods=['POST'])
	def getfavoriteplaces():
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getFavoritePlaces(info['username'])))

	@users.route('/addtripplaces', methods=['POST'])
	def addtripplaces():
		info = request.get_json()
		favorite = UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").addTripPlaces(info['username'],info['place_id'])
		if(favorite == "Added"):
			return(jsonify({"response":"True"}))
		else:
			return(jsonify({"response":"Place already Exists"}))

	@users.route('/removetripplaces', methods=['POST'])
	def removetripplaces():
		info = request.get_json()
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").removeTripPlaces(info['username'],info['place_id'])
		return(jsonify({"response":"True"}))

	@users.route('/gettripplacesIds', methods=['POST'])
	def gettripplacesIds():
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getTripPlacesIds(info['username'])))

	@users.route('/gettripplaces', methods=['POST'])
	def gettripplaces():
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getTripPlaces(info['username'])))

	@users.route('/addtags', methods=['POST'])
	def addTags():
		info = request.get_json()
		UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").addTags(info['username'],info['tags'])
		return(jsonify({"response":"True"}))

	@users.route('/removetags', methods=['POST'])
	def removeTags():
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").removeTags(info['username'],info['tags'])))

	@users.route('/gettags', methods=['POST'])
	def getTags():
		info = request.get_json()
		return(jsonify(UsersMongo("ds163918.mlab.com","63918","admin","admin","experience_nyc").getTags(info['username'])))

	app.register_blueprint(users)