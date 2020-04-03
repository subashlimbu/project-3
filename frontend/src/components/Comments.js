import React from 'react'
import Axios from 'axios'
import CommentCard from './CommentCard';
import auth from '../lib/auth';
import NewComment from './NewComment';
import { Link } from 'react-router-dom'

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
    console.log(event.target)
    console.log(this.state.newComment)
    const textField = document.querySelector('.textarea')
    textField.value = ''
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
      .then(() => {
        this.setState({
          newComment: ''
        })
        this.updateComments()
      })
      .catch(err => console.log(err))
  }

  handleDelete(commentId) {
    const restaurantId = this.props.restaurantId
    const authConfig = {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    }
    Axios.delete(`/api/restaurant/${restaurantId}/comment/${commentId}`, authConfig)
      .then(() => {
        this.updateComments()
      })
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
    const isloggedIn = auth.isLoggedIn()
    const { comments } = this.state
    if (this.state.comments === null) return <h1>Comments loading...</h1>
    return <section className="section comment-column">
      <div className="container">
        <div className="comments">
          <h1 className="title">Comments ({comments.length})</h1>
          {isloggedIn &&
            <NewComment
              onChange={(event) => this.handleChange(event)}
              onSubmit={(event) => this.handleSubmit(event)}
            />}
          {comments && comments.map(comment => {
            console.log('COMMENTS HERE BEN ', comments)
            return <CommentCard
              key={comment._id}
              comment={comment}
              restaurantId={this.props.restaurantId}
              onClick={() => this.handleDelete(comment._id)}
              update={() => this.updateComments()}
            />
          })}
          {!isloggedIn && (
            <h6 className="title is-6"> <Link to="/login">Login </Link> to leave your comments</h6>
          )}
        </div>
      </div>
    </section>
  }
}

export default Comments