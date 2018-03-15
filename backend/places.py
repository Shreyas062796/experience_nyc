import googlemaps
from pprint import pprint

def setClient():
    gmap = googlemaps.Client(key="AIzaSyDZtF0dy0aVX83TRZEd65cvGbPcLNMEU8o")
    return(gmap)

def getNYCRestaurants():
    gmap = setClient()
    return(gmap.places("restaurant",location=[40.7831,-73.9712],type="restaurant"))

def getNYCBars():
	gmap = setClient()
	return(gmap.places("bar",location=[40.7831,-73.9712],type="bar"))


if __name__ == "__main__":
    getNYCRestaurants()
    getNYCBars()
