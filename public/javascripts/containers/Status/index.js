import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import style from './style.css'

import * as GeneralAction from '../../actions'
import * as PostActions from '../../actions/posts'
import * as utils from '../../utils'
import * as CommentActions from '../../actions/comments'
import Post from '../../components/Post'

class Status extends Component {
  constructor(props) {
    super(props)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.generalAction.resetErrorMessage()
    e.preventDefault()
  }

  componentDidMount() {
    let vm = this;
    const {
      commentActions,
      status
    } = this.props

    vm.props.generalAction.fetchMyProfile()
    commentActions.showComments(status.msgId)
    commentActions.fetchComments(status.msgId)
  }

  componentDidUpdate() {
    const {
      myProfile,
      comments
    } = this.props

    if (myProfile && $('.nav-center span').length === 0) {
      $('.nav-right').html('<a aria-expanded="false" aria-haspopup="true" class="dropdown-toggle" data-toggle="dropdown" href="#" id="nav-submenu" role="button"></a><div class="dropdown-menu"><a href="/users/signout">登出</a></div>')
      $('.nav-center').append('<span>' + myProfile.name + '</span>')

      $('#nav-submenu').html('<img src="' + myProfile.avatar + '?type=square" alt="' +
                              myProfile.name + '"/>')
    }
    else if (comments.data && !myProfile) {
      $('.nav-right').html('<a href="/users/signin/">登入</a>')
    }
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }
    var e = $('.error').html('<a href="">抱歉，目前無法與 Instants 建立連線' +
                             '<i class="refresh glyphicon glyphicon-refresh"></i></a>');

  }

  render() {
    const {
      postActions,
      commentActions,
      status,
      myProfile,
      comments,
      showComments
    } = this.props

    let content,
        comment = [],
        cmtShowState = false

    if (comments.msgIds.hasOwnProperty(status.msgId)) {
      const ids = comments.msgIds[status.msgId]
      comment = ids.map(id => comments.data[id])
    }

    if(showComments.indexOf(status.msgId) !== -1)
      cmtShowState = true


    if(!status.isOverProsecute) {
      content = (
        <Post
          me={myProfile}
          post={status}
          key={status.msgId}
          comment={comment}
          showCmt= {cmtShowState}
          commentActions={commentActions}
          showRetweet={true}
          actions= {postActions} />
      )
    }

    return (
      <div>
        {this.renderErrorMessage()}
        { content }
      </div>
    )
  }
}

Status.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  const {
    entities: {
      user,
      post,
      comment
    },
    user: {
      id
    },
    posts: {
      ids
    },
    comments: {
      showComments
    }
  } = state

  const myProfile = user[id]
  const status = post[ids[0]]
  const commentMsgIds = state.comments.msgIds
  const comments = {
    data: comment,
    msgIds: commentMsgIds
  }

  return {
    status,
    myProfile,
    comments,
    showComments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(PostActions, dispatch),
    commentActions: bindActionCreators(CommentActions, dispatch),
    generalAction: bindActionCreators(GeneralAction, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Status)
