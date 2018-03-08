# There is definitly a better way to do this
# however in attempt to have the serve live for
# debugging I will make this temporary fix.

import json

class Chacher:

	def __init__(self, cache_file="cache.json"):
		self._cache_file = cache_file
		self._clear()
		self._keys = list()

	def _clear(self):
		# purge all old data on inital launch
		# or create file if it doesn't exsts
		with open(self._cache_file, 'w') as cFile:
			cFile.write("{}")

	def _isIn(self, address):
		return address in self._keys


	def retrieveJson(self, address):
		if self._isIn(address):
			json_data = dict()
			with open(self._cache_file, 'r') as cFile:
				json_data = json.load(cFile)

			return json_data[address]
		else:
			return None

	# not efficient, there is a caching library for flask look into it
	def addToCache(self, location, ajson):
		self._keys.append(location)
		data = dict()
		with open(self._cache_file, 'r') as inFile:
			data = json.load(inFile)
			data[location] = ajson
		with open(self._cache_file, 'w') as outFile:
			outFile.write(json.dumps(data))
