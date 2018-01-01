import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from "../../util";
import {ChatBoxLeft, ChatBoxRight} from "../chatbox/chatbox"

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
export default class Chat extends React.Component{
  constructor (props){
    super(props)
    this.state = {text:'', msg:[], showEmoji: false}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount (){
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount () {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel () {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  scrollToBottom () {
    let chatDom = document.getElementById('chat-page')
    window.scrollTo(0, chatDom.getBoundingClientRect().bottom)
  }
  handleSubmit (){
    const msg = this.state.text
    if (!msg) {
      return
    }
    const from = this.props.user._id
    const to = this.props.match.params.user
    this.props.sendMsg({from,to,msg})
    this.setState({text: ''})
  }
  render (){
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
        .split(' ')
        .filter(v=>v)
        .map(v=>({text:v}))
    const userId = this.props.match.params.user
    const chatId = getChatId(userId, this.props.user._id)
    const chatMsgs = this.props.chat.chatMsg.filter(item => item.chatId === chatId)
    const users = this.props.chat.users
    if (!users[userId]) {
      return null
    }

    return (
        <div id='chat-page'>
          <NavBar
              mode="dark"
              icon={<Icon type="left"/>}
              onLeftClick={() => {
                this.props.history.goBack()
              }}
          >{users[userId].name}</NavBar>

          {chatMsgs.map(item=>{
            const avatar = require(`../imgs/${users[item.from].avatar}.png`)
            return item.from === userId ? (
                <ChatBoxLeft key={item._id} avatar={avatar} content={item.content}/>
            ) : (
                <ChatBoxRight key={item._id} avatar={avatar} content={item.content}/>
            )
          })}

          <div className="stick-footer">
            <List>
              <InputItem
                  placeholder='请输入'
                  value={this.state.text}
                  onChange={v=>{
                    this.setState({text:v})
                  }}
                  extra={
                    <div>
                      <span
                          style={{marginRight:15}}
                          onClick={()=>{
                            this.setState({
                              showEmoji: !this.state.showEmoji
                            })
                            this.fixCarousel()
                            this.scrollToBottom()
                          }}
                      >😃</span>
                      <span onClick={() => {
                        this.handleSubmit()
                        this.setState({
                          showEmoji: false
                        })
                      }}>发送</span>
                    </div>
                  }
              ></InputItem>
            </List>
            {this.state.showEmoji ? <Grid
                data={emoji}
                columnNum={9}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={elm=>{
                  this.setState({
                    text:this.state.text + elm.text
                  })
                }}
            /> : null}
          </div>
        </div>
    )
  }
}