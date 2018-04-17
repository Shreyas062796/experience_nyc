import smtplib
from email.mime.text import MIMEText
import time, logging
import time, hashlib


# Logging
LOG_NAME = 'Error_Log.log'
logging.basicConfig(filename=LOG_NAME, level=logging.DEBUG)
base_msg = "Hi there, thanks for creating an account at ExperienceNYC,\nin order to finalize your authentication please go to the following link.\n"
base_url = "https://experiencenyc.herokuapp.com/users/verify/"

class sendMail:

	def __init__(self, mymail, mypass):
		self.mymail = mymail
		self.mypass = mypass


	def Send(self, to_email, subject, message):
		# message, code = self._generateCode(to_email)
		self._sendmail(to_email, subject, message)
		# add_to_db(to_email, unique_code) # add the code to db to check when user clicks it


	# ensure code is unique
	def generateCode(self, to_email):
		unique_code = hashlib.md5(to_email.encode('utf-8') + str(int(time.time())).encode('utf-8')).hexdigest()
		#unique_code = h_email+str(int(time.time()))
		message = (base_msg+base_url+unique_code)
		return unique_code, message


	def _sendmail(self, to_email, subject, message):
		text = MIMEText(message.encode('utf-8'), 'plain', 'utf-8')

		text['From'] = self.mymail
		text['To'] = to_email
		text['Subject'] = subject

		try:
			smtpObj = smtplib.SMTP('smtp.gmail.com:587') # ('localhost', 1025)
			smtpObj.ehlo()
			smtpObj.starttls()
			smtpObj.ehlo()
			smtpObj.login(self.mymail, self.mypass)
			smtpObj.sendmail(self.mymail, [to_email], "Subject: {}\n\n{}".format(subject, message))
			smtpObj.quit()
			print("Successfully sent email")
		except Exception as e: # Something can go wrong from google's side or an update
			print("Error: unable to send email: {}".format(e))
			logging.debug(e)
