import { combineReducers } from 'redux';
import cartoon from './cartoon';

const rootReducer = combineReducers({
  cartoon
  // todos
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
