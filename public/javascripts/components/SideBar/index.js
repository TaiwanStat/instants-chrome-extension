import React, { PropTypes, Component } from 'react'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux';
import classNames from 'classnames'
import style from './style.css'

class SideBar extends Component {

  constructor(props, context) {
    super(props, context)
  }

  updateUrl(type) {
    this.props.pushPath(type)
  }

  render() {

    const {
      post,
      actions,
      selectedTab
    } = this.props

    const menuItems = [
      { type: 'chat', icon: 'fa fa-comment', zh: '在地交流', color: 'blue'},
      { type: 'life', icon: 'fa fa-home', zh: '生活資訊', color: 'green'},
      { type: 'activity', icon: 'glyphicon glyphicon-bullhorn', zh: '活動資訊', color: 'orange' },
      { type: 'food', icon: 'fa fa-cutlery', zh: '美食資訊', color: 'red'},
      { type: 'shop', icon: 'fa fa-shopping-bag', zh: '買賣交易資訊', color: 'purple'}
    ];

    return (
      <ul id="sidebar" className={style.sidebar}>
        {menuItems.map((item) =>
          <li title={item.zh} key={ item.type } className={
            classNames({
              [style.active]: selectedTab === item.type,
              [item.color]: selectedTab === item.type
            })} 
            onClick= {this.updateUrl.bind(this, item.type)} ref={item.type} >
            <i className={item.icon}></i>
          </li>
        )}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(
  mapStateToProps,
  { pushPath:pushPath }
)(SideBar)
