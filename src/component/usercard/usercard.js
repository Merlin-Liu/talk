import React from 'react'
import propTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
export default class UserCard extends React.Component {
  static propTypes = {
    userList: propTypes.array.isRequired
  }
  handleClick (item) {
    this.props.history.push(`/chat/${item._id}`)
  }
  render () {
    return (
        <WingBlank>
          {this.props.userList.map(item => (
              item.avatar ? (
                  <div key={item.desc}>
                    <Card onClick={() => this.handleClick(item)}
                          key={item._id}>
                      <Card.Header
                          title={item.user}
                          thumb={require(`../imgs/${item.avatar}.png`)}
                          extra={item.title}
                      ></Card.Header>
                      <Card.Body>
                        {item.type === 'boss' ? <div style={{marginBottom: 5}}>公司：{item.company}</div> : null}
                        {item.desc.split('\n').map((value, index) => (
                          <div style={{marginBottom: 5}} className={index !== 0 ? 'indent' : ''} key={value}>{index === 0 ? '描述：' : ''}{value}</div>
                        ))}
                        {item.type === 'boss' ? <div>薪资：{item.money}</div> : null}
                      </Card.Body>
                    </Card>
                    <WhiteSpace key={item.user}/>
                  </div>
              ) : null
          ))}
        </WingBlank>
    )
  }
}