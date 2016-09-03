import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';

const reducers = combineReducers({
  form: formReducer,
  routing: routeReducer,
});

export default reducers;
