const express = require('express')
const app = express()
const connection = require('express-myconnection')
const mysql = require('mysql')
const bodyParser = require("body-parser")

// Models
const index = require('./src/controllers/index')

app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'angular_crud_role'
}, 'single'))

global.db = connection

// all environments
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/third-party', express.static(__dirname + '/third-party'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

// Logout Function (Anti Back Button After Logout)
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  next()
})

// routes
app.get('/', index.index)

//Middleware
const listener = app.listen(8888, function(){
  console.log('Listening on port ' + listener.address().port)
})
