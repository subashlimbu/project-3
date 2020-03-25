import React from 'react'
import Axios from 'axios';
import auth from '../lib/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

class CommentCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLiked: null,
      isDisliked: null
    }
  }

  componentDidMount() {
    const { comment, restaurantId } = this.props
    const commentId = comment._id
    const authConfig = {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    }
    Axios.get(`/api/restaurant/${restaurantId}/comment/${commentId}/likes`, authConfig)
      .then(res => {
        console.log(res)
        this.setState({
          isLiked: res.data.isLiked,
          isDisliked: res.data.isDisliked
        })
      })
      .catch(err => console.log(err))
  }

  handleLike() {
    const { comment, restaurantId } = this.props
    const commentId = comment._id
    const authConfig = {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    }
    Axios.get(`/api/restaurant/${restaurantId}/comment/${commentId}/like`, authConfig)
      .then(res => {
        console.log(res)
        this.setState({
          isLiked: res.data.isLiked,
          isDisliked: res.data.isDisliked
        })
        this.props.update()
      })
      .catch(err => console.log(err))
  }

  handleDislike() {
    const { comment, restaurantId } = this.props
    const commentId = comment._id
    const authConfig = {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    }
    Axios.get(`/api/restaurant/${restaurantId}/comment/${commentId}/dislike`, authConfig)
      .then(res => {
        console.log(res)
        this.setState({
          isLiked: res.data.isLiked,
          isDisliked: res.data.isDisliked
        })
        this.props.update()
      })
      .catch(err => console.log(err))
  }


  render() {
    const user = auth.getName()
    const { isLiked, isDisliked } = this.state
    const { comment } = this.props

    return <div className="comment">
      <h2>{comment.user.username}</h2>
      <p>{comment.text}</p>
      <i className="far fa-thumbs-up"></i>
      <i className="far fa-thumbs-down"></i>
      <span>{comment.likedBy.length}</span>
      <FontAwesomeIcon className={isLiked ? 'liked' : ''} icon={faThumbsUp} onClick={() => this.handleLike()} />
      <span>{comment.dislikedBy.length}</span>
      <FontAwesomeIcon className={isDisliked ? 'disliked' : ''} icon={faThumbsDown} onClick={() => this.handleDislike()} />
      {user === comment.user.username && <button className="button is-danger" onClick={this.props.onClick}>Delete</button>}
    </div>
  }
}

export default CommentCard