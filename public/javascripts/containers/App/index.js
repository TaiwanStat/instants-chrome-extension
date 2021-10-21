// packages
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// components
import CreatePostBox from '../../components/CreatePostBox'
import Alert from '../../components/Alert'
//import SideBar from '../../components/SideBar'

// styles
import style from './style.css'

// actions
import * as AlertActions from '../../actions/alerts'
import * as GeneralActions from '../../actions'
import * as PostActions from '../../actions/posts'

// utils
import * as utils from '../../utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.generalActions.resetErrorMessage()
    e.preventDefault()
  }

  componentDidMount() {
    const {
      selectedTab,
      generalActions,
      alertActions
    } = this.props

    let that = this;
    // update position from html5 API
    let newPosition = window.position
    generalActions.fetchMyProfile()
    generalActions.updatePosition(newPosition)

    // fetch alert
    alertActions.fetchAlerts()
  }

  clearNotification() {
    const {
      postActions
    } = this.props

    var clearNotice = setTimeout(() => {
      postActions.clearNotification()
    }, 1500)

    this.clearNotice = clearNotice
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.loading) {
      // hide loading icon
      this.setState({ loading: false })
    }
  }

  componentDidUpdate(preProps, preState) {
    const {
      myProfile
    } = this.props

    if (myProfile && $('.nav-center span').length === 0) {
      $('.nav-center').append('<span>' + myProfile.name + '</span>')
      $('#nav-submenu').html('<img src="' + myProfile.avatar + '?type=square" alt="' + myProfile.name + '"/>')
    }
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) return null
  }

  render() {
    const {
      selectedTab,
      alertActions,
      postActions,
      checkNewId,
      notification,
      myProfile,
      alertList
    } = this.props

    const {
      loading
    } = this.state

    var notificationContent, loadingContent

    if(notification){
      notificationContent = (
        <div className={style.notification}>
          {notification}
        </div>
      )
      if(this.clearNotice) {
        clearTimeout(this.clearNotice)
      }
      this.clearNotification()
    }

    if(loading) {
      loadingContent = (
        <div className={style.spinner}></div>
      )
    }

    return (
      <div>
        <Alert actions={alertActions} alertList={alertList} />
        {notificationContent}
        <CreatePostBox
          selectedTab={selectedTab}
          postActions={postActions}
          placeholder="留個言吧，與10公里內的人交流分享..." />
        {this.renderErrorMessage()}
        {loadingContent}
        {this.props.children}
      </div>
    )
  }
}
        //<Alert actions={alertActions} alertList={alertList} />
        //<SideBar selectedTab={selectedTab} />

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  generalActions: PropTypes.object.isRequired,
  selectedTab: PropTypes.string.isRequired
}

function mapStateToProps(state) {

  const {
    entities: {
      alert,
      user
    },
    user: {
      position,
      id
    },
    posts: {
      selectedTab,
      checkNewId,
      notification
    },
  } = state

  // get alert list
  const alertIds = state.alerts.ids
  const alertList = alertIds.map(id => alert[id])
  const myProfile = user[id]

  return {
    errorMessage: state.errorMessage,
    selectedTab,
    checkNewId,
    notification,
    alertList,
    myProfile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    generalActions: bindActionCreators(GeneralActions, dispatch),
    alertActions: bindActionCreators(AlertActions, dispatch),
    postActions: bindActionCreators(PostActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
