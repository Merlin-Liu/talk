import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from "../../redux/user.redux"
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

@connect(
    state => state.user,
    { update }
)
export default class GeniusInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }
  handelChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  render () {
    const redirect = this.props.redirectTo
    const path = this.props.location.pathname
    return (
        <div>
          {redirect && redirect !== path ? <Redirect to={redirect}/> : null}
          <NavBar mode="dark">求职者信息完善</NavBar>
          <AvatarSelector
              selectAvatar={(imgName) => {
                this.setState({
                  avatar: imgName
                })
              }}
          ></AvatarSelector>
          <InputItem onChange={value => this.handelChange('title', value)}>
            求职岗位
          </InputItem>
          <TextareaItem
              onChange={value => this.handelChange('desc', value)}
              rows={3}
              autoHeight
              title="个人简介"
          ></TextareaItem>
          <Button
              onClick={() => {
                this.props.update(this.state)
              }}
              type="primary"
          >保存</Button>
        </div>
    )
  }
}