const express = require('express');
const router = express.Router();
const md5 = require('md5-node')

const UserModel = require('../db/models').UserModel

// 过滤属性
const filter = {password: 0}
const maxAge = 1000 * 60 * 60 * 24 * 7

// 登陆路由
router.post('/login', (req, res) => {
  const {username, password, autoLogin} = req.body
  
  UserModel.findOne({username, password: md5(password)}, filter, (err, user) => {
    if (err) {
      res.send({status: 0, message: '发生未知错误0'})
    }
    if (user) {
      if (autoLogin) {
        res.cookie('userid', user._id, {maxAge})
      } else {
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 10})
      }
      res.send({status: 1, data: user})
    } else {
      res.send({status: 0, message: '用户名或密码错误'})
    }
  })
})

// 注册路由
router.post('/register', (req, res) => {
  const {username, password, type} = req.body
  UserModel.findOne({username}, filter, (err, user) => {
    if (err) {
      res.send({status: 0, message: '发生未知错误1'})
    }
    if (user) {
      res.send({status: 0, message: '此用户已被注册'})
    } else {
      new UserModel({
        username,
        password: md5(password),
        type
      }).save((err, user) => {
        if (err) {
          res.send({status: 0, message: '发生未知错误2'})
        }
        
        // 和登陆过程一样，生成一个 Cookie
        res.cookie('userid', user._id, {maxAge})

        // 过滤密码
        res.send({status: 1, data: {_id: user._id, username, type}})
      })
      
    }
  })
})


// 信息完善路由
router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.send({status: 0, message: '用户不存在,请重新登陆'})
  }
  UserModel.findByIdAndUpdate({_id: userid}, req.body, (error, oldUser) => {
    if (error) {
      return res.send({status: 0, message: '发生未知错误3'})
    }
    if (!oldUser) {
      res.clearCookie('userid')
      return res.send({status: 0, message: '用户信息无效, 请重新登陆'})
    }
    const {_id, username, type} = oldUser
    const user = Object.assign({_id, username, type}, req.body)
    res.send({status: 1, data: user})
  })
})







module.exports = router;
