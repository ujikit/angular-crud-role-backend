const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
const dotenv = require('dotenv').config()
const ENV = dotenv.parsed

exports.login = function(req, res) {

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
			console.log(hash)
			return res.status(200).json({
				"status": "success",
				"data: ": +JSON.stringify(hash)
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
