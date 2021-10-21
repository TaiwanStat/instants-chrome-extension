import React, { PropTypes, Component } from 'react'
import { reTweetPost } from '../../actions'
import classNames from 'classnames'
import Infinite from 'react-infinite'
import AlertItem from '../AlertItem'
import style from './style.css'

export default class Alert extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      isInfiniteLoading: false,
      showAlert: false,
      lastUnReadId: ''
    }
  }

  handleInfiniteLoad() {
    const {
      alertList,
      actions
    } = this.props

    var that = this;

    this.setState({
      isInfiniteLoading: true
    })

    if(alertList.length > 0)
      actions.fetchHistoryAlerts(alertList[alertList.length - 1].createdAt)


    setTimeout(function() {
      that.setState({
        isInfiniteLoading: false
      });
    }, 2500);
  }

  clickAlertCenter(e) {
    const {
      actions,
      alertList
    } = this.props

    this.setState({
      showAlert: false
    });
  
    actions.readAlerts(alertList[0].notificationId)
  }

  componentDidMount() {
    const {
      actions
    } = this.props

    var that = this;
    that.lastUpdateTime = (new Date()).getTime()

    window.setInterval(() => {
      actions.checkAlerts(that.lastUpdateTime)
      that.lastUpdateTime = (new Date()).getTime()
    }, 30000)
  }

  componentDidUpdate() {
    const {
      alertList
    } = this.props

    if(alertList[0] && !alertList[0].isRead &&
       this.state.lastUnReadId !== alertList[0].notificationId) {
      this.setState({
        showAlert: true,
        lastUnReadId: alertList[0].notificationId
      })
    }
  }

  render() {
    const {
      alertList
    } = this.props

    let showAlert = this.state.showAlert

    const alertWrapperClass = classNames({
      [style.alert_wrapper]: true,
      'alert_wrapper': true
    })
    const alertIconClass = classNames({
      'glyphicon glyphicon-bell': true,
      [style.alert_icon]: true,
      [style.has_alert]: showAlert
    })
    const alertClass = classNames({
      'dropdown-menu': true,
      [style.alert_menu]: true,
      [style.show_alert]: showAlert
    })

    const alertCountClass = classNames({
      [style.alert_count]:  showAlert
    })

    const loading = (<div>
      <div title="載入中..."></div>
    </div>)

    let alertDisplay = ''
    if (showAlert) {
      alertDisplay = (<span className={style.alert_display}>
      </span>)
    }

    let alertContent = '目前無任何新通知'
    if (alertList && alertList.length > 0) {
      alertContent = (<Infinite elementHeight={50}
            containerHeight={300}
            infiniteLoadBeginEdgeOffset={100}
            onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
            loadingSpinnerDelegate={loading}
            isInfiniteLoading={this.state.isInfiniteLoading}
            timeScrollStateLastsForAfterUserScrolls={1000}
            preloadBatchSize={Infinite.containerHeightScaleFactor(2)}
            >
            {alertList.map((alert) => {
                return(
                  <AlertItem
                    alert={alert}
                    key={alert.notificationId}
                    alertId={alert.notificationId}/>
                )
              }
            )}
      </Infinite>)
    }

    return (
      <div className={alertWrapperClass}>
        <i title="通知中心" className={alertIconClass} id="alertLabel"
          onClick={this.clickAlertCenter.bind(this)}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          { alertDisplay }
        </i>

        <div id="alertDropdown" className={alertClass} aria-labelledby="alertLabel">
          { alertContent }
       </div>

      </div>
    )
  }
}
