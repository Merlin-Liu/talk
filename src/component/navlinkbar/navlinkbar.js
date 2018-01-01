import React from 'react'
import propTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
  state => state.chat
)
export default class NavLinkBar extends React.Component {
  static propTypes = {
     data: propTypes.array.isRequired
  }
  render () {
    const navList = this.props.data.filter(value => !value.hide)
    const { pathname } = this.props.location

    return (
          <TabBar>
            {navList.map(val => (
                <TabBar.Item
                    badge={val.path === '/msg' ? this.props.unRead : ''}
                    key={val.path}
                    title={val.text}
                    icon={{uri: require(`./imgs/${val.icon}.png`)}}
                    selectedIcon={{uri: require(`./imgs/${val.icon}-active.png`)}}
                    selected={pathname === val.path}
                    onPress={()=> {
                      this.props.history.push(val.path)
                    }}
                ></TabBar.Item>
            ))}
          </TabBar>
    )
  }
}