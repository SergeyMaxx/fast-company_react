import {createSlice} from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'
import isOutdated from '../utils/isOutdated'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested(state) {
      state.isLoading = true
    },
    qualitiesReceived(state, action) {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    qualitiesRequestFiled(state, action) {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const {reducer: qualitiesReducer, actions} = qualitiesSlice
const {qualitiesRequested, qualitiesReceived, qualitiesRequestFiled} = actions

export const loadQualitiesList = () => {
  return async (dispatch, getState) => {
    const {lastFetch} = getState().qualities

    if (isOutdated(lastFetch)) {
      dispatch(qualitiesRequested())

      try {
        const {content} = await qualityService.fetchAll()
        dispatch(qualitiesReceived(content))

      } catch (error) {
        dispatch(qualitiesRequestFiled(error.message))
      }
    }
  }
}

export const getQualitiesByIds = qualitiesIds => {
  return state => {
    if (state.qualities.entities) {
      const qualitiesArray = []

      for (const qualId of qualitiesIds) {
        for (const quality of state.qualities.entities) {
          if (quality._id === qualId) {
            qualitiesArray.push(quality)
            break
          }
        }
      }
      return qualitiesArray
    }
    return []
  }
}

export const getQualities = () => state => state.qualities.entities
export const getQualitiesLoadingStatus = () => state => state.qualities.isLoading

export default qualitiesReducer