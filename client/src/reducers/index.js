import { combineReducers } from 'redux';
import createCards from './createCards';
import auth from './auth';


export const reducers = combineReducers({
      createCards,
      auth
});  