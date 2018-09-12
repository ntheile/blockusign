# blockusign

A decentralized document signing tool where you own and control your own documents, contracts and data.

It is built on BlockStack.

[![Build Status](https://dev.azure.com/nicktee-pipeline/blockusign/_apis/build/status/blockusign-ASP.NET%20Core%20(.NET%20Framework)-CI)](https://dev.azure.com/nicktee-pipeline/blockusign/_build/latest?definitionId=4)

![alt text](https://github.com/ntheile/blockusign/blob/master/blockusign.png?raw=true "Block-U-Sign")

# To Run Locally

The app uses Ionic (Angular + Cordova + Material Design UI) make sure you have it installed https://ionicframework.com/docs/intro/installation/ 

It also uses electron to wrap up as a desktop app

`npm install -g electron`

`cd BlockUSign.Ionic`

`npm install`

There are several ways to start the app.  Sometimes when logging in with blockstack you come across cors issues. Most apps use a Node proxy, but then livereload does not work. That is why I created a few npm scripts to help.


If you goto the package.json file look at the scripts sections and look for `"start"`

For mac, the script should read :

 `"start": "npm run chrome-mac && ionic serve"`

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



# Architecture Diagram

TODO :) 

Check out https://blockusign.co/signup.html for some basic architectural and design decisions. 
