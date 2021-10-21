import React, { PropTypes, Component } from 'react'

// component
import ReplyBox from '../ReplyBox'
import Comment from '../Comment'

// styles
import style from './style.css'

export default class PostContent extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const {
      me,
      post,
      showCmt,
      commentActions,
      comment,
      minusCommentCount,
      addCommentCount
    } = this.props

    var showCommentContent

    if(showCmt) {
      // show comment
      showCommentContent = (
        <div>
          {comment.map((cmt) => {
            return (
              <Comment
                content={cmt}
                minusCommentCount={minusCommentCount}
                deleteActions={commentActions.deleteComment}
                key={cmt.commentId}/>
              )
          })}
          <ReplyBox
            me={me}
            postId={post.msgId}
            addCommentCount= {addCommentCount}
            placeholder="回覆此貼文······"
            onSubmit={commentActions.createComment}/>
        </div>
      )
    }

    return (
      <div>
        {showCommentContent}
      </div>
    )
  }
}
