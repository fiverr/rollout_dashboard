import * as actionTypes from './actionTypes';

const ROLLOUT_SERVICE_URL = 'http://localhost:9999/api/v1/'

const getFeatures = () => {
 return (dispatch, getState) => {
     dispatch({type: actionTypes.FETCHING_START_ACTION})
     return fetch(`${ROLLOUT_SERVICE_URL}/features`)
     .then(response => response.json())
     .then(json => {
         const features = json.data;
         dispatch({type: actionTypes.FETCHING_END_ACTION})
         dispatch({type: actionTypes.FETCHED_FEATURES, features})
    })
 }
}

export {
    getFeatures
}