# Rollout-Dashboard

**Rollout-Dashboard is a beautiful interactive user interface for [rollout](https://github.com/fetlife/rollout) gem.**

It allows you to perform CRUD operations and send them to [Rollout-Service](https://github.com/fiverr/rollout_service)  (a Grape service that expose rollout gem with RESTful endpoints). 

## Features:
 - Search field.
 - Table view with action buttons
 - Delete, Create, Edit actions.
 - Validations, error messages and confirm message.
 - New fields - author, author mail, history, last update and description.
 - Security: 
    - You must connect via google in order to access the application.
    - The token gets validate on [Rollout-Service](https://github.com/fiverr/rollout_service)
    
## Technology stack:
- React for view layer
- Redux for state management 
- Webpack for bundling
- Express service for serving the static assets

## How it works?

Rollout-Dashboard communicates with [Rollout-Service](https://github.com/fiverr/rollout_service) via AJAX requests to perform actions on rollout gem.

On page load, we're fetching from [Rollout-Service](https://github.com/fiverr/rollout_service) all the features (~2 seconds for ~240 features).

Then, we're saving the features to Redux store, only rendering the first 20. (sorted by last update value)

To see all the features, just type in the search box `.*`.

## Preview: 
<img width="1280" alt="screen shot 2017-02-11 at 10 53 29 pm" src="https://cloud.githubusercontent.com/assets/8016250/22857588/4fc5a084-f0b0-11e6-99fb-4beda0ab44d5.png">

# FAQ

## How to run it?
Start it by running `npm run start:dev`

## What's the 'history' field?

The history field is a list of the last 50 percentage changes.

##  how do I restrict the google authentication to a specific domain.

This feature is already supported!

You can easily do that by editing the `config` file in [Rollout-Service](https://github.com/fiverr/rollout_service)
