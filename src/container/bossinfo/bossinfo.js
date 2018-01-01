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
export default class BossInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
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
          <NavBar mode="dark">招聘者信息完善</NavBar>
          <AvatarSelector selectAvatar={(imgName) => {
                  this.setState({
                    avatar: imgName
                  })
                }}></AvatarSelector>
          <InputItem onChange={value => this.handelChange('title', value)}>
            招聘职位
          </InputItem>
          <InputItem onChange={value => this.handelChange('company', value)}>
            公司名称
          </InputItem>
          <InputItem onChange={value => this.handelChange('money', value)}>
            薪资范围
          </InputItem>
          <TextareaItem
              onChange={value => this.handelChange('desc', value)}
              rows={3}
              autoHeight
              title="职位要求"
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