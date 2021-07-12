const express = require('express')
// const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const mongoose = require('mongoose')

require('dotenv').config()
// const { Schema, model } = require('mongoose')

app.use(cors())

app.use('/api/contacts', contactsRouter)


const { DB_HOST, PORT = 3000 } = process.env

// const userSchema = Schema({
//   name: String,
//   age: Number
// })

// const Woman = model('woman', userSchema)

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT)
})
  .catch(error => console.log(error))


// then(() => {
//   const newUser = {
//     name: 'Snake',
//     age: 1
//   }
//   User.create(newUser, (error, data) => {
//     if (error) {
//       console.log(error)
//       return
//     }
//     console.log(data)
//   })
// }).catch(error => console.log(error))
// console.log('Database connection successful')


// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// // app.use(express.json())


// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

module.exports = app
