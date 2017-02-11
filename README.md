# Rollout-Dashboard

**Rollout-Dashboard is a beautiful user interface for rollout gem.**

It allows you to perform CRUD operations and send them to Rollout-Service  (a Grape service that expose rollout gem with RESTful endpoints). 

We used React + Redux stack and Webpack for bundling it.

## Preview: 
<img width="1280" alt="screen shot 2017-02-11 at 10 53 29 pm" src="https://cloud.githubusercontent.com/assets/8016250/22857588/4fc5a084-f0b0-11e6-99fb-4beda0ab44d5.png">
## How it's work?

Rollout-Dashboard communicates with Rollout-Service via AJAX requests to perform actions on rollout gem.

## How to run it?
Edit the service configuration from `./config/app/js`.

Start it by running `npm run start:dev`

