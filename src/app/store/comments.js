import {createAction, createSlice} from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import {nanoid} from 'nanoid'
import {getUserId} from '../services/localStorage.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested(state) {
      state.isLoading = true
    },
    commentsReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreate(state, action) {
      state.entities.push(action.payload)
    },
    commentDelete(state, action) {
      state.entities = state.entities.filter(c => c._id !== action.payload)
    }
  }
})

const {reducer: commentsReducer, actions} = commentsSlice
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreate,
  commentDelete
} = actions

const newCommentRequested = createAction('comments/newCommentRequested')
const deleteCommentRequested = createAction('comments/deleteCommentRequested')

export const loadCommentsList = userId => {
  return async dispatch => {
    dispatch(commentsRequested())
    try {
      const {content} = await commentService.getComments(userId)
      dispatch(commentsReceived(content))

    } catch (error) {
      dispatch(commentsRequestFailed(error.message))
    }
  }
}

export const createComment = data => {
  return async dispatch => {
    dispatch(newCommentRequested(data))

    try {
      const comment = {
        ...data,
        _id: nanoid(),
        created_at: Date.now(),
        userId: getUserId()
      }
      const {content} = await commentService.createComment(comment)
      dispatch(commentCreate(content))

    } catch (error) {
      dispatch(commentsRequestFailed(error.message))
    }
  }
}

export const removeComment = id => {
  return async dispatch => {
    dispatch(deleteCommentRequested())

    try {
      await commentService.removeComment(id)
      dispatch(commentDelete(id))

    } catch (error) {
      dispatch(commentsRequestFailed(error.message))
    }
  }
}

export const getComments = () => state => state.comments.entities
export const getCommentsLoadingStatus = () => state => state.comments.isLoading

export default commentsReducer