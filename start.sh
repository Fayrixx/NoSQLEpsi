#!/usr/bin/env bash
bin/mongod --dbpath=db --port 27017 > logs/mongodb.log &
node server.js > logs/nodejs.log &
