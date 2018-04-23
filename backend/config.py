import os

"""
Shrey if you reading this ask me, this 
is some configurations for heroku that will be needed later for scalling

"""



# something to be shared accros all instances
class Config:
	SECRET_KEY = "for now just use something random, needed if csrf is needed"

# prodcution variables
class ProductionConfig(Config):
	DEBUG = False

# developent variables
class DevelopmentConfig(Config):
	DEBUG = True


