import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import style from './style.css'

export default class CreatePostBox extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || '',
      tag: this.props.tag || '在地交流＆資訊分享',
      photo: ''
    }

    this.handleKeyup = this.handleKeyup.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setTagText = this.setTagText.bind(this)
    this.getTagLabel = this.getTagLabel.bind(this)
    this.getLabelColor = this.getLabelColor.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleKeyup(e) {
    this.setState({
      text: this.refs.input.value
    })

    //this.refs.input.style.cssText = 'min-height: 70px; height:auto;';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    //this.refs.input.style.cssText = 'height:' + this.refs.input.scrollHeight + 'px';
  }

  getInputText() {
    return this.refs.input.value
  }

  setTagText(value) {
    if (this.refs.tags) {
      this.refs.tags.value = value;

      this.setState({
        tag: this.getTagLabel()
      })
    }
  }

  getTagText() {
    const {
      selectedTab
    } = this.props

    return selectedTab //this.refs.tags.value || 'chat'
  }

  getTagLabel(value) {
    if (!value)
      return '在地交流＆資訊分享'

    switch(value) {
      case 'chat':
        return '在地交流＆資訊分享'

      case 'life':
        return '在地生活資訊'

      case 'food':
        return '在地美食資訊'

      case 'activity':
        return '在地活動資訊'

      case 'help':
        return '互助資訊資訊'

      case 'shop':
        return '買賣交易資訊'

      default:
        return '在地交流'
    }
  }

  getLabelColor(value) {
    switch(value) {
      case 'chat':
        return 'blue'

      case 'life':
        return 'green'

      case 'food':
        return 'red'

      case 'activity':
        return 'orange'

      case 'shop':
        return 'purple'

      default:
        return 'blue'
    }
  }

  handleImageChange(e) {
    var that = this;
    var reader = new FileReader()
    reader.onload = function(){
      var output = document.getElementById('photo-preview')
      that.setState({
        photo: reader.result
      })
    };
    reader.readAsDataURL(this.refs.photo.files[0])
  }

  handleSubmit(e) {
    const {
      postActions
    } = this.props

    const input = this.getInputText()
    const tag = this.getTagText()
    const photo = this.refs.photo.files[0]

    if(!/^\s*$/.test(input)) {
      // if it have value
      this.setState({
        text: '',
        photo: ''
      })
      postActions.createPost(input, photo, tag)
      this.refs.input.value = ''
      this.refs.photo.files[0] = ''
    }
  }

  render() {
    const {
      text,
      tag,
      photo
    } = this.state

    const {
      selectedTab
    } = this.props

    var count = 140 - text.length

    const boxClass = classNames({
      [style.box]: true,
      'new_post_box': true
    })
    const dropDownClass = classNames({
      'dropdown-menu': true,
      [style.label_select]: true
    })
    const countClass = classNames({
      [style.count]: true,
      [style.overflow]: count < 0
    })

    const labelIconClass = classNames({
      'glyphicon glyphicon-tag': true,
      [this.getLabelColor(selectedTab)]: true
    })

    let previewPhoto = ''

    if (photo) {
      previewPhoto = <img className={style.photo_preview} id="photo-preview" src={photo} />
    }

    return (
      <div className={boxClass}>
        <div>
          <textarea className={
            classNames({
              [style.post_textarea]: true,
              edit: this.props.editing,
              'new-post': this.props.newPost
            })}
            ref='input'
            name='post'
            placeholder={this.props.placeholder}
            onKeyUp={this.handleKeyup}
            autoFocus= 'true' />
            { previewPhoto }
        </div>
        <div className={
          classNames({
            [style.box_footer]: true
            })}>
          <div className={
            classNames({
              [style.box_fns]: true
            })}>

            <div>
              <i id="tagLabel"
                data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"
                className={labelIconClass}>
              </i>
              <span className={style.label}>
                { this.getTagLabel(selectedTab) }
              </span>
              <label htmlFor="photo-upload" className={style.photo_icon}>
                <i className="glyphicon glyphicon-camera"/>
              </label>
              <input id="photo-upload" ref="photo" style={{ display: 'none' }} accept="image/jpeg,image/jpg,image/png" type='file' name="file" onChange={this.handleImageChange} />
            </div>

          </div>
          <div className={classNames({
              [style.submit_btn_wrapper]: true
            })}>
            <span className={countClass}>{count}</span>
            <button className={
              classNames({
                [style.submit_btn]: true,
                'btn': true
              })}
              onClick={this.handleSubmit}
              disabled={count < 0 ? 'disabled' : ''}
              >
              發佈
            </button>
          </div>
        </div>
     </div>
    )
  }
}

