import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
    state=>state
)
export default class MessageList extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatMsg.forEach(v=>{
      if (v.chatId.indexOf(userid) >= 0) {
        msgGroup[v.chatId] = msgGroup[v.chatId] || []
        msgGroup[v.chatId].push(v)
      }
    })

    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    return (
        <div>
          {chatList.map(v=>{
            const lastItem = this.getLast(v)
            const targetId = v[0].from==userid?v[0].to:v[0].from
            const unreadNum = v.filter(v=>!v.read&&v.to==userid).length
            if (!userinfo[targetId]) {
              return null
            }
            return (
                <List key={lastItem._id}>
                  <Item
                      extra={<Badge text={unreadNum}></Badge>}
                      thumb={require(`../imgs/${userinfo[targetId].avatar}.png`)}
                      arrow="horizontal"
                      onClick={()=>{
                        this.props.history.push(`/chat/${targetId}`)
                      }}
                  >
                    {lastItem.content}
                    <Brief>{userinfo[targetId].name}</Brief>
                  </Item>
                </List>
            )
          })}
        </div>
    )
  }
}









