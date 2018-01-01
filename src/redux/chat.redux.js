import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9000')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

let isListening = false

const initState = {
  chatMsg: [],
  users: {},
  unRead: 0
}

export function chat(state = initState, action){
  switch(action.type){
    case MSG_LIST:
      console.log(action)
      return {...state, users: action.data.users, chatMsg:action.data.msg, unRead:action.data.msg.filter(v=>!v.read && v.to === action.data.userId).length}
    case MSG_RECV:
      const n = action.data.userId === action.data.msg.to ? 1 : 0
      return {...state, chatMsg:[...state.chatMsg, action.data.msg], unRead:state.unRead + n }
    case MSG_READ:
      const {from, num} = action.data
      return {...state, chatMsg: state.chatMsg.map(item => ({...item, read: from === item.from ? true : item.read})), unRead: state.unRead - num}
    default:
      return state
  }
}
function msgList(msg, users, userId){
  return {
    type:MSG_LIST,
    data: {
      msg,
      users,
      userId
    }
  }
}
function msgRecv(msg, userId){
  return {
    type: MSG_RECV,
    data: {
      msg,
      userId
    }
  }
}
function msgRead({from, to, num}) {
  return {
    type: MSG_READ,
    data: {
      from,
      to,
      num
    }
  }
}

export function recvMsg(){
  return (dispatch, getState) => {
    if (!isListening) {
      isListening = !isListening
      socket.on('recvMsg',function(data){
        const userId = getState().user._id
        dispatch(msgRecv(data, userId))
      })
    }
  }
}
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/myself/readmsg',{from})
        .then(res => {
          const userId = getState().user._id
          if (res.data.code === 0) {
            const num = res.data.num
            dispatch(msgRead({userId, from, num}))
          }
        })
  }
}
export function sendMsg({from ,to ,msg}){
  return dispatch => {
    socket.emit('sendMsg',{from ,to ,msg})
  }

}
export function getMsgList(){
  return (dispatch, getState) => {
    axios.get('/myself/msglist')
        .then(res=>{
          if (res.data.code === 0) {
            const userId = getState().user._id
            dispatch(msgList(res.data.data, res.data.users, userId))
          }
        })
  }
}



