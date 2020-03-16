const mongoose = require('./connection')

let userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  avatar: {type: String},
  post: {type: String},
  info: {type: String},
  company: {type: String},
  salary: {type: String}
})

let UserModel = mongoose.model('user', userSchema)

let chatSchema = mongoose.Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  chat_id: {type: String, required: true},
  content: {type: String, required: true},
  read: {type: Boolean, default: false},
  create_time:{type: Number}
})

const ChatModel = mongoose.model('chat', chatSchema)


module.exports = {UserModel, ChatModel}