import googlemaps
from pprint import pprint

gmap = googlemaps.Client(key="AIzaSyCK_P92YBIo04vU5ldaBiTnCtvi9kejAjw")
pprint(gmap.places("restaurant",[40.7128,74.0060]))
