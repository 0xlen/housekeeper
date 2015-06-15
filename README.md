House Keeper
===================
A home safety project

### Description
This repo only include App Interface, built on sails.js framework.

This app should compact with Arduino board and sensor.

### Requirements
1. node.js
2. sails.js support you use mongodb (recommend) / mysql / postgresql/ localdisk to save data

### Dependencies
1. zipcode
2. openweathermap.org API

### Run the project

first to fetch all packages
> npm install

setup your database in (username, password and database)
> config/connection.js

change connection which you setup in config/connection.js (MongodbServer is default)
> config/models.js

then run sails
> sails lift

now just link to
> http://localhost:1337

## Notice
This js fetch json data from your zipcode server

If you want to more details
see:
> assets/js/zipcode/include.jsx

run zipcodetw server
> python depends/zipcodetw/web/zipcodetw_server.py


As you try to getJSON from your server, it may has cross domain issue,

you can use CORS solution of flask framework to fix this problem in zipcodetw project.
