import React, { PropTypes, Component } from 'react'

export default class Flag extends Component {

  constructor(props, context) {
    super(props, context)

    this.handleFlag = this.handleFlag.bind(this)
  }

  handleFlag(e) {
    const {
      flagActions,
      unFlagActions,
      postId,
      isProsecuted
    } = this.props;

    e.preventDefault()

    if(!isProsecuted)
      flagActions(postId, '這是垃圾廣告')
    else
      unFlagActions(postId)
  }

  render() {

    const {
      isProsecuted
    } = this.props

    var content

    if(isProsecuted) {
      content = (
        <a href="" onClick={ this.handleFlag }>取消檢舉（已檢舉）</a>
      )
    }else {
      content = (
        <a href="" onClick={ this.handleFlag }>
          檢舉這則貼文
        </a>
      )
    }

    return (
      <span>
        {content}
      </span>
    )
  }
}
