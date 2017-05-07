import * as Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes';
import {Feature} from '../models/Feature';


const initialState = Immutable.Map()
                              .set('fetching', false)
                              .set('features', Immutable.List());

const reducers = (state = initialState , action) => {
  switch (action.type) {
    case actionTypes.FETCHING_START_ACTION: {
      return state.set('fetching', true);
    }

    case actionTypes.FETCHING_END_ACTION: {
      return state.set('fetching', false);
    }

    case actionTypes.FETCHED_FEATURES: {
      return state.set('features', action.features);
    }

    case actionTypes.OPEN_DELETE_DIALOG:
      return state.set('deleteDialog', Immutable.fromJS({
        featureName: action.featureName
      }));

    case actionTypes.CLOSE_DELETE_DIALOG:
      return state.delete('deleteDialog');

    case actionTypes.FEATURE_REMOVED:
      const featureName = action.featureName;
      let features = state.get('features') as Feature[];
      return features.filter((feature) => feature.name !== featureName);

    case actionTypes.OPEN_EDIT_DIALOG:
      const feature = action.feature;
      return state.set('editDialog',Immutable.fromJS({
        feature
      }));

    case actionTypes.CLOSE_EDIT_DIALOG:
      return state.delete('editDialog');

    case actionTypes.OPEN_CREATE_DIALOG:
      return state.set('createDialogVisible', true);

    case actionTypes.CLOSE_CREATE_DIALOG:
      return state.delete('createDialogVisible');

    case actionTypes.CREATED_FEATURE:
      return state.update('features', (features: any) => features.push(Immutable.fromJS(action.feature)));

    case actionTypes.SAVE_UPDATED_FEATURE:
      const updatedFeature = action.feature;
      return state.update('features', (features: any) => {
        const featureIndex = features.findIndex((feature) => feature.get('name') === updatedFeature.name);
        return features.update(featureIndex, () => Immutable.fromJS(updatedFeature));
      });

      case actionTypes.UPDATE_FEATURE:
      return state.setIn(['editDialog', 'feature', action.field], action.value)

    case actionTypes.SEND_SNACK_MESSAGE:
      return state.set('snakeMessage', action.message);

    case actionTypes.CLEAR_SNACK_MESSAGE:
      return state.delete('snakeMessage');

    case actionTypes.GOOGLE_AUTH:
      return state.set('googleAuth', Immutable.fromJS({
        id_token: action.id_token,
        username: action.username
      }));

    default: {
      return state;
    }
  }
};

export default reducers;