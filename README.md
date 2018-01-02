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
├── build                 // 构建服务和webpack配置,转发聊天机器人以及ajax获取用户数据相关内容
├── config                // 项目不同环境的配置
├── dist                  // 项目build目录
├── index.html            // 项目入口文件
├── package.json          // 项目配置文件
├── mockdata.json         // 项目模拟数据
├── src
│   ├── common            // 公用的css样式
│   ├── components        // 各种组件
│   ├── router            // 存放路由的文件夹
│   ├── vuex	            // 存放Vuex的相关
│   ├── muse-ui.config.js // muse-ui单组件加载配置
│   ├── App.Vue           // 模板文件入口
│   └── main.js           // Webpack 预编译入口
├── static                // css js 和图片资源
│   

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