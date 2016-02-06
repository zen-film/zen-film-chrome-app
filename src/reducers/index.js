import { combineReducers } from 'redux';

import userReducer from './user'
import photoReducer from './photos'
import editorReducer from './editor'

import {showSettings, hideSettings, toggleSettings} from '../actions/userActions'

const showUserSettingsReducer = (state={showUserSetings: false}, action) => {
  switch (action.type) {
    case showSettings.type:
      return {...state, showUserSetings: true}
    case hideSettings.type:
      return {...state, showUserSetings: false}
    case toggleSettings.type:
      return {...state, showUserSetings: !state.showUserSetings}
    default:
      return state
  }
}

export default combineReducers({
   user: userReducer,
   photos: photoReducer,
   unSavedMeta: editorReducer,
   showUserSettings: showUserSettingsReducer
});
