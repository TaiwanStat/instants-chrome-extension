import React, { PropTypes, Component } from 'react'
import Infinite from 'react-infinite'

import Post from '../Post'
import style from './style.css'

var containerHeight = 500;

export default class Posts extends Component {

  constructor(props, context) {
    super(props, context)
    containerHeight = $('#root').height();

    this.state = {
      isInfiniteLoading: false
    }
  }

  handleInfiniteLoad() {
    const {
      actions,
      posts,
      selectedTab
    } = this.props

    var that = this;

    this.setState({
      isInfiniteLoading: true
    })

    actions.fetchHistoryPost(selectedTab, posts[posts.length - 1].createdAt)

    setTimeout(function() {
      that.setState({
        isInfiniteLoading: false
      });
    }, 1000);
  }

  render() {
    const {
      me,
      isFetching,
      postCount,
      posts,
      actions,
      renderPost,
      loadingLabel,
      comments,
      commentActions,
      showComments
    } = this.props

    var endContent
    const isEmpty = posts.length === 0
    const loading = (<div className={style['infinite-list-item']}>
      <div title="載入中..." className={style.spinner}></div>
    </div>)

    if (isEmpty) {
      return <h1><i>無任何在地資訊!</i></h1>
    }

    const height = posts.map((post) => {
      let replyH = 0, retweetH = 0

      // 72 for each comment
      // 30 for reply box
      if(showComments.indexOf(post.msgId) !== -1)
        replyH = post.commentCount * 50 + 30

      // 30 for retweet area
      if(post.isRetweetMsg) retweetH = 30

      return 182 + replyH + retweetH
    })

    return (
      <Infinite elementHeight={height}
        containerHeight={window.innerHeight}
        infiniteLoadBeginEdgeOffset={100}
        onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
        loadingSpinnerDelegate={loading}
        isInfiniteLoading={this.state.isInfiniteLoading}
        timeScrollStateLastsForAfterUserScrolls={1000}
        useWindowAsScrollContainer={true}
        preloadBatchSize={Infinite.containerHeightScaleFactor(3)}
        >
        {posts.map((post) => {
            if(!post.isOverProsecute) {

              let comment = []
              let cmtShowState = false
              if (comments.msgIds.hasOwnProperty(post.msgId)) {
                const ids = comments.msgIds[post.msgId]
                comment = ids.map(id => comments.data[id])
              }

              if(showComments.indexOf(post.msgId) !== -1)
                cmtShowState = true

              return(
                <Post
                  me={me}
                  post={post}
                  key={post.msgId}
                  showRetweet={true}
                  comment={comment}
                  showCmt= {cmtShowState}
                  commentActions={commentActions}
                  actions= {actions} />
              )
            }else {
              return;
            }
          }
        )}
      </Infinite>
    )
  }
}

Posts.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  postCount: PropTypes.number,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  nextPost: PropTypes.string
}

Posts.defaultProps = {
  loadingLabel: '載入中...',
  isFetching: true
}
