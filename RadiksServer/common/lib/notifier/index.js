const linkify = require('linkifyjs');
const mentionPlugin = require('linkifyjs/plugins/mention');
const { CENTRAL_COLLECTION } = require('radiks-server/app/lib/constants');
const _ = require('lodash');

const emailify = require('react-emailify').default;

const MentionEmail = require('../../../components/email/mention').default;

const { sendMail, mentionedEmail } = require('../mailer');

mentionPlugin(linkify);

const handleNewModel = async (db, attrs) => {
  // console.log('emitter', attrs);
  if (attrs.radiksType !== 'Message') {
    return true;
  }

  const { content, createdBy } = attrs;
  console.log(`@${createdBy}: ${content}`);
  const matches = linkify.find(content);
  const mentions = {};

  matches.forEach((match) => {
    if (match.type === 'mention') {
      const username = match.value.slice(1);
      mentions[username] = true;
    }
  });

  const mentionedUsers = Object.keys(mentions);

  console.log('Mentions:', mentionedUsers.join(','));

  const centralCollection = db.collection(CENTRAL_COLLECTION);
  const collectMentionsToSend = mentionedUsers.map((username) => new Promise(async (resolve, reject) => {
    try {
      if (username === createdBy) {
        return resolve(null);
      }
      const _id = `${username}-UserSettings`;
      const settings = await centralCollection.findOne({ _id });
      if (!settings) {
        console.log('No settings for', username, _id);
        return resolve(null);
      }
      // console.log(settings);
      const { email, notifyMentioned } = settings;
      if (email && email.length > 0 && notifyMentioned) {
        return resolve({
          username,
          email,
        });
      } 
      return resolve(null);
    } catch (error) {
      return reject(error);
    }
  }));

  let mentionsToSend = await Promise.all(collectMentionsToSend);
  mentionsToSend = _.compact(mentionsToSend);
  console.log(mentionsToSend);

  const sendMentions = mentionsToSend.map((mention) => new Promise(async (resolve) => {
    try {
      const emailTemplate = emailify(MentionEmail);
      const html = emailTemplate({
        message: attrs,
        mention,
      });
      await sendMail(mentionedEmail(html, mention, attrs));

      return resolve(true);
    } catch (error) {
      console.error('Error when sending message:');
      console.error(error);
      return resolve(true);
    }
  }));

  await Promise.all(sendMentions);
  return true;
};

module.exports = handleNewModel;
