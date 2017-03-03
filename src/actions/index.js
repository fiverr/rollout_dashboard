import * as actionTypes from './actionTypes';

const ROLLOUT_SERVICE_URL = `${ROLLOUT_SERVICE_HOST}:${ROLLOUT_SERVICE_PORT}/api/v1`;

const getFeatures = () => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        return fetch(`${ROLLOUT_SERVICE_URL}/features`)
            .then(response => response.json())
            .then(json => {
                const features = json.data;
                features.map(f => {
                    return Object.assign({},{
                        history: [],
                        description: '',
                        last_author: '',
                        last_author_mail: '',
                        users: [],
                        created_at: '',
                        created_by: ''
                    }, f);
                });
                dispatch({type: actionTypes.FETCHING_END_ACTION});
                dispatch({type: actionTypes.FETCHED_FEATURES, features});
                dispatch(sendSnakeMessage(`Fetched ${features.length} features.`));
            })
            .catch(e => {
                dispatch(sendSnakeMessage(`An Error occurred. Please try again.`))
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
            body: {
                id_token: getState().getIn(['googleAuth','id_token'])
            }})
            .then(() => {
                dispatch({type: actionTypes.FEATURE_REMOVED, featureName});
                dispatch(sendSnakeMessage(`The feature ${featureName} has been deleted.`))
            })
            .catch(e => dispatch(sendSnakeMessage(`An Error occurred. Please try again.`)))
            .then(() => {
                dispatch({type: actionTypes.CLOSE_DELETE_DIALOG});
            })
    }
};

const openEditDialog = (feature) => {
    return {
        type: actionTypes.OPEN_EDIT_DIALOG,
        feature
    }
};

const closeEditDialog = () => {
    return {
        type: actionTypes.CLOSE_EDIT_DIALOG
    }
};

const updateFeature = (feature) => {
    return (dispatch, getState) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        const store = getState();
        const data = Object.assign({}, feature, {
            id_token: store.getIn(['googleAuth','id_token'])
        });

        return fetch(`${ROLLOUT_SERVICE_URL}/features/${data.name}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then(json =>  {
            const feature = json.data;
            dispatch({type: actionTypes.UPDATE_FEATURE, feature});
            dispatch({type: actionTypes.FETCHING_END_ACTION});
            dispatch(sendSnakeMessage(`The feature ${feature.name} has been updated.`))
        })
        .catch(e => dispatch(sendSnakeMessage(`An Error Occurred, Please try again.`)))
        .then(() => {
            dispatch(closeEditDialog());
        })


    }
};


const openCreateDialog = () => {
    return {
        type: actionTypes.OPEN_CREATE_DIALOG
    }
};


const closeCreateDialog = () => {
    return {
        type: actionTypes.CLOSE_CREATE_DIALOG
    }
};

const createFeature = (feature) => {
    return (dispatch, getState) => {

        const store = getState();
        const data = Object.assign({}, feature, {
            id_token: store.getIn(['googleAuth','id_token'])
        });

        dispatch({type: actionTypes.FETCHING_START_ACTION});
        return fetch(`${ROLLOUT_SERVICE_URL}/features/${data.name}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then(json =>  {
                const feature = json.data;
                dispatch({type: actionTypes.CREATED_FEATURE, feature});
                dispatch(sendSnakeMessage(`The feature ${feature.name} has been created.`));
            })
            .catch(e => dispatch(sendSnakeMessage(`An Error occurred.`)))
            .then(() => {
                dispatch(closeCreateDialog());
            })
    }
};

const sendSnakeMessage = (message) => {
    return {
        type: actionTypes.SEND_SNACK_MESSAGE,
        message
    }
};

const clearSnakeMessage = () => {
    return {
        type: actionTypes.CLEAR_SNACK_MESSAGE
    }
};

const googleAuthentication = (id_token) => {
    return {
        type: actionTypes.GOOGLE_AUTH,
        id_token
    }
};

export {
    getFeatures,
    openDeleteDialog,
    closeDeleteDialog,
    openEditDialog,
    closeEditDialog,
    deleteFeature,
    updateFeature,
    openCreateDialog,
    closeCreateDialog,
    createFeature,
    sendSnakeMessage,
    clearSnakeMessage,
    googleAuthentication
}