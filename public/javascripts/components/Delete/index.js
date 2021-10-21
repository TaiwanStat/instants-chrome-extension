import React, { PropTypes, Component } from 'react'
import { deletePost } from '../../actions'
import Modal from 'react-modal'
import style from './style.css'

export default class Delete extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      modalIsOpen: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleDelete(e) {
    this.setState({modalIsOpen: true})
    e.preventDefault()
  }

  confirmDelete(e) {
    const {
      actions,
      postId
    } = this.props

    e.preventDefault()
    actions(postId)
    this.closeModal()
  }

  closeModal(e) {
    this.setState({modalIsOpen: false})
    e.preventDefault()
  }

  render() {
    var modalContent
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
    };

    modalContent = (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles} >
        <div className={style.popup}>
          你確定要刪除此貼文？
          <a href="" onClick={ this.confirmDelete }>確定</a>
          <a href="" onClick={ this.closeModal }>取消</a>
        </div>
      </Modal>
    )

    return (
      <span>
        {modalContent}
        <a href="" onClick={ this.handleDelete }>
          刪除這則貼文
        </a>
      </span>
    )
  }
}
