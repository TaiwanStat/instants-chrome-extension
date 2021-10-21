import React, { PropTypes, Component } from 'react'
import { reTweetPost } from '../../actions'
import classNames from 'classnames'
import style from './style.css'

export default class Retweet extends Component {

  constructor(props, context) {
    super(props, context)
    this.handleRetweet = this.handleRetweet.bind(this)
  }

  handleRetweet(e) {
    const {
      retweetActions,
      unRetweetActions,
      postId,
      post
    } = this.props

    e.preventDefault()
    const fbId = post.fbId
    let exist = post.self.isRetweeted

    if(!exist)
      retweetActions(postId, fbId)
    else
      unRetweetActions(postId, fbId)
  }

  render() {
    const {
      retweetCount,
      post
    } = this.props

    const exist = post.self.isRetweeted
    const reTweetClass = classNames({
      [style.retweet]: true,
      'glyphicon': true,
      'glyphicon-retweet': true,
      [style.retweeted]: exist
    });

    return (
      <div title="轉推貼文">
        <i className={reTweetClass} onClick={ this.handleRetweet }>
        <span>
          { retweetCount || 0}
        </span>
        </i>
      </div>
    )
  }
}
