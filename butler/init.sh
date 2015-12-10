#!/usr/bin/env bash

#Checks to be sure Bundler and NodeJS are installed before trying to use them.
dependency_fail=false
command -v bundler >/dev/null 2>&1 || { echo "Bundler is required but could not be found.  Aborting."; dependency_fail="true"; }
command -v npm >/dev/null 2>&1 || { echo "NodeJS is required but could not be found.  Aborting."; dependency_fail="true"; }

# If the project has bundler support.
if [ -e Gemfile ]; then
  echo "Installing Bundler dependencies globally."
  sudo bundle install;
fi

if [ $dependency_fail = "true" ]; then
  echo "Please install dependencies listed above and try again. View README for more information."
  exit
fi

sudo npm install gulp browser-sync gulp-sourcemaps gulp-sass --save-dev
