import * as actionTypes from './actionTypes';
import {Action, ActionCreator, Dispatch} from 'redux';
import {Feature, IFeature} from '../models/Feature';

declare let ROLLOUT_SERVICE_HOST: string;
declare let ROLLOUT_SERVICE_PORT: string;

const ROLLOUT_SERVICE_URL = `${ROLLOUT_SERVICE_HOST}:${ROLLOUT_SERVICE_PORT}/api/v1`;

const getFeatures = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        return fetch(`${ROLLOUT_SERVICE_URL}/features`)
            .then((response) => response.json())
            .then((json: any) => {
                let features: any[] = json.data;
                features = features.map((f: IFeature) => new Feature(f));
                dispatch({type: actionTypes.FETCHING_END_ACTION});
                dispatch({type: actionTypes.FETCHED_FEATURES, features});
                dispatch(sendSnakeMessage(`Fetched ${features.length} features.`));
            })
            .catch((e: any) => {
                dispatch(sendSnakeMessage(`An Error occurred. Please try again.`));
            })
    };
};

const openDeleteDialog = (featureName: string) => {
    return {
        type: actionTypes.OPEN_DELETE_DIALOG,
        featureName,
    };
};

const closeDeleteDialog = () => {
    return {
        type: actionTypes.CLOSE_DELETE_DIALOG,
    };
};

const deleteFeature = (featureName: string) => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        return fetch(`${ROLLOUT_SERVICE_URL}/features/${featureName}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_token: getState().getIn(['googleAuth', 'id_token']),
            })})
            .then(() => {
                dispatch({type: actionTypes.FEATURE_REMOVED, featureName});
                dispatch(sendSnakeMessage(`The feature ${featureName} has been deleted.`));
            })
            .catch((e) => dispatch(sendSnakeMessage(`An Error occurred. Please try again.`)))
            .then(() => {
                dispatch({type: actionTypes.CLOSE_DELETE_DIALOG});
            })
    }
};

const openEditDialog = (feature: Feature) => {
    return {
        type: actionTypes.OPEN_EDIT_DIALOG,
        feature,
    }
};

const updateFeature = (field: string, value: any) => {
   return (
       {type: actionTypes.UPDATE_FEATURE,
       field,
       value,
   });
};

const closeEditDialog = () => {
    return {
        type: actionTypes.CLOSE_EDIT_DIALOG
    }
};

const saveUpdatedFeature = () => {
    return (dispatch: any, getState: any) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        const store = getState();
        const feature = store.getIn(['editDialog', 'feature']).toJS();
        const data = Object.assign({},feature , {
            id_token: store.getIn(['googleAuth','id_token'])
        });

        return fetch(`${ROLLOUT_SERVICE_URL}/features/${feature.name}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json: any) =>  {
            const feature: any = json.data;
            dispatch({type: actionTypes.SAVE_UPDATED_FEATURE, feature});
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
        type: actionTypes.OPEN_CREATE_DIALOG,
    }
};
//
const closeCreateDialog = () => {
    return {
        type: actionTypes.CLOSE_CREATE_DIALOG,
    };
};

const createFeature = (payload: any) => {
    const feature = Object.assign({}, payload.inputs, payload.users);
    return (dispatch: any, getState: any) => {

        const store = getState();
        const data = Object.assign({}, feature, {
            id_token: store.getIn(['googleAuth', 'id_token']),
        });

        dispatch({type: actionTypes.FETCHING_START_ACTION});
        return fetch(`${ROLLOUT_SERVICE_URL}/features/${data.name}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((json: any) =>  {
                const feature: any = json.data;
                dispatch({type: actionTypes.CREATED_FEATURE, feature});
                dispatch(sendSnakeMessage(`The feature ${feature.name} has been created.`));
            })
            .catch(e => dispatch(sendSnakeMessage(`An Error occurred.`)))
            .then(() => {
                dispatch(closeCreateDialog());
            })
    }
};

const sendSnakeMessage = (message : string) => {
    return {
        type: actionTypes.SEND_SNACK_MESSAGE,
        message
    }
};

const clearSnakeMessage = () => {
    return {
        type: actionTypes.CLEAR_SNACK_MESSAGE,
    }
};

const googleAuthentication = (idToken: string, username: string) => {
    return {
        type: actionTypes.GOOGLE_AUTH,
        id_token: idToken,
        username,
    }
};

export {
    ActionCreator,
    Action,
    getFeatures,
    saveUpdatedFeature,
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
