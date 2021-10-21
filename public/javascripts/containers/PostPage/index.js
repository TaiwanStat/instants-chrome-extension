// packages
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
// styles
import style from './style.css'

// components
import Posts from '../../components/Posts'
import NewPostBar from '../../components/NewPostBar'

// actions
import * as CommentActions from '../../actions/comments'
import * as PostActions from '../../actions/posts'


class PostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastUpdateTime: new Date().getTime() - 1000
    }
  }

  componentDidMount() {
    const {
      init,
      postList,
      isFetching,
      position,
      //route,
      selectedTab,
      postActions
    } = this.props

    var that = this
    that.lastUpdateTime = (new Date()).getTime()

    window.setInterval(() => {
      postActions.checkPosts(that.path, that.lastUpdateTime)
      that.lastUpdateTime = (new Date()).getTime()
    }, 30000)
  }

  componentDidUpdate() {
    const {
      init,
      postList,
      isFetching,
      position,
      //route,
      selectedTab,
      postActions
    } = this.props

    const isEmpty = postList.length === 0

    this.path = selectedTab

    if (isFetching || init) {
      let now = new Date()
      if ((now.getTime() - this.state.lastUpdateTime) / 1000 > 0.5) {
        postActions.fetchPosts(selectedTab)
        this.setState({lastUpdateTime: new Date().getTime()})
      }
    }
  }

  render() {

    const {
      myProfile,
      postList,
      isFetching,
      isEnd,
      fetchError,
      postActions,
      selectedTab,
      checkNewId,
      commentActions,
      comments,
      showComments
    } = this.props

    var errContent

    const pageClass = classNames({
      [style.post_page]: true
    })
    const loadingClass = classNames({
      [style.loading_status]: true
    })

    if(fetchError) {
      errContent = (
        <div className={style.post_empty_msg}>
          {fetchError}
        </div>
      )
    }

    return (
      <div className={pageClass}>
        <div className={loadingClass}>
          {isFetching && postList.length === 0 &&
            <h5>載入中...</h5>
          }
          <h5 ref="status"></h5>
        </div>
        {errContent}

        <NewPostBar newId={checkNewId} actions={postActions}></NewPostBar>

        {postList.length !== 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts
              me= {myProfile}
              comments= {comments}
              showComments= {showComments}
              commentActions= {commentActions}
              isEnd={isEnd}
              posts={postList}
              actions= {postActions}
              selectedTab= {selectedTab} />
          </div>
        }
      </div>
    )
  }
}

PostPage.propTypes = {
  postList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  postActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    user: {
      position,
      id
    },
    entities: {
      post,
      comment,
      user,
      alert
    },
    posts: {
      init,
      isFetching,
      isEnd,
      fetchError,
      selectedTab,
      checkNewId
    },
    alerts,
    components,
    comments: {
      showComments
    }
  } = state

  const postIds = state.posts.ids
  const commentMsgIds = state.comments.msgIds

  const postList = postIds.map(id => post[id])
  const comments = {
    data: comment,
    msgIds: commentMsgIds
  }

  const myProfile = user[id]

  return {
    init,
    selectedTab,
    isFetching,
    isEnd,
    fetchError,
    position,
    postList,
    comments,
    showComments,
    myProfile,
    checkNewId
  }
}


function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(PostActions, dispatch),
    commentActions: bindActionCreators(CommentActions, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)
