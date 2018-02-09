# this is for sotring data
from pymongo import MongoClient
import pprint


# will host this on a raspberrypi later ask me for the adress as a pm
client = MongoClient('mongodb://localhost:27017/')



sample_user = {
    "_id": "5a7e0549dff24a122da5f6fc",
    "index": 0,
    "guid": "d5fb5e0a-0dd1-4859-abb6-12b61341e27f",
    "isActive": True,
    "balance": "$3,894.35",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "name": {
      "first": "Lula",
      "last": "Estrada"
    },
    "company": "MARTGO",
    "email": "lula.estrada@martgo.biz",
    "phone": "+1 (874) 579-2498",
    "address": "645 Grant Avenue, Byrnedale, Maryland, 8101",
    "registered": "Tuesday, April 22, 2014 5:00 PM",
    "latitude": "-81.12855",
    "longitude": "-56.527666"
  }


db = client.users # use the users database

db.autos.insert(sample_user)

for ite in db.autos.find():
	pprint.pprint(ite)

	


