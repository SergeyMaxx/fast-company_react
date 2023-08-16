import {orderBy} from 'lodash'
import React, {useEffect} from 'react'
import CommentsList, {AddCommentForm} from '../common/comments'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from '../../store/comments'

const Comments = () => {
  const {userId} = useParams()
  const dispatch = useDispatch()
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm
            onSubmit={data => dispatch(createComment({...data, pageId: userId}))}
          />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            {!isLoading
              ?
              <CommentsList
                comments={sortedComments}
                onRemove={id => dispatch(removeComment(id))}
              />
              : 'Loading...'
            }
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
