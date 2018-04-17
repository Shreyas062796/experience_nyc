

class PlaceCaching:

	def __init__(self):
		self._ids = list()
		self._size = 0
		self._page = 0

	def _isIn(self, an_id):
		return an_id in self._ids 

	def _reset(self):
		del self._ids
		self._ids = list()
		self._size = 0
		self._page = 0

	def addBatch(self, locList):
		size = len(locList)
		for location in locList:
			self._ids.append(location['id'])
		self._size+=size
		self._page+=1

	def 



