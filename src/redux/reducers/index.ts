import { combineReducers } from 'redux';
import cartoon from './cartoon';
import global from './global';

const rootReducer = combineReducers({
  cartoon,
  global
  // todos
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
