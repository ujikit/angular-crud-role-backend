const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
const dotenv = require('dotenv').config()
const ENV = dotenv.parsed
var jwt = require('jsonwebtoken')

exports.login = function(req, res) {
	let {
		username,
		password
	} = req.body

	var token = jwt.sign({
		username: username
	}, ENV.SECRET_KEY, {
		expiresIn: 40 // [No arguments] is seconds
	})

	var token_header = req.headers['x-access-token']
	if (!token_header) return res.status(401).send({
		auth: false,
		message: 'No token provided.'
	})

	jwt.verify(token_header, ENV.SECRET_KEY, function(err, decoded) {
		if (err) return res.status(500).send({
			auth: false,
			message: 'Failed to authenticate token.'
		})

		const connection = mysql.createConnection({
			host: ENV.SERVER_URL,
			user: ENV.DB_USER,
			password: ENV.DB_PASSWORD,
			database: ENV.DB_NAME
		})

		var sql = "SELECT * FROM users"
		connection.query(sql, function(err, rows) {
			bcrypt.hash("ujikit", null, null, (err, hash) => {
				if (err) {
					throw err
				}
				return res.status(200).json({
					"status": "success",
					"data: ": rows
				})
			})
		})
	})

}

exports.register = (req, res) => {
	let {
		username,
		password
	} = req.body

	const connection = mysql.createConnection({
		host: ENV.SERVER_URL,
		user: ENV.DB_USER,
		password: ENV.DB_PASSWORD,
		database: ENV.DB_NAME
	})

	let password_hashed = bcrypt.hashSync(password)
	var sql = `INSERT INTO users (username, password, role, created_at, updated_at) values ('${username}', '${password_hashed}', 2, NOW(), NOW())`
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		}

		res.status(200).json({
			status: "success",
			data: "Successfully register."
		})

	})

}
