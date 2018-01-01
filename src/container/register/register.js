import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { register } from "../../redux/user.redux"
import wrapChangeHandle from '../../component/wrapChangeHandle/wrapChangeHandle'

@connect(
    state => state.user,
    { register }
)
@wrapChangeHandle
export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount () {
    this.props.handleChange('type', 'genius')
  }
  handleRegister () {
    this.props.register(this.props.state)
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
        <div>
          {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
          <Logo></Logo>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem
              onChange={value => this.props.handleChange('user', value)}
            >用户名：</InputItem>
            <WhiteSpace/>
            <InputItem
                type="password"
                onChange={value => this.props.handleChange('pwd', value)}
            >密码：</InputItem>
            <WhiteSpace/>
            <InputItem
                type="password"
                onChange={value => this.props.handleChange('repeatPwd', value)}
            >确认密码：</InputItem>
            <WhiteSpace/>
            <RadioItem
                checked={this.props.state.type === 'genius'}
                onChange={() => this.props.handleChange('type', 'genius')}
            >
              求职者
            </RadioItem>
            <RadioItem
                checked={this.props.state.type === 'boss'}
                onChange={() => this.props.handleChange('type', 'boss')}
            >
              招聘者
            </RadioItem>
            <WhiteSpace/>
            <Button
                onClick={this.handleRegister}
                type="primary"
            >完成注册</Button>
          </List>
        </div>
    )
  }
}