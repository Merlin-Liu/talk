import React from 'react'

class ChatBoxLeft extends React.Component {
  render () {
    return (
          <div className="chat-box">
            <img className="avatar" src={this.props.avatar} alt=""/>
            <div className="text">
              {this.props.content}
            </div>
          </div>
    )
  }
}

class ChatBoxRight extends React.Component {
  render () {
    return (
        <div className="chat-box myself">
          <img className="avatar" src={this.props.avatar} alt=""/>
          <div className="text">
            {this.props.content}
          </div>
        </div>
    )
  }
}

export {ChatBoxLeft, ChatBoxRight}