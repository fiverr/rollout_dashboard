import * as actionTypes from './actionTypes';

const ROLLOUT_SERVICE_URL = 'http://localhost:9999/api/v1'

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
};

const openDeleteDialog = (featureName) => {
    return {
        type: actionTypes.OPEN_DELETE_DIALOG,
        featureName
    }
};

const closeDeleteDialog = () => {
    return {
        type: actionTypes.CLOSE_DELETE_DIALOG
    }
}

const deleteFeature = (featureName) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        return fetch(`${ROLLOUT_SERVICE_URL}/features/${featureName}`,{
            method: 'DELETE',
             })
            .then(() => {
                dispatch({type: actionTypes.FEATURE_REMOVED, featureName});
                dispatch({type: actionTypes.CLOSE_DELETE_DIALOG});
            })
    }
};

const openCreateDialog = (feature) => {
    return {
        type: actionTypes.OPEN_CREATE_DIALOG,
        feature
    }
};

const closeCreateDialog = () => {
    return {
        type: actionTypes.CLOSE_CREATE_DIALOG
    }
};

const updateFeature = (feature) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        return fetch(`${ROLLOUT_SERVICE_URL}/features/${feature.name}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feature)
        })
        .then((response) => response.json())
        .then(json =>  {
            const feature = json.data;
            dispatch({type: actionTypes.UPDATE_FEATURE, feature});
            dispatch({type: actionTypes.FETCHING_END_ACTION});
            dispatch({type: actionTypes.CLOSE_CREATE_DIALOG});
        })
    }
};


export {
    getFeatures,
    openDeleteDialog,
    closeDeleteDialog,
    openCreateDialog,
    closeCreateDialog,
    deleteFeature,
    updateFeature
}