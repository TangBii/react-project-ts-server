const UserModel = require('./models').UserModel

const user = {
  username: 'test',
  password: 123,
  type: 'hr',
  }
  const userModel = new UserModel(user)
  // 保存到数据库
  userModel.save(function (err, user) {
  console.log('save', err, user)
  })