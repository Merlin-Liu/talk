import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from "../../redux/chatuser.redux"
import CardUser from '../usercard/usercard'

@connect(
    state => state.chatUser,
    { getUserList  }
)
export default class Boss extends React.Component {
  componentDidMount () {
    this.props.getUserList('boss')
  }
  render () {
    return <CardUser userList={this.props.userList}/>
  }
}