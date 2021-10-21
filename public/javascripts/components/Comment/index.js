import React, { PropTypes, Component } from 'react'
import Linkify from 'react-linkify'
import Modal from 'react-modal'
import style from './style.css'
import { timeSince } from '../../utils/time_since'

import ReactEmojiMixin from 'react-emoji';
const ReactEmoji = ReactEmojiMixin;

export default class Comment extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      modalIsOpen: false,
      deleteComment: false
    }
    this.deleteComment = this.deleteComment.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  deleteComment(e) {
    this.setState({modalIsOpen: true})
    e.preventDefault()
  }

  confirmDelete(e) {
    const {
      deleteActions,
      content,
      minusCommentCount
    } = this.props

    e.preventDefault()
    deleteActions(content.commentId)
    minusCommentCount()
    this.closeModal()

    this.setState({
      deleteComment: true
    })
  }

  closeModal(e) {
    this.setState({modalIsOpen: false})
  }

  render() {
    const {
      content,
      deleteActions
    } = this.props

    const {
      deleteComment
    } = this.state

    const customStyles = {
      content : {
       top : '50%',
       left : '50%',
       right : 'auto',
       bottom : 'auto',
       marginRight : '-50%',
       transform : 'translate(-50%, -50%)',
       color: '#fff',
       background: 'rgba(0, 0, 0, 0.5)',
       border: 'none'
      }
    }

    var modalContent, cmtContent, deleteContent

    modalContent = (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles} >
        <div className={style.popup}>
          你確定要刪除此回覆？
          <a href="" onClick={ this.confirmDelete }>確定</a>
          <a href="" onClick={ this.closeModal }>取消</a>
        </div>
      </Modal>
    )

    if(deleteActions && content.isMe) {
      deleteContent = <a className={style.delete} href="" onClick={this.deleteComment}>X</a>
    }

    if(!deleteComment) {
      cmtContent = (<div className={style.comment}>
          {modalContent}
          <div>
            {deleteContent}
            <img src={content.avatar}/>
            <span className={style.name}>{content.name}</span>
            <span className={style.content}>
              <Linkify properties={{target: '_blank'}}> { ReactEmoji.emojify(content.content) } </Linkify>
            </span>
          </div>
        </div>)
    }

    return (
      <div>
        {cmtContent}
      </div>
    )
  }

}
