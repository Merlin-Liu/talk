import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from "./index.reudx"

// 普通写法
// function mapStateToProps (state) {
//   return {num: state}
// }
// const actionCreators = { addGun, removeGun, addGunAsync}
// App = connect(mapStateToProps, actionCreators)(App)

// 装饰器写法
@connect(
    // 需要将state里的什么属性放到props里
    state => ({num: state.counter}),
    // 需要什么方法放到props里，自动dispatch
    { addGun, removeGun, addGunAsync }
)

export default class App extends React.Component {
  render () {
    return (
        <div>
          <h1>现在有东西{this.props.num}个</h1>
          <button onClick={this.props.addGun}>增加</button>
          <button onClick={this.props.removeGun}>减少</button>
          <button onClick={this.props.addGunAsync}>延时增加</button>
        </div>
    )
  }
}