#!/bin/bash
bin/mongoexport --db clients --collection clients --type=csv --fields firstname,lastname,latitude,longitude --out $1