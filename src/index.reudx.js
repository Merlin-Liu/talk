const ADD_GUN = 'addGun'
const REMOVE_GUN = 'removeGun'

// reducer
export function counter (state = 10, action) {
  switch (action.type) {
    case 'addGun':
      return state + 1
    case 'removeGun':
      return state - 1
    default:
      return state
  }
}

// action creator
export function addGun () {
  return {type: ADD_GUN}
}
export function removeGun () {
  return {type: REMOVE_GUN}
}
export function addGunAsync () {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(addGun())
    }, 2000)
  }
}