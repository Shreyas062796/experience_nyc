import nltk
import requests

# SAMPLE API KEY 'AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o'
# SAMPLE PLACE ID 'ChIJ1ZG0g-9YwokR731RjbSTFvs'

"""
ex 

gk = GetKeywords(apikey)
reviews = gk.getData(place_id)

keywords = gk.getAdjectives(reviews)
print(keywords)

"""
# gets keywords based on a google place_id
# use this to add the db and get the parameters for filtering
class GetKeywords:
	def __init__(self, api_key):
		self.url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=:place_id:&key={0}".format(api_key)

	# pass in a place ID that will be given from the places API
	def _createURL(self, place_id):
		self.url = self.url.replace(':place_id:', place_id)

	# get the json response from the url for each of the places
	def getData(self, place_id):
		self._createURL(place_id)
		json_data = requests.get(self.url).json()
		return json_data['result']['reviews']


	# gets adjectives based off the user reviews
	def getAdjectives(self, reviews):
		adjectives = list()

		for review in reviews:
			line = nltk.word_tokenize(review['text'])
			adj = [word for (word,pos) in nltk.pos_tag(line) if pos[:2]=='JJ']
			for word in adj:
				if word not in adjectives:
					adjectives.append(word)
		
		return adjectives


	# function will return only adjectives followed by nouns
	# trying to zero in on specifics place might have
	def getAdjNouns(self, reviews):
		adj_nouns = list()

		for review in reviews:
			line = nltk.word_tokenize(review['text'])
			tag_list = nltk.pos_tag(line)

			for word in enumerate(tag_list):
				if word[1][1][:2] == 'NN':
					if word[0] == 0:
						continue 
					else:
						position = word[0]
						if tag_list[position-1][1][:2] == 'JJ':
							adj_nouns.append("{0} {1}".format(tag_list[position-1][0], word[1][0]))
		return adj_nouns




