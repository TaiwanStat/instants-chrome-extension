import React, { PropTypes, Component } from 'react'
import Linkify from 'react-linkify'

// styles
import style from './style.css'
import Modal from 'react-modal'

import ReactEmojiMixin from 'react-emoji';

const ReactEmoji = ReactEmojiMixin


export default class PostContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }

    this.closeModal = this.closeModal.bind(this)
    this.handlePhotoClick = this.handlePhotoClick.bind(this)
  }

  handlePhotoClick(e) {
    this.setState({modalIsOpen: true})
  }

  closeModal(e) {
    this.setState({modalIsOpen: false})
  }


  render() {
    const {
      post
    } = this.props

    let photo = ''
    let modalContent = ''
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      },
      overlay: {
        backgroundColor   : 'rgba(0, 0, 0, 0.4)'
      }
    };

    if (post.photo) {
      photo = (
        <img onClick={ this.handlePhotoClick } className={ style.photo } src={ post.photo } />
      )

      modalContent = (
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={ this.closeModal }
          style={ customStyles } >
          <img className={ style.full_photo } src={ post.photo } />
        </Modal>
      )
    }

    return (
      <div className={ style.content }>
        <p>
          <Linkify properties={{target: '_blank'}}>{ ReactEmoji.emojify(post.content) }</Linkify>
        </p>
        { photo }
        { modalContent }
      </div>
    )
  }
}
