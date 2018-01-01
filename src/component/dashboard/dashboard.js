import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlinkbar/navlinkbar'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import { cookie } from "../../util"
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import MessageList from '../msglist/msglist'
import Myself from "../myself/myself"

@connect(
    state => state,
    {getMsgList, recvMsg}
)
export default class DashBoard extends React.Component {
  componentDidMount () {
    let user = cookie.getCookie('userId')
    if (!this.props.chat.chatMsg.length && user) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render () {
    const { pathname } = this.props.location
    const navList = [{
      path: '/boss',
      text: '求职者',
      icon: 'boss',
      title: '求职者列表',
      component: Boss,
      hide: this.props.user.type === 'genius'
    },
    {
      path: '/genius',
      text: '招聘者',
      icon: 'job',
      title: '招聘者列表',
      component: Genius,
      hide: this.props.user.type === 'boss'
    },
    {
      path: '/msg',
      text: '消息',
      icon: 'msg',
      title: '消息列表',
      component: MessageList
    },
    {
      path: '/me',
      text: '我',
      icon: 'user',
      title: '个人中心',
      component: Myself
    }]

    const targetRoute = navList.find(item => item.path === pathname)
    return targetRoute ? (
        <div>
          <NavBar className="fixd-header">
            {targetRoute.title}
          </NavBar>
          <div style={{marginTop: 55}}>
            <Switch>
              {navList.map(item => (
                  <Route key={item.path} path={item.path} component={item.component}/>
              ))}
            </Switch>
          </div>
          <NavLinkBar data={navList}></NavLinkBar>
        </div>
    ) : null
  }
}