const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
const dotenv = require('dotenv').config()
const ENV = dotenv.parsed

exports.index = function(req, res) {
	const connection = mysql.createConnection({
		host: ENV.SERVER_URL,
		user: ENV.DB_USER,
		password: ENV.DB_PASSWORD,
		database: ENV.DB_NAME
	})

	var sql = `SELECT * FROM users`
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		}
		try {
			return res.status(200).json({
				status: "success",
				data: rows[0].id
			})
		} catch (e) {
			if (e) {
				throw e
			}
			return res.status(400).json({
				"status": "error",
				"data": `Error happened: ${JSON.stringify(e)}`
			})
		}
	})
}
