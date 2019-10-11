const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'andreja.zarkovic@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app ${name}. Let me know hou you like the app...`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'andreja.zarkovic@gmail.com',
    subject: 'Cancel account',
    text: `Goodbye, ${name}, let us know if there is anything that we can do...`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}