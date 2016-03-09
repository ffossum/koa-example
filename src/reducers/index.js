import {combineReducers} from 'redux';
import {routeReducer as routing} from 'react-router-redux';
import forms from './forms';
import loggedInUser from './loggedInUserReducer';
import data from './data/dataReducer';
import mainChat from './mainChat';

export default combineReducers({
  routing,
  data,
  mainChat,
  forms,
  loggedInUser
});
