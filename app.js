const express = require('express')
const app = express()
const connection = require('express-myconnection')
const mysql = require('mysql')
const bodyParser = require("body-parser")
var cors = require('cors')

// Models
const product = require('./src/controllers/ProductController')
const auth = require('./src/controllers/AuthController')

// all environments
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

// Logout Function (Anti Back Button After Logout)
app.use(function(req, res, next) {
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
	next()
})

// routes
app.post('/login', auth.login)
app.post('/register', auth.register)
app.get('/products', product.index)

//Middleware
const listener = app.listen(8888, function() {
	console.log('Listening on port ' + listener.address().port)
})
