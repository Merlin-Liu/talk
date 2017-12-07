// 合并所有的reducer 并且返回
import {combineReducers} from 'redux'
import {counter} from "./index.reudx"
import {auth} from "./Auth.redux"

export default combineReducers({counter, auth})