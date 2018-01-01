const mongoose = require('mongoose')

// 连接MongoDB, 并且使用talk这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/talk'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('Mongo数据库连接成功！\n')
})

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {type: String},
    // 个人简介或者职位简介
    'desc': {type: String},
    // 求职意向
    'title': {type: String},
    // 如果是招聘者， 公司和薪资
    'company': {type: String},
    'money': {type: String}
  },
  chat: {
    'chatId': {type: String, require: true},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'read': {type: Boolean, default: false},
    'content': {type: String, require: true, default: ''},
    'create_time': {type: Number, default: new Date().getTime()}
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}