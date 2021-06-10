#!/bin/bash
# Update script for AWS Lightsail or any other VPS.

# NOTE: permissions on VPS need to be updated before running this. 
#       Something like `chmod +x` should do the trick.

# enter appropriate directory
cd ~/Personal-website
# fetch new files from remote Git repo
git pull
# restart Node.js server for good measure
pm2 restart app.js