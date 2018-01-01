import React from 'react'
import ReactDom from 'react-dom'
// applyMiddleware中间件，处理异步的action
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import GeniusInfo from './container/geniusinfo/genuisinfo'
import BossInfo from './container/bossinfo/bossinfo'
import AuthRouter from './component/authRoute/authRoute'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRouter/>
        <Switch>
          <Route path="/geniusinfo" component={GeniusInfo}/>
          <Route path="/bossinfo" component={BossInfo}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/chat/:user" component={Chat}/>
          <Route component={DashBoard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)