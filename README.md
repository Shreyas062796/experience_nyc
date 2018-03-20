# ExperienceNYC


## **Flask Links:**


Url is for getting the best bars given the formula 1/(5.2-rating)*(2-distance)
-
restClient API Documentation

base url: https://experiencenyc.herokuapp.com/

```
URL: /queryrestaurants/<cost>/<rating>/<num>
METHODS: 		GET
DESCRIPTION: pass in a cost, rating and num(number of responses wanted), and we will query mongo and get json of restaurants.

URL: /topbars/<amount>
METHODS 		GET
DESCRIPTION: No caching, we may run out of api requests if called multiple times. This takes in only an among, it will using the filtering algorithm to get you bars from a set location (preset to Times Square)

URL: /topbar
METHODS: 		GET
PARAMETERS: {   “address”: “an address in nyc i.e 33rd street ny, ny”,
“amount”: “the amount of places you want as a response as an integer”}
DESCRIPTION: Caching, best one to use for testing. This will do the same as above, except closer to the final deliverable. This is subject to change so it may break, that’s why the above will stay since it will never be changed it is more likely to be working at any given time. 

URL: /auth/<string:code>
METHODS: 		GET
DESCRIPTION: Currently not working will change this once finished, this will check the users code to see if they tried to create an account, if they did it will “flip a switch” saying they are authenticated and will be able to use the site to its full capability.
```


