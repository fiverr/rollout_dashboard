import * as actionTypes from './actionTypes';
import {Dispatch} from 'redux';
import {Feature, IFeature} from '../models/Feature';

declare let ROLLOUT_SERVICE_HOST: string;
declare let ROLLOUT_SERVICE_PORT: string;

const ROLLOUT_SERVICE_URL = `${ROLLOUT_SERVICE_HOST}:${ROLLOUT_SERVICE_PORT}/api/v1`;

const getFeatures = () => {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        const idToken = getState().getIn(['googleAuth', 'id_token']);

        return fetch(`${ROLLOUT_SERVICE_URL}/features?id_token=${idToken}`, {credentials: 'same-origin'})
            .then((response) => response.json())
            .then((json: any) => {
                let features: any[] = json.data;
                features = features.map((f: IFeature) => new Feature(f));
                dispatch({type: actionTypes.FETCHING_END_ACTION});
                dispatch({type: actionTypes.FETCHED_FEATURES, features});
                dispatch(sendSnakeMessage(`Fetched ${features.length} features.`));
            })
            .catch(e => {
                dispatch(sendSnakeMessage(`An Error occurred. Please try again.`));
            });
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
            credentials: 'same-origin',
            body: JSON.stringify({
                id_token: getState().getIn(['googleAuth', 'id_token']),
                name: featureName
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
       {
       type: actionTypes.UPDATE_FEATURE,
       field,
       value,
    });
};

const closeEditDialog = () => {
    return {
        type: actionTypes.CLOSE_EDIT_DIALOG,
    }
};

const saveUpdatedFeature = () => {
    return (dispatch: any, getState: any) => {
        dispatch({type: actionTypes.FETCHING_START_ACTION});
        const store = getState();
        const feature = store.get('editDialog') && store.get('editDialog').feature;
        const data = Object.assign({}, feature , {
            id_token: store.getIn(['googleAuth', 'id_token']),
        });

        return fetch(`${ROLLOUT_SERVICE_URL}/features/${feature.name}`,
            {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((json: any) =>  {
            const updatedFeature: Feature = new Feature((json.data as IFeature));
            dispatch({type: actionTypes.SAVE_UPDATED_FEATURE, updatedFeature});
            dispatch({type: actionTypes.FETCHING_END_ACTION});
            dispatch(sendSnakeMessage(`The feature ${updatedFeature.name} has been updated.`));
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
    };
};
//
const closeCreateDialog = () => {
    return {
        type: actionTypes.CLOSE_CREATE_DIALOG,
    };
};

const createFeature = (feature: Feature) => {
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
            credentials: 'same-origin',
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json: any) =>  {
                const payload: IFeature = json.data;
                const feature = new Feature(payload);

                dispatch({type: actionTypes.CREATED_FEATURE, feature});
                dispatch(sendSnakeMessage(`The feature ${feature.name} has been created.`));
            })
            .catch(e => dispatch(sendSnakeMessage(`An Error occurred.`)))
            .then(() => {
                dispatch(closeCreateDialog());
            });
    }
};

const sendSnakeMessage = (message: string) => {
    return {
        type: actionTypes.SEND_SNACK_MESSAGE,
        message,
    };
};

const clearSnakeMessage = () => {
    return {
        type: actionTypes.CLEAR_SNACK_MESSAGE,
    };
};

const googleAuthentication = (idToken: string, username: string, mail: string) => {
    return {
        type: actionTypes.GOOGLE_AUTH,
        id_token: idToken,
        username,
        mail,
    };
};

export {
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
    googleAuthentication,
}


