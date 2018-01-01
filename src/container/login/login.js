import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from "../../redux/user.redux"
import wrapChangeHandle from '../../component/wrapChangeHandle/wrapChangeHandle'

import { CompWrapper, InputComp } from "../../component/HOCdemo"

@connect(
    state => state.user,
    { login }
)
@wrapChangeHandle
export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register () {
    this.props.history.push('/register')
  }
  handleLogin () {
    this.props.login(this.props.state)
  }
  render () {
    return (
        <div>
          {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}/> : null}
          <Logo/>
          <WingBlank>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <List>
              <InputItem
                  onChange={value => this.props.handleChange('user', value)}
              >用户：</InputItem>
              <WhiteSpace/>
              <InputItem
                  type="password"
                  onChange={value => this.props.handleChange('pwd', value)}
              >密码：</InputItem>
            </List>
            <WhiteSpace/>
            <Button onClick={this.handleLogin} type="primary">登陆</Button>
            <WhiteSpace/>
            <Button onClick={this.register} type="primary">注册</Button>
          </WingBlank>
        </div>
    )
  }
}