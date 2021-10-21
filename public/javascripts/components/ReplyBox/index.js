import React, { PropTypes, Component } from 'react'
import Comment from '../Comment'
import style from './style.css'

export default class ReplyBox extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      text: this.props.text || '',
      newComment: []
    }

    this.handleKeyup = this.handleKeyup.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleKeyup(e) {
    this.setState({
      text: this.refs.input.value
    })
  }

  getInputText() {
    return this.refs.input.value
  }

  handleSubmit(e) {
    const input = this.getInputText()

    const {
      me,
      postId,
      addCommentCount
    } = this.props

    var {
      text,
      newComment
    } = this.state

    let count = 100 - input.length
    if(!/^\s*$/.test(input) && e.keyCode === 13 && count >= 0) {
      // if it have value
      newComment.push({content: input, createdAt: new Date(), name: me.name, avatar: me.avatar})

      this.setState({
        text: '',
        newComment: newComment
      })
      this.props.onSubmit(postId, input)
      addCommentCount()
      this.refs.input.value = ''
    }
  }

  render() {
    const {
      text,
      newComment
    } = this.state

    const count = 100 - text.length

    var newCommentContent = newComment.map((cmt, i) => {
      return (
        <Comment
          content={cmt}
          key={i}/>
        )
    })

    return (
      <div>
        {newCommentContent}
        <div>
          <input
            className={style.reply_box}
            ref= 'input'
            name= 'post'
            placeholder={this.props.placeholder}
            onKeyUp={this.handleKeyup}
            autoFocus= 'true'
            onKeyDown={this.handleSubmit}/>
            <span className={style.count}> { count } 字</span>
        </div>
      </div>
    )
  }

}
