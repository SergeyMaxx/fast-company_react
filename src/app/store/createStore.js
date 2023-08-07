import professionsReducer from './professions'
import qualitiesReducer from './qualities'
import {combineReducers, configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer
})

export function createStore() {
  return configureStore({reducer: rootReducer})
}