import React from 'react'
import propTypes from 'prop-types'
import { Grid, List } from 'antd-mobile'

export default class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: propTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(',')
        .map(value => ({
              icon: require(`../imgs/${value}.png`),
              text: value
            }))
    const gridHeader = this.state.icon
                      ? (
                          <div>
                            <span>已选择头像</span>
                            <img style={{width: 20}} src={this.state.icon} alt=""/>
                          </div>
                        )
                      : '请选择头像'

    return (
        <div>
          <List renderHeader={gridHeader}>
            <Grid
                data={avatarList}
                onClick={elm => {
                  this.setState(elm)
                  this.props.selectAvatar(elm.text)
                }}
                columnNum="5"/>
          </List>
        </div>
    )
  }
}