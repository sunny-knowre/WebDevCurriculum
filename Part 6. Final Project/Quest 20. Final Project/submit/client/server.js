const express = require('express')
const path = require('path')
const app = express()
app.use('/dist', express.static('dist'))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(8081, function () {
  console.log('Server started!')
})
