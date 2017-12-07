import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from "./Auth.redux"

@connect(
    state => state.auth,
    {login}
)

export default class Auth extends React.Component {
  render () {
    return (
        <div>
          {this.props.isAuth ? <Redirect to="/dashboard"/> : null}
          <h1>你没有权限，需要登陆才能查看</h1>
          <button onClick={this.props.login}>登陆</button>
        </div>
    )
  }
}