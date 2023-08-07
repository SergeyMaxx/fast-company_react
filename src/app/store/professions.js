import {createSlice} from '@reduxjs/toolkit'
import professionService from '../services/profession.service'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested(state) {
      state.isLoading = true
    },
    professionsReceived(state, action) {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFiled(state, action) {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const {reducer: professionsReducer, actions} = professionsSlice
const {professionsRequested, professionsReceived, professionsRequestFiled} = actions

const isOutdated = date => Date.now() - date > 10 * 60 * 1000

export const loadProfessionsList = () => {
  return async (dispatch, getState) => {
    const {lastFetch} = getState().professions

    if (isOutdated(lastFetch)) {
      dispatch(professionsRequested())
      try {
        const {content} = await professionService.get()
        dispatch(professionsReceived(content))

      } catch (error) {
        dispatch(professionsRequestFiled(error.message))
      }
    }
  }
}

export const getProfessionById = id => {
  return state => state.professions.entities &&
    state.professions.entities.find(p => p._id === id)
}

export const getProfessions = () => state => state.professions.entities
export const getProfessionsLoadingStatus = () => state => state.professions.isLoading

export default professionsReducer