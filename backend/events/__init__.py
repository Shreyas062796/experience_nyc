from flask import Blueprint 



# Call files from top package here
# from .ExperienceNYC.backend import blue # just testing if i can get mongoconnector


def add_routes(app=None):

	events = Blueprint("events", __name__, url_prefix="/events")

	@events.route('/sample')
	def sample():
		import mongoConnector
		"""This is just a test to see how would the blueprints work"""
		return "<h1> Seems like blueprints are working </h1>"


	app.register_blueprint(events)