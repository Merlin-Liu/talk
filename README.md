# 找实习 — 基于React16全家桶的实时聊天单页应用

## 概述

使用React16制作的的WebApp，UI方面，使用了React的UI库Ant Design Mobile，项目中涉及到一些高阶函数、高阶组件的部分，都做了详细的注解，并有demo。

## 功能

* 用户注册——实现了基本的注册功能，用户名的查重、两次密码一致、默认角色等。

* 用户登陆——实现了基本的登陆功能，用户名校验、密码校验、写入cookie等。

* 信息完善——针对不同的角色，进入不同的信息完善页，以及头像选择。

* 信息查看——列表形式展现信息。如果是实习生，可以看到BOSS的招聘信息；如果是招聘者，可以看到实习生寻求实习的信息。

* 发起聊天——点击对应的角色，可以发起对该角色的聊天。

* 实时聊天——可实时接收当前角色收到的信息。

* 消息列表显示——展示当前角色对不同角色的聊天列表。

* 未读消息数量——显示当前角色的未读消息数量。

* 用户退出——清除cookie，跳转回登陆页。

## 功能演示

**注册**

![注册](./public/注册.gif)

**信息完善**

![信息完善](./public/信息完善.gif)

**登陆**

![登陆](./public/登陆.gif)

**实时聊天**

![实时聊天](./public/实时聊天.gif)

## 技术栈

* 使用React官方提供的构建工具create-react-app构建项目
* React16
* Express
* Socket.IO做前后端实时通讯
* MongoDB的Node环境下的对象模型工具mongoose
* 使用React-Router4做路由跳转
* 使用Redux状态管理，React-Redux连接React和Redux
* 使用React16新抽取的prop-types指定context对象、props类型
* cookie-parser操作cookie
* axios进行数据传递
* UI使用ant-design组件库

## 项目结构
<pre>
.
├── README.md
├── config
├── package.json
├── public // 公共资源
├── scripts 
│   ├── build.js
│   ├── start.js
│   └── test.js
├── server
│   ├── model.js // 数据模型
│   ├── server.js // 启动server、连接mongodb
│   └── user.js // 路由
├── src
│   ├── component // 组件库
│   │   ├── HOCdemo.js // 高阶组件demo
│   │   ├── authRoute // 路由认证
│   │   ├── avatar-selector // 头像原则
│   │   ├── boss // 招聘者
│   │   ├── chat // 聊天界面
│   │   ├── chatbox // 聊天气泡
│   │   ├── dashboard // 主界面
│   │   ├── genius // 求职者
│   │   ├── imgs 
│   │   ├── logo // logo组件
│   │   ├── msglist // 消息列表
│   │   ├── myself // 个人信息
│   │   ├── navlinkbar // 导航
│   │   ├── usercard // 求职者或者招聘者信息列表
│   │   └── wrapChangeHandle // 高阶组件
│   ├── config.js
│   ├── container
│   │   ├── bossinfo // 招聘者信息完善
│   │   ├── geniusinfo // 求职者信息完善
│   │   ├── login // 登陆
│   │   └── register // 注册
│   ├── index.css
│   ├── index.js
│   ├── reducer.js // reducer
│   ├── redux
│   │   ├── chat.redux.js // chat数据
│   │   ├── chatuser.redux.js chatuser数据
│   │   └── user.redux.js // user数据
│   └── util.js // 封装了常用工具
└── yarn.lock
28 directories, 78 files
</pre>

## 总结

主要学会对React-Router4的使用以及了解了React、React-Router4和之前版本的不同，更加深入的理解Redux和React-Router的原理，对React组件的优化也加深了了解，学会了socket.IO的使用

## 运行

```
# clone 

git colne https://github.com/Merlin-Liu/talk.git

cd talk

# dev

npm start

# build

npm build
```