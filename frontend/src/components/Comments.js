import React from 'react'
import Axios from 'axios'
import CommentCard from './CommentCard';
import auth from '../lib/auth';
import NewComment from './NewComment';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: null,
      newComment: ''
    }
  }

  handleChange(event) {
    this.setState({ newComment: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.newComment)
    const id = this.props.restaurantId
    const comment = {
      text: this.state.newComment
    }
    const authConfig = {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    }
    Axios.post(`/api/restaurant/${id}/comments`, comment, authConfig)
      .then(() => this.updateComments())
      .catch(err => console.log(err))
  }

  updateComments() {
    const id = this.props.restaurantId
    console.log('id ', id)
    Axios.get(`/api/restaurant/${id}/comments`)
      .then(resp => {
        console.log('comment response ', resp)
        this.setState({ comments: resp.data })
      })
      .catch(err => console.error(err))
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
    const loggedIn = auth.isLoggedIn
    const { comments } = this.state
    if (this.state.comments === null) return <h1>Comments loading...</h1>
    return <section className="section">
      <div className="container">
        <div className="comments">
          <h1 className="title">Comments</h1>
          {loggedIn &&
            <NewComment
              onChange={(event) => this.handleChange(event)}
              onSubmit={(event) => this.handleSubmit(event)}
            />}
          {comments.map(comment => {
            return <CommentCard key={comment._id} comment={comment} />
          })}
        </div>
      </div>
    </section>
  }
}

export default Comments