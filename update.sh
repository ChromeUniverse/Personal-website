#!/bin/bash
# Update script for AWS Lightsail VPS

# enter appropriate directory
cd ~/Personal-website
# fetch new files from remote Git repo
git pull
# restart Node.js server for good measure
pm2 restart app.js