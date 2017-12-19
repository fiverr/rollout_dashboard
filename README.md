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
    - You can restrict the authentication only to specific google apps domain.
    - The token gets validate on [Rollout-Service](https://github.com/fiverr/rollout_service)
    
## Technology stack:
- Typescript
- React for view layer
- Redux for state management 
- Webpack for bundling
- Node Express service for serving the static assets

## How it works?

Rollout-Dashboard communicates with [Rollout-Service](https://github.com/fiverr/rollout_service) via AJAX requests to perform actions on rollout gem.

On page load, we're fetching from [Rollout-Service](https://github.com/fiverr/rollout_service) all the features (~2 seconds for ~240 features).

## Preview: 
![a](https://cloud.githubusercontent.com/assets/8016250/26057465/7a3c8844-3982-11e7-9791-24a65b18502f.gif)
![2](https://cloud.githubusercontent.com/assets/8016250/26057516/a72cb7d4-3982-11e7-9268-1f03b32a239d.gif)


# FAQ

## How to run it?
Start it by running `npm run start:dev`

## What's the 'history' field?

The history field is a list of the last 50 percentage changes.

## How do I restrict the google authentication to a specific domain.

This feature is already supported!

You can easily do that by editing the `config` file in [Rollout-Service](https://github.com/fiverr/rollout_service)

## How do I restrict the google authentication to specific users list.

You can do that by specifying the ALLOWED_USERS_EMAILS env var in [Rollout-Service](https://github.com/fiverr/rollout_service)

## Where do I get google auth credentials?

You can generate the credentials at [google console](https://console.cloud.google.com/).

For production environment -  You'll need to place `clientId` and  `apiKey` in the configuration file `config/app.js`.

For development environment - create a file named  `.gauthrc` in the root folder.

Place your clientId and apiKey in a json format -
```
{
"clientId": "",
"apiKey": ""
}
```

## I want to use Rollout-Dashboard without google auth, is it supported?

Currently this feature is not supported. 

Add an [issue](https://github.com/fiverr/rollout_dashboard/issues) on that and we'll refer that.

