import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import style from './style.css'
import { API_ROOT } from '../../constants'

export default class AlertItem extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {

    const {
      alert
    } = this.props


    const alertClass = classNames({
      [style.alert]: true,
      [style.unread]: !alert.isRead
    })

    var alertContent
    var statusUrl = API_ROOT + 'status/' + alert.msgId + '/'

    if(alert.behavior === 'like') {
      alertContent = '喜歡你的貼文'
    }else if(alert.behavior === 'retweet') {
      alertContent = '轉貼了你的貼文'
    }else if(alert.behavior === 'comment') {
      alertContent = '在你的貼文留言'
    }

    return (
      <a href={statusUrl} target="_blank">
        <div className={alertClass}>
          <img src={alert.fromAvatar}/>
          {alert.fromName} {alertContent}
        </div>
      </a>
      )
  }
}
