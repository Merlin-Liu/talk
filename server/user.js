const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res, next) {
  const { type } = req.query
  // User.remove({}, function (err, doc){})
  User.find({type}, function (err, doc) {
    if (!err) {
      return res.json({code: 0, data: doc})
    }
  })
})
Router.post('/readmsg', function (req, res, next) {
  const userId = req.cookies.userId
  const {from} = req.body
  Chat.update(
      {from, to: userId},
      {'$set': {'read': true}},
      {'multi': true},
      function (err, doc) {
        console.log(doc)
        if (!err) {
          return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: '修改失败'})
  })
})
Router.post('/update', function (req, res, next) {
  const { userId } = req.cookies
  if (!userId) {
    return res.json({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userId, body, function (err, doc) {
    if (!err) {
      const data = Object.assign({}, {
        user: doc.user,
        type: doc.type
      }, body)
      return res.json({code: 0, data})
    }
  })
})
Router.post('/register', function (req, res, next) {
  const {user, pwd, type} = req.body
  User.find({user: user}, function (err, doc) {
    if (doc.length !== 0) {
      return res.json({code: 1, msg: '用户名已存在！'})
    }
    const userModel = new User({user, pwd: md5Pwd(pwd), type})
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '数据存储错误！'})
      }
      const {user, type, _id} = doc
      res.cookie('userId', _id)
      return res.json({code: 0,data: {user, type, _id}})
    })
  })
})
Router.post('/login', function (req, res, next) {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误！'})
    }
    res.cookie('userId', doc._id)
    return res.json({code: 0, data: doc})
  })
})
Router.get('/msglist', function (req, res, next) {
  const user = req.cookies.userId
  console.log(user)
  User.find({}, function (err, userDoc) {
    let users = {}
    userDoc.forEach(item => {
      users[item._id] = {name: item.user, avatar: item.avatar}
    })
    Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
      if (!err) {
        return res.json({code: 0, data: doc, users: users})
      }
      return res.json({code: 1})
    })
  })
})
Router.get('/info', function (req, res, next) {
  const { userId } = req.cookies
  if (!userId) {
    return res.json({code: 1})
  }
  User.findOne({_id: userId}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg:'数据库查询错误！'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

function md5Pwd (pwd) {
  const salt = 'isliusapp'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router