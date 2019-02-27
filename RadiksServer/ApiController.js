var aggregateMessages = require('./common/lib/aggregators/messages-aggregator').aggregateMessages;
var transformMessageVotes = require('./common/lib/aggregators/messages-aggregator').transformMessageVotes;

const express = require('express');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');

const makeApiController = (db) => {
  const Router = decorateApp(express.Router());
  const radiksData = db.collection(COLLECTION);
  radiksData.collectionName = "radiks-server-data2";

  Router.getAsync('/messages', async (req, res) => {
    let messages = await aggregateMessages(radiksData, req.query);

    let username = (req.query.fetcher || req.universalCookies.get('username'));
    if (username) username = username.replace(/"/g, '');
    messages = await transformMessageVotes(messages, username);

    res.json({ messages });
  });

  Router.getAsync('/avatar/:username', async (req, res) => {
    const { username } = req.params;
    const user = await radiksData.findOne({ _id: username });
    if (!user) {
      return res.redirect('/static/banana.jpg');
    }
    let image;
    if (user.profile.image) {
      [image] = user.profile.image;
    }

    if (image) {
      return res.redirect(image.contentUrl);
    }

    return res.redirect('/static/banana.jpg');
  });

  Router.getAsync('/usernames', async (req, res) => {
    const users = await radiksData.find({
      radiksType: 'BlockstackUser',
    }, {
      projection: { username: 1 },
    }).toArray();
    const usernames = users.map(({ username }) => username);
    res.json(usernames);
  });

  return Router;
};

module.exports = makeApiController;
