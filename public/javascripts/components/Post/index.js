import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

// post components
import PostHeader from './header'
import PostContent from './content'
import PostFooter from './footer'
import PostComment from './comment'

// styles
import style from './style.css'


export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentCount: props.post.commentCount
    }

    this.minusCommentCount = this.minusCommentCount.bind(this)
    this.addCommentCount = this.addCommentCount.bind(this)
  }

  addCommentCount() {
    this.setState({
      commentCount: this.state.commentCount + 1
    })
  }

  minusCommentCount() {
    this.setState({
      commentCount: this.state.commentCount - 1
    })
  }

  render () {
    const {
      post
    } = this.props

    const {
      commentCount
    } = this.state

    const postClass = classNames({
      [style.post]: true
    })

    return (
      <article className={postClass} >
        <PostHeader post={post} />
        <PostContent post={post} />
        <PostFooter
          {...this.props}
          commentCount={commentCount}/>
        <PostComment
          {...this.props}
          minusCommentCount={this.minusCommentCount}
          addCommentCount={this.addCommentCount}/>
      </article>
    )
  }
}

Post.propTypes = {
}

Post.defaultProps = {
}
