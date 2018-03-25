# functions that were in restclient
# keepting them here incase need be in the future but cleaning 
# restclient



@restClient.route('/topplace', methods=['GET'])
def getTopPlace():
	def getkey(a_str, a_request):
		try:
			return a_request.args[a_str]
		except KeyError:
			return None

	if request.method == 'GET':
		types = getkey('types', request)
		address = getkey('address', request)
		amount = getkey('amount', request)
		print('got in get key')

		# check if they all have a value, therefore 
		# data was passed in correctly
		if all([types, address, amount]):
			geocode = addressToGeo(address)
			lat, lng = geocode['lat'], geocode['lng']
			myobj = filtering.Filtering(lat, lng, types)			

			outdata = myobj.getLocationJson()
			return jsonify(outdata)

		else:
			return "Invalid credentials"



@restClient.route('/topbar', methods=['GET'])
def getTopBar():
	if request.method == 'GET':	
		amount = request.args['amount']
		address = request.args['address']

		data = CACHE.retrieveJson(address)
		if data is not None:
			print("Data is in cache, it is working congrats pls take down later")
			return jsonify(data) 
		else:
			place = addressToGeo(address)	
			lat, lng = place['lat'], place['lng']
			myobj = filtering.Filtering(lat,lng)

			outdata = myobj.getTopBars(int(amount))
			CACHE.addToCache(address, outdata)
			return jsonify(outdata)

	else:
		return "<h1> Error </h1>"
