import axios from 'axios'

const USER_LIST = 'USER_LIST'

// reducer
const initState = {
  userList: []
}
export function chatUser (state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return {...state, userList: action.data}
    default:
      return state
  }
}

// action creator
function userList (data) {
  return {
    type: USER_LIST,
    data
  }
}
export function getUserList (type) {
  return dispatch => {
    axios.get('/myself/list?type=' + type)
        .then(res => {
          if (res.data.code === 0) {
            dispatch(userList(res.data.data))
          }
        })
  }
}