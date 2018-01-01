import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logout } from "../../redux/user.redux"

@connect(
    state => state.user,
    { logout }
)
export default class Myself extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    const alert = Modal.alert
    alert('注销', '确定退出登陆吗？', [
      { text: '取消' },
      { text: '确定', onPress: () => {
        browserCookies.erase('userId')
        this.props.logout()
      }},
    ])
  }
  render () {
    const props = this.props
    const Item = List.Item
    return props.user ? (
        <div>
          <Result
              img={<img src={require(`../imgs/${props.avatar}.png`)} style={{width: 50}} alt=""/>}
              title={props.user}
              message={props.type === 'boss' ? props.company : null}
          />
          <List renderHeader='简介'>
            <List.Item multipleLine>
              {props.title}
              {props.desc.split('\n').map(val => (
                  <List.Item.Brief key={val}>{val}</List.Item.Brief>
              ))}
              {props.money ? <List.Item.Brief>薪资：{props.money}</List.Item.Brief> : null}
            </List.Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <List>
            <Item onClick={this.logout}>退出登陆</Item>
          </List>
        </div>
    ) : <Redirect to={props.redirectTo}/>
  }
}