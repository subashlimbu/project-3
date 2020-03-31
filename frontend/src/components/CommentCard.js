import React from 'react'
import Axios from 'axios';
import auth from '../lib/auth';
import moment from 'moment'

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
    const { comment } = this.props
    const userId = auth.getUserId()
    console.log(comment)
    this.setState({
      isLiked: comment.likedBy.includes(userId),
      isDisliked: comment.dislikedBy.includes(userId),
      likeCount: comment.likedBy.length,
      dislikeCount: comment.dislikedBy.length
    })
  }

  //this sets the local state (which governs how the like button appears) separately to the axios request results
  //this means that the site won't lag visually as the visual changes aren't dependent on the axios request results.
  handleLike() {
    if (auth.isLoggedIn()) {
      const { restaurantId, comment } = this.props
      const { likeCount, dislikeCount } = this.state
      const url = `/api/restaurant/${restaurantId}/comment/${comment._id}/`
      const authConfig = {
        headers: {
          'Authorization': `Bearer ${auth.getToken()}`
        }
      }
      if (this.state.isLiked === true) {
        console.log('unliked')
        Axios.put(url + 'unlike', {}, authConfig)
          .then(res => console.log('ok ', res))
          .catch(err => console.log('err ', err))
        this.setState({
          isLiked: false,
          likeCount: likeCount - 1
        })
      } else if (this.state.isDisliked === true) {
        console.log('liked and undisliked')
        Axios.put(url + 'swaplike', {}, authConfig)
          .then(res => console.log('ok ', res))
          .catch(err => console.log('err ', err))
        this.setState({
          isLiked: true,
          isDisliked: false,
          likeCount: likeCount + 1,
          dislikeCount: dislikeCount - 1
        })
      } else {
        console.log('onlyliked')
        Axios.put(url + 'like', {}, authConfig)
          .then(res => console.log('ok ', res))
          .catch(err => console.log('err ', err))
        this.setState({
          isLiked: true,
          likeCount: likeCount + 1
        })
      }
    }
  }

  handleDislike() {
    if (auth.isLoggedIn()) {
      const { restaurantId, comment } = this.props
      const { likeCount, dislikeCount } = this.state
      const url = `/api/restaurant/${restaurantId}/comment/${comment._id}/`
      const authConfig = {
        headers: {
          'Authorization': `Bearer ${auth.getToken()}`
        }
      }
      if (this.state.isDisliked === true) {
        console.log('undisliked')
        Axios.put(url + 'undislike', {}, authConfig)
          .then(res => console.log('ok ', res))
          .catch(err => console.log('err ', err))
        this.setState({
          isDisliked: false,
          dislikeCount: dislikeCount - 1
        })
      } else if (this.state.isLiked === true) {
        console.log('disliked and unliked')
        Axios.put(url + 'swaplike', {}, authConfig)
          .then(res => console.log('ok ', res))
          .catch(err => console.log('err ', err))
        this.setState({
          isDisliked: true,
          isLiked: false,
          dislikeCount: dislikeCount + 1,
          likeCount: likeCount - 1
        })
      } else {
        console.log('onlyliked')
        Axios.put(url + 'dislike', {}, authConfig)
          .then(res => console.log('ok ', res))
          .catch(err => console.log('err ', err))
        this.setState({
          isDisliked: true,
          dislikeCount: dislikeCount + 1
        })
      }
    }
  }


  render() {
    const user = auth.getName()
    const isloggedIn = auth.isLoggedIn()
    const { isLiked, isDisliked, likeCount, dislikeCount } = this.state
    const { comment } = this.props

    return <div className="comment">
      <h2>{comment.user.username}</h2>
      <p><strong>{comment.text}</strong></p>
      <p className="time">{moment(comment.createdAt).format('DD/MM/YYYY')}</p>
      <i className="far fa-thumbs-up"></i>
      <i className="far fa-thumbs-down"></i>
      <div>
        <span id='comment-rating-counter'>{likeCount}</span>
        <FontAwesomeIcon id='comment-rating' className={isLiked ? 'liked' : ''} icon={faThumbsUp} onClick={() => this.handleLike()} />
        <span id='comment-rating-counter'>{dislikeCount}</span>
        <FontAwesomeIcon id='comment-rating' className={isDisliked ? 'disliked' : ''} icon={faThumbsDown} onClick={() => this.handleDislike()} />
      </div>
      {isloggedIn && user === comment.user.username && <button className="button is-danger is-round" onClick={this.props.onClick}>Delete</button>}
      <hr />
    </div>
  }
}

export default CommentCard