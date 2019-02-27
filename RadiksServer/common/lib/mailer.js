const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const FROM = '💩Banter <hello@banter.pub>';

const sendMail = (email) =>
  new Promise(async (resolve, reject) => {
    let transport = null;
    if (process.env.NODE_ENV === 'production') {
      transport = sendgridTransport({
        auth: {
          api_user: process.env.SENDGRID_USERNAME,
          api_key: process.env.SENDGRID_PASSWORD,
        },
      });
    } else {
      transport = {
        port: 1025,
        ignoreTLS: true,
      };
    }

    const client = nodemailer.createTransport(transport);
    client.sendMail(email, (error, info) => {
      if (error) {
        return reject(error);
      }
      return resolve(info);
    });
  });

const mentionedEmail = (html, mention, message) => {
  const url = process.env.STAGING ? 'https://staging.banter.pub' : 'https://banter.pub';
  return {
    from: FROM,
    to: mention.email,
    subject: `💩You were mentioned by @${message.createdBy}`,
    html,
    text: `
    You were mentioned in a message on Banter:\n
    ${message.content}\n
    ${url}/messages/${message._id}\n
    Happy Banting!
    `,
  };
};

const updatesEmail = (user, messages, html) => {
  const messageLines = messages.map((message) => `@${message.createdBy}: ${message.content}`);
  const url = process.env.STAGING ? 'https://staging.banter.pub' : 'https://banter.pub';
  return {
    from: FROM,
    to: user.email,
    subject: `Some 💩from Banter`,
    html,
    text: `
    Hey ${user.username}! Here's a few recent posts on Banter.\n\n
    ${messageLines.join('\n\n')}\n
    Happy Banting!\n\n

    You can get rid of this 💩in your settings page:\n
    ${url}/settings
    `,
  };
};

module.exports = {
  sendMail,
  mentionedEmail,
  updatesEmail,
};
