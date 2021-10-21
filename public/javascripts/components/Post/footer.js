import React, { PropTypes, Component } from 'react'
import Linkify from 'react-linkify'

// components
import Like from '../Like'
import Retweet from '../ReTweet'
import Share from '../Share'
import OtherItem from '../OtherItem'

// styles
import style from './style.css'

export default class PostFooter extends Component {
  constructor(props) {
    super(props)

    this.showComment = this.showComment.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown(e) {
    e.preventDefault();
  }

  showComment(e) {
    const {
      commentActions,
      post
    } = this.props
    e.preventDefault();

    commentActions.showComments(post.msgId)
    commentActions.fetchComments(post.msgId)
  }


  render() {
    const {
      me,
      post,
      actions,
      showRetweet,
      commentCount
    } = this.props

    let retweet

    if (showRetweet) {
      retweet = (<Retweet
            postId={post.msgId}
            post= {post}
            retweetActions={actions.retweetPost}
            unRetweetActions={actions.unRetweetPost}
            retweetCount={ post.retweetCount } />)
    }

    return (
      <footer className={style.post_footer}>
        <Like
          postId={post.msgId}
          post= {post}
          notificationActions={actions.notification}
          likeActions={actions.likePost}
          unLikeActions={actions.unLikePost}
          likeCount={ post.likeCount }>
        </Like>
        <div title="留言" onClick={this.showComment} onMouseDown={this.handleMouseDown}>
          <i className="glyphicon glyphicon-comment">
            <span>{commentCount}</span>
          </i>
        </div>
       { retweet }
        <Share
          postId={post.msgId}
        >
        </Share>
        <OtherItem
          post= {post}
          actions= {actions}
        >
        </OtherItem>
      </footer>
    )
  }
}
