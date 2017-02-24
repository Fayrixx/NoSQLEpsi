#!/bin/bash
bin/mongoimport --host localhost:27017 -d clients -c clients --type csv --headerline --file $1