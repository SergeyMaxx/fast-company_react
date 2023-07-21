import {orderBy} from 'lodash'
import React from 'react'
import CommentsList, {AddCommentForm} from '../common/comments'
import {useComments} from '../../hooks/useComments'

const Comments = () => {
  const {createComment, comments, removeComment} = useComments()
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm onSubmit={data => createComment(data)}/>
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr/>
            <CommentsList
              comments={sortedComments}
              onRemove={id => removeComment(id)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
