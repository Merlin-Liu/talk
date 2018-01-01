const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
// 将socket与express结合
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log('login!!')
  socket.on('sendMsg', function (data) {
    const {from, to, msg} = data
    const chatId = [from, to].sort().join('_')
    Chat.create({chatId, from, to, content: msg}, function (err, doc) {
      io.emit('recvMsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/myself', userRouter)

// 监听端口
server.listen(9000, function () {
  console.log('\n\n\n服务器已经开启，9000端口已经监听\n\n\n')
})


