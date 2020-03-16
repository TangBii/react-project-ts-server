const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/react-project-ts', { useNewUrlParser: true, useUnifiedTopology: true})
const conn = mongoose.connection
conn.on('connected', () =>{
  console.log("connection succeeded!")
})

module.exports = mongoose