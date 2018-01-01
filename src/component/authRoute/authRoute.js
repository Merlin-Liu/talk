import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { reloadData } from "../../redux/user.redux"


@withRouter
@connect(
    null,
    { reloadData }
)
export default class AuthRoute extends React.Component {
  componentDidMount () {
    const publicList = ['/login', '/register']
    const pathName = this.props.location.pathname
    if (publicList.indexOf(pathName) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/myself/info')
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              // 有登陆信息
              this.props.reloadData(res.data.data)
            } else {
              this.props.history.push('/login')
            }
          }
        })
  }
  render () {
    return null
  }
}