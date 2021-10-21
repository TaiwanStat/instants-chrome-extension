import React, { PropTypes, Component } from 'react'
import Flag from '../Flag'
import Delete from '../Delete'
import classNames from 'classnames'
import style from './style.css'

export default class OtherItem extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {

    const {
      post,
      actions
    } = this.props

    let isProsecuted = post.self.isProsecuted
    let isMe = post.self.isMe

    var deleteBtn

    const otherItemIconClass = classNames({
      'glyphicon': true,
      'glyphicon-option-horizontal': true
    });

    const otherItemClass = classNames({
      [style.other_items]: true,
      'dropdown-menu': true
    });

    if(isMe){
      deleteBtn = (
        <Delete
          postId={post.msgId}
          isMine= {isMe}
          actions={actions.deletePost}>
        </Delete>
      )
    }

    return (
      <div title="更多" className={style.other_item}>
        <i id="dLabel"
          data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"
          className={otherItemIconClass} onClick={this.handleClick}>
        </i>
        <div className={otherItemClass} aria-labelledby="dLabel">
          <div className="dropdown-caret">
            <div className="caret-outer"></div>
            <div className="caret-inner"></div>
          </div>
          {deleteBtn}
          <Flag
            postId={post.msgId}
            isProsecuted={isProsecuted}
            flagActions={actions.flagPost}
            unFlagActions={actions.unFlagPost}
            >
          </Flag>
        </div>
      </div>
    )
  }
}
