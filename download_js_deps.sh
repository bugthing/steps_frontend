#!/usr/bin/env bash

echo "Downloading JavaScript dependencies..."

mkdir -p ./js/libs
mkdir -p ./css
mkdir -p ./test/js/libs
mkdir -p ./test/css

wget -N -P js/libs/ http://code.jquery.com/jquery-1.10.2.min.js
wget -N -P js/libs/ http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-1.0.0.js
wget -N -P js/libs/ http://builds.emberjs.com/tags/v1.0.0/ember.js
wget -N -P js/libs/ http://builds.emberjs.com/tags/v1.0.0-beta.3/ember-data.js

wget -N -P test/js/libs/ http://code.jquery.com/qunit/qunit-1.12.0.js
wget -N -P test/css/ http://code.jquery.com/qunit/qunit-1.12.0.css

echo "Ensure you get and build jsPlumb from: https://github.com/sporritt/jsPlumb.git"
echo "  Build with: bower install jsPlumb"
echo "  Then copy '<GIT DIR>/dist/js/jquery.jsPlumb-1.5.3.js' to '<THIS DIR>/js/libs/jquery.jsPlumb-1.5.3.js'"

echo "Done"

