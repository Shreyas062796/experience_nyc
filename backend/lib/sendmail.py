import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time, hashlib

#dont ask
end_redirect = """
<table cellspacing="0" cellpadding="0">
  <tr>
    <td>Click here so you can</td>
  </tr>
  <tr>

<td align="center" width="200" height="40" bgcolor="#000091" style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #ffffff; display: block;">
<a href="{0}" style="font-size:16px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block"><span style="color: #FFFFFF">Start Experiencing NYC</span></a>
</td>
</tr>
</table>
"""

base_msg = "Hi there, thank you for creating an account at ExperienceNYC,\nin order to finalize your authentication click the button below.\n\n\n"

base_url = "https://experiencenyc.herokuapp.com/users/verify/"

class sendMail:

	def __init__(self, mymail, mypass):
		self.mymail = mymail
		self.mypass = mypass


	def Send(self, to_email, subject, message, code):
		# message, code = self._generateCode(to_email)
		self._sendmail(to_email, subject, message, code)
		# add_to_db(to_email, unique_code) # add the code to db to check when user clicks it


	# ensure code is unique
	def generateCode(self, to_email):
		unique_code = hashlib.md5(to_email.encode('utf-8') + str(int(time.time())).encode('utf-8')).hexdigest()
		#unique_code = h_email+str(int(time.time()))
		message = base_msg
		return unique_code, message


	def _sendmail(self, to_email, subject, message, code):

		text = MIMEMultipart('Message')
		text['From'] = self.mymail
		text['To'] = to_email
		text['Subject'] = subject
		
		part1 = MIMEText(message, 'plain')
		part2 = MIMEText(end_redirect.format(base_url+code), 'html')

		text.attach(part1)
		text.attach(part2)


		# a = "Subject: {}\n\n{}".format(subject, message)

		try:
			smtpObj = smtplib.SMTP('smtp.gmail.com:587') # ('localhost', 1025)
			smtpObj.ehlo()
			smtpObj.starttls()
			smtpObj.ehlo()
			smtpObj.login(self.mymail, self.mypass)
			smtpObj.sendmail(self.mymail, [to_email], text.as_string())
			smtpObj.quit()
			print("Successfully sent email")
		except Exception as e: # Something can go wrong from google's side or an update
			print("Error: unable to send email: {}".format(e))

# mailbot = sendMail("experiencenycco@gmail.com","Shreyas_code_is_bad69")
# code, msg = mailbot.generateCode('stevendias11@gmail.com')
# mailbot.Send('stevendias11@gmail.com', 'ExperienceNYC', msg, code)