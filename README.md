
# blockusign

A decentralized document signing tool where you own and control your own documents, contracts and data.

It is built on BlockStack.

Technical write up here: [https://medium.com/blockstack-blog/blockusigns-pragmatic-approach-to-smart-contracts-anchoring-data-on-blockchain-using-blockstack-fb9bd974a306](https://medium.com/blockstack-blog/blockusigns-pragmatic-approach-to-smart-contracts-anchoring-data-on-blockchain-using-blockstack-fb9bd974a306)

[![Build Status](https://dev.azure.com/nicktee-pipeline/blockusign/_apis/build/status/blockusign-ASP.NET%20Core%20(.NET%20Framework)-CI)](https://dev.azure.com/nicktee-pipeline/blockusign/_build/latest?definitionId=4)

![alt text](https://github.com/ntheile/blockusign/blob/master/blockusign.png?raw=true "Block-U-Sign")

# To Run Locally

The app uses Ionic (Angular + Cordova + Material Design UI) make sure you have it installed https://ionicframework.com/docs/intro/installation/ 

`npm install -g ionic@latest`

It also uses electron to wrap up as a desktop app (*electron code not written yet for auth)

`npm install -g electron`

`cd BlockUSign.Ionic`

`npm install`

There are several ways to start the app.  Sometimes when logging in with blockstack you come across cors issues. Most apps use a Node proxy, but then livereload does not work. That is why I created a few npm scripts to help.


If you goto the package.json file look at the scripts sections and look for `"start"`

For mac, the script should read :

 `"start:mac": "npm run chrome-mac && ionic serve",`

For windows: change the script to this (take off the -mac):

`"start": "npm run chrome && ionic serve"`

To actually start the app run:

`npm run start`

You will most likely get this error:

`Cannot GET /signup.html`

This only happens the first time you open the app. Sorry, I have not had time to improve this part yet :( . To fix this,  you will need to open the developer tools and set a localStorage setting in the console
or else you will be redirected to a non-existent signup.html page.

`localStorage.setItem('signUp', 'true')`

Refresh the app back to the root and you should be prompted for blockstack login!

`http://localhost:8100/`

If you are having login issues due to CORS, you can run the app the first time with a node proxy. This will boot up the app as a node app. * note you cannot live reload while debugging, so I recommend only using this when logging in for the first time.s

`npm run serve`

# Production Build

`npm run buildweb`

This will copy the ionic project to the wwwroot directory to be served up from the .net core project 

# Azure Deploy Settings

Make sure you have the following files configured on the azure website in Kudu:

`site\wwwroot\appsettings.json`

```
{
  "SendGridKey": "SG.q....",
  "GaiaToken": "bearer v1:eyJw...=",
  "EmailConfirmKey": "0181..."
}
```

Azure Portal Settings


Lets Encrypt


# Architecture Diagram

TODO :) 

Check out https://blockusign.co/signup.html for some basic architectural and design decisions. 

# Blockusign Schema

<pre>
Blockusign Document Schema Protocol
-------------------------------------------------
User
    |_ List Documents Index
        |_ document1
        |_ document2

User (nicktee.id)
    |_ List Document Index (guid, fileName, key) - asymmetric
        |_ document1 (guid, fileName, fileExt, key, paths([user, pathToStorage)]) - symmetric => asymmetric
        |_ document2 (guid, fileName, key, paths(user, pathToStorage)) - symmetric => asymmetric

Blockusign Global Index Protocol (Map document guids to user's storage bucket)
------------------------------------------------
guid.doc.storage.map.json
    pathToStorageForUser1 - https://gaia.blockstack.org/hub/18kTskBpTh1mznsypu1fhJ27dxbC1SwXEK/
    pathToStorageForUser2
    pathToStorageForUser3

</pre>


## Integration Tests

Install the global dependencies
`npm install -g protractor`
`npm install -g webpack`
`npm install -g webpack-cli`

Open a terminal and run
`ionic serve`

In another terminal run
`npm run e2e`

or 
`run run test`

** https://leifwells.github.io/2017/08/27/testing-in-ionic-configure-existing-projects-for-testing/  (* note I had to downgrade a jasmine package from the tutorial) `npm install --save-dev jasmine@^2.99.0`


## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/ntheile/blockusign/badge.svg?style=beer-square)](https://beerpay.io/ntheile/blockusign)  [![Beerpay](https://beerpay.io/ntheile/blockusign/make-wish.svg?style=flat-square)](https://beerpay.io/ntheile/blockusign?focus=wish)
