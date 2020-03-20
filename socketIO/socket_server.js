module.exports = function (server) {
  const io = require('socket.io')(server)
  const ChatModel = require('../db/models').ChatModel
  io.on('connection', (socket) => {
    socket.on('ClientToServer', ({from, to, content}) => {
      const belongTo = [from, to].sort().join('_'),
            date = Date.now().toString()
      new ChatModel({from, to, content, belongTo, date, isRead: false})
      .save((err, message) => {
        if (err) {
          console.log('socketIO 出错' + err.message)
        }
        io.emit('ServerToClient', message)
      })
    })
  })
}
