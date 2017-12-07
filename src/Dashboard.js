import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "./Auth.redux"
import App from './App'

@connect(
    state => state.auth,
    {logout}
)

export default class Dashboard extends React.Component {
  render() {
    const match = this.props.match
    const reDirectToLogin = <Redirect to="/login"/>
    const app = (
        <div>
          {this.props.isAuth ? <h1>{this.props.user}</h1> : null}
          {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
          <ul>
            <li><Link to={`${match.url}`}>组件1</Link></li>
            <li><Link to={`${match.url}/zujian2`}>组件2</Link></li>
            <li><Link to={`${match.url}/zujian3`}>组件3</Link></li>
          </ul>
          <Route path={`${match.url}/`} exact component={App}/>
          <Route path={`${match.url}/zujian2`} component={zujian2}/>
          <Route path={`${match.url}/zujian3`} component={zujian3}/>
        </div>
    )
    return this.props.isAuth ? app : reDirectToLogin
  }
}

function zujian2 () {
  return <h1>组件2</h1>
}
function zujian3 () {
  return <h1>组件3</h1>
}