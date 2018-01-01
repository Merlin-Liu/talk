import React from 'react'

export function CompWrapper (Component) {
  return class WarpComponent extends Component {
    render () {
      const reactElm = super.render()
      let newProps = {}
      if (reactElm.type === 'input') {
        newProps = {value: '这是一个input'}
      }
      const props = Object.assign({}, reactElm.props, newProps)
      const newReactElm = React.cloneElement(reactElm, props, reactElm.props.child)
      return newReactElm
    }
  }
}