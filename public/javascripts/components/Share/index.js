import React, { PropTypes, Component } from 'react'
import { SharePost } from '../../actions'
import classNames from 'classnames'
import style from './style.css'
import Modal from 'react-modal'

export default class Share extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      modalIsOpen: false
    }
    this.closeModal = this.closeModal.bind(this)
    this.handleShare = this.handleShare.bind(this)
  }

  handleShare(e) {
    let that = this;
    this.setState({modalIsOpen: true})
    setTimeout(() =>  
      that.refs.shareLink.select()
    , 100)
    e.preventDefault()
  }


  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    const {
      postId
    } = this.props

    const shareClass = classNames({
      'glyphicon': true,
      'glyphicon-share-alt': true,
      [style.share]: true
    });

    const customStyles = {
      content : {
        width: 400,
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

    var modalContent
    const url = 'https://www.instants.io/status/'+postId

    modalContent = (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles} >
        <div>
          複製連結分享給朋友
        </div>

        <input className={style.url} value={url} readOnly="true" ref='shareLink' />
        <button className={ 'btn ' + style.button} onClick={ this.closeModal }>關閉</button>
      </Modal>
    )


    return (
      <div title="分享連結">
        <i className={shareClass} onClick={ this.handleShare }>
        </i>
        {modalContent}
      </div>
    )
  }
}
