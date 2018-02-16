import weather
# to install use pip import weather-api

"""
Sample dictionary for a forecast in getForecast

{'day': 'Thu', 'low':'25', 'code':'34', 'date':'08 Feb 2018',
	'high': '33', 'text': 'Mosly Sunny'}

NyWeather('New York, New York')
"""
class NyWeather:
	def __init__(self, location="New York, New York"):
		self.location = location 
		self.wny = weather.Weather().lookup_by_location(location)

	def getSunrise(self):
		return self.wny.astronomy()['sunrise']
	def getSunset(self):
		return self.wny.astronomy()['sunset']

	# get the forecast as a dictionary
	def getForecast(self, day=0):
		if day>=10:
			raise ValueError("Cannot search for forecast that ahead")
		forecast = self.wny.forecast()

		return forecast[day]._forecast_data

	# by default it's zero as in get todays
	def forecastDescription(self, day=0):
		if day>=10:
			raise ValueError("Cannot search for forecast that ahead")
		forecast = self.wny.forecast()

		return forecast[day].text() # ie "Mostly Sunny"

	# get a tuple with temperature (low, high)
	def getLowHigh(self, day=0):		
		if day>=10:
			raise ValueError("Cannot search for forecast that ahead")
		forecast = self.wny.forecast()
		today = forecast[day]

		return (today.low(), today.high())
