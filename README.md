# README

A basic API for our final NorthCoders project.

The API allows users to make GET, PATCH and POST requests to our Firestore database.

The server is hosted here: https://mountain-server-api.herokuapp.com/api

## Endpoints

#### GET /api

#### GET /api/mountains

#### GET /api/mountains/:hillnumber

#### GET /api/users/:userToken

#### POST /api/users/:userToken

#### PATCH /api/users/:userToken

## Getting Started

First clone repository

`git clone https://github.com/jamwil123/mountains-api`

Then install dependencies

`npm Install`

## Starting the server

`npm run start`

## Testing

Testing for the API can be found in the `__tests__` folder.

To run the tests mountainCollection must be set to 'test-mountains' and userCollection must be set to 'test-users'. The variables can be found in `database-variable.js`.

## Requirements

`node v16.8.0`
