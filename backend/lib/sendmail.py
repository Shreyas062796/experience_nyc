import smtplib
from email.mime.text import MIMEText
import time, logging

# Logging
LOG_NAME = 'Error_Log.log'
logging.basicConfig(filename=LOG_NAME, level=logging.DEBUG)


class Sendmail:

	def __init__(self, mymail, mypass):
		self.mymail = mymail
		self.mypass = mypass


	def sendmail(self, email, subject, message):
		
		text = MIMEText(message.encode('utf-8'), 'plain', 'utf-8')

		text['From'] = self.mymail
		text['To'] = email
		text['Subject'] = subject

		try:
	        smtpObj = smtplib.SMTP('smtp.gmail.com:587') # ('localhost', 1025)
	        smtpObj.ehlo()
	        smtpObj.starttls()
	        smtpObj.ehlo()
	        smtpObj.login(self.mymail, self.mypass)
	        smtpObj.sendmail(self.mymail, [email], text.as_string())
	        smtpObj.quit()
	        print("Successfully sent email")
	    except Exception as e: # Something can go wrong from google's side or an update
	        print("Error: unable to send email: {}".format(e))
	        logging.debug(e)







