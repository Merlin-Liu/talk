import axios from 'axios'
import { getRedirectPath } from "../util"

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const RELOAD_DATA = 'RELOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT = 'LOGOUT'

// reducer
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}
export function user (state=initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, redirectTo: getRedirectPath(action.data), msg: '', ...action.data}
    case RELOAD_DATA:
      return {...state, ...action.data}
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

// action creators
function authSuccess (obj) {
  const { pwd, ...data} = obj
  return {
    type: AUTH_SUCCESS,
    data
  }
}
function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    msg
  }
}
// 用户退出操作
export function logout () {
  return {
    type: LOGOUT
  }
}

// 用户注册操作
export function register ({user, pwd, repeatPwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名或密码为空！')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('两次输出密码不相符！')
  }
  return dispatch => {
    axios.post('/myself/register', {user, pwd, type})
        .then((res) => {
          if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess({user, pwd, type}))
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        })
  }
}
// 用户登陆操作
export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名或密码为空！')
  }
  return dispatch => {
    axios.post('/myself/login', {user, pwd})
        .then((res) => {
          if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data))
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        })
  }
}
// 重新获取数据操作
export function reloadData (userInfo) {
  return {
    type: RELOAD_DATA,
    data: userInfo
  }
}
// 完善信息操作
export function update (data) {
  return dispatch => {
    axios.post('/myself/update', data)
        .then((res) => {
          if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data))
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        })
  }
}