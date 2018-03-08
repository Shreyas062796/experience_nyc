# There is definitly a better way to do this
# however in attempt to have the serve live for
# debugging I will make this temporary fix.

import json

class Chacher:

	def __init__(self, cache_file="cache.json"):
		self.cache_file = cache_file
		self._clear()
		self._keys = list()

	def _clear(self):
		# purge all old data on inital launch
		# or create file if it doesn't exsts
		open(self.cache_file, 'w').close():

	def _isIn(self, address):
		return address in self._keys


	def retrieveJson(self, address):
		if self._isIn(address):
			json_data = dict()
			with open(self.cache_file, 'r') as cFile:
				content = cFile.read()
				json_data = json.loads(content)
			return json_data
		else:
			return None