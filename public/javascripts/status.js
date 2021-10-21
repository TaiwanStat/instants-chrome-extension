import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import Status from './containers/Status'
import configureStore from './store/configureStore'
import { setMoment } from './life/utils'
setMoment()

const store = configureStore()

render(
  <Status store={store} />,
  document.getElementById('root')
)
