
class Cacher:
	'''
	# average json reply is <7kb
	100 replies == 700kb
	1000 replies = 7000kb
	'''
	def __init__(self, size=1000):
		self._data = dict()
		self.size = size 

	def curr_len(self):
		return len(self._data)

	
	def _isIn(self, address):
		return address in self._data.keys()


	def retrieveJson(self, address):
		if self._isIn(address):
			return self._data[address]
		else:
			return None

	# add a json to the cache,
	# if size is 1000+ delete an
	# element to make space 
	def addToCache(self, address, ajson):
		if self.curr_len() >= self.size:
			self._data.popitem()
		self._data[address] = ajson

