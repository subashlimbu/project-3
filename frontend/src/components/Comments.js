import React from 'react'
import Axios from 'axios'
import CommentCard from './CommentCard';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: null
    }
  }

  componentDidMount() {
    const id = this.props.restaurantId
    console.log('id ', id)
    Axios.get(`/api/restaurant/${id}/comments`)
      .then(resp => {
        console.log('comment response ', resp)
        this.setState({ comments: resp.data })
      })
      .catch(err => console.error(err))
  }

  render() {
    const { comments } = this.state
    if (this.state.comments === null) return <h1>Comments loading...</h1>
    return <div className="comments">
      <h1 className="title">Comments</h1>
      {comments.map(comment => {
        return <CommentCard key={comment._id} comment={comment} />
      })}
    </div>
  }
}

export default Comments