import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const initialState = Immutable.Map()
                              .set('fetching', false)
                              .set('features', []);

const reducers = (state = initialState , action) => {
  switch (action.type) {
    case actionTypes.FETCHING_START_ACTION: {
      return state.set('fetching', true);
    }

    case actionTypes.FETCHING_END_ACTION: {
      return state.set('fetching', false);
    }

    case actionTypes.FETCHED_FEATURES: {
      return state.set('features', Immutable.fromJS(action.features));
    }

    case actionTypes.OPEN_DELETE_DIALOG:
      return state.set('deleteDialog', Immutable.fromJS({
        featureName: action.featureName
      }));

    case actionTypes.CLOSE_DELETE_DIALOG:
      return state.delete('deleteDialog');

    case actionTypes.FEATURE_REMOVED:
      const featureName = action.featureName;
      return state.update('features', (feature) => feature.filterNot(feature => feature.get('name') === featureName));

    case actionTypes.OPEN_EDIT_DIALOG:
      const feature = action.feature;
      return state.set('editDialog',Immutable.fromJS({
        feature
      }));

    case actionTypes.CLOSE_EDIT_DIALOG:
      return state.delete('editDialog');

    case actionTypes.OPEN_CREATE_DIALOG:
      return state.set('createDialog', true);

    case actionTypes.CLOSE_CREATE_DIALOG:
      return state.delete('createDialog');

    case actionTypes.CREATED_FEATURE:
      return state.update('features', features => features.push(Immutable.fromJS(action.feature)));

    case actionTypes.UPDATE_FEATURE:
      const updatedFeature = action.feature;
      return state.update('features', features => {
        const featureIndex = features.findIndex((feature) => feature.name === updatedFeature.name);
        return features.update(featureIndex, () => Immutable.fromJS(updatedFeature));
      });

    case actionTypes.SEND_SNACK_MESSAGE:
      return state.set('snakeMessage', action.message);

    case actionTypes.CLEAR_SNACK_MESSAGE:
      return state.delete('snakeMessage');

    case actionTypes.GOOGLE_AUTH:
      return state.set('googleAuth', Immutable.fromJS({
        id_token: action.id_token
      }));

    default: {
      return state
    }
  }
};

export default reducers;