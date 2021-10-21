import React, { PropTypes, Component } from 'react'
// functions
import { timeSince } from '../../utils/time_since'
import { formatDistance } from '../../utils/from_distance'

// styles
import style from './style.css'

export default class PostHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      post
    } = this.props

    const postTime = timeSince(post.createdAt)
    const isRetweet = post.isRetweetMsg
    const retweeter = post.retweeterInfo

    var retweetContent

    let distance = formatDistance(post.distance)
    if (post.distance < 0)
      distance = ''

    if(isRetweet) {
      retweetContent = (
        <div className={ style.retweet_header } >
          <img src={ retweeter.retweetAvatar + '?type=square' } />
          <span> { retweeter.retweetName } 轉推了這則貼文</span>
        </div>
      )
    }

    return (
      <div>
        {retweetContent}
        <header>
          <img className={style.avatar} src={ post.avatar + '?type=square' } />
          <span className={style.header_center}>
            <div className={style.username}> { post.name } </div>
            <div className={style.post_distance}>{ distance }</div>
          </span>
          <span className={style.post_time}>{ postTime }</span>
        </header>
      </div>
    )
  }
}
