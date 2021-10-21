import React, { PropTypes, Component } from 'react'
import { SharePost } from '../../actions'
import classNames from 'classnames'
import style from './style.css'

export default class Share extends Component {

  constructor(props, context) {
    super(props, context)
    this.updatePosts = this.updatePosts.bind(this)
  }

  updatePosts() {
    const {
      actions
    } = this.props

    actions.mergeNewPosts()
  }

  render() {
    const {
      newId
    } = this.props

    const barClass = classNames({
      [style.post_bar]: true,
      'new_post_bar': true,
      [style.show]: newId.length > 0
    })
    return (
      <div className={barClass} onClick={this.updatePosts}> {newId.length} 則新貼文 </div>
    )
  }
}
