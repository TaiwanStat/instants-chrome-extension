import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'

import DevTools from './DevTools'
import App from './App'
import PostPage from './PostPage'

export default class Root extends Component {

  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <App>
          <PostPage/>
          <DevTools/>
        </App>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
