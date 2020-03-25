import React from 'react'

const CommentCard = ({ comment }) => {
  return <h2 className="subtitle">{comment.user}</h2>
}

export default CommentCard