import Immutable from 'immutable';
import {ACCESS_KEY_ENTERED_ACTION} from '../actions/index';
import * as actionTypes from '../actions/actionTypes';

const initialState = Immutable.Map()
                              .set('fetching', false)
                              .set('features', []);
                        
const reducers = (state = initialState , action) => {
  switch (action.type) {
    case actionTypes.FETCHING_START_ACTION: {
      return state.set('fetching', true);
      break;
    }
    case actionTypes.FETCHING_END_ACTION: {
      return state.set('fetching', false);
      break;
    }
    case actionTypes.FETCHED_FEATURES: {
      return state.set('features', action.features);
      break;
    }
    default: {
      return state
    }
  }
};

export default reducers;