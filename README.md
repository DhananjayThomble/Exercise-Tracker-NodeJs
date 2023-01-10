# Exercise Tracker Microservice Using Node and Express

Project Link: https://Exercise-Tracker.dhananjayt97.repl.co

This is a Node.js application that serves as an exercise tracker. It allows users to track their exercise activities by creating and viewing their exercise logs.


## Application Routes
- __GET /__ : Render the homepage
- __GET /api/users__ : Get all the users
- __POST /api/users__ : Add new user
- __POST /api/users/__:_id/exercises : Add new exercise log
- __GET /api/users/:_id/logs__ : Get all exercise logs of a user

## Built With
- Node.js
- Express.js - web framework for Node.js
- body-parser - middleware for handling HTTP POST request
- crypto - Node.js module for generating unique ids
