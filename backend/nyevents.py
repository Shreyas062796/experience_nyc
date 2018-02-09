from mytoken import *
import bs4
import requests


# for this example let me use eventbrite

#this is for coordinates in central park 6 mile radius
web_link = "https://www.eventbriteapi.com/v3/events/search/?location.within=6mi&location.latitude=40.785416&location.longitude=-73.963165&token="

web_link+= the_token # github safety


# this is a large json of events. 
# this is just so we can start having something to 
# work with yee bois we doing this
r = requests.get(web_link)
print(r.status_code)
print(r.content)




