import React from 'react'

const CommentCard = ({ comment }) => {
  return <h2 className="subtitle">{comment.text}</h2>
}

export default CommentCard