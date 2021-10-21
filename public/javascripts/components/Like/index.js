import React, { PropTypes, Component } from 'react'
import { likePost } from '../../actions'
import findIndex from 'lodash/array/findIndex'
import classNames from 'classnames'
import style from './style.css'

export default class Like extends Component {

  constructor(props, context) {
    super(props, context)

    this.handleLike = this.handleLike.bind(this)
  }

  handleLike(e) {
    const {
      notificationActions,
      likeActions,
      unLikeActions,
      postId,
      post
    } = this.props;

    e.preventDefault()
    const fbId = post.fbId
    let exist = post.self.isLiked

    if(!exist) {
      likeActions(postId, fbId)
    } else {
      unLikeActions(postId, fbId)
    }
  }

  render() {
    const {
      likeCount,
      post
    } = this.props

    const fbId = post.fbId
    let count = `${likeCount}`
    let exist = post.self.isLiked

    const heartClass = classNames({
      [style.heart]: true,
      'glyphicon': true,
      'glyphicon-heart': true
    });

    const likeClass = classNames({
      [style.like]: true,
      [style.liked]: exist
    })

    return (
      <div className={likeClass} title="喜歡">
        <i className={heartClass} onClick={ this.handleLike }>
          <span className={style.like_count}>
            {count}
          </span>
        </i>
      </div>
    )
  }
}
