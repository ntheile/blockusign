#!/bin/sh
# Make sure to make this script executable on a mac by running this command in the terminal 'chmod +x chrome.sh'

# first, kill all instances of chrome (for some reason i have to do this to make it work)
ps auxww | grep -i 'google chrome' | grep -v grep | awk '{ print $2 }' | xargs kill -9 || true

sleep 2

# now, open a new instance of chrome without cors enabled, so blockstack login works with ionic live reload
open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir || true