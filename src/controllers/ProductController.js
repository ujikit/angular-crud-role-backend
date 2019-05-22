const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')
const dotenv = require('dotenv').config()
const ENV = dotenv.parsed
var jwt = require('jsonwebtoken')

exports.index = function(req, res) {
	// let offset  = req.param.offset || 0;
	const connection = mysql.createConnection({
		host: ENV.DB_HOST,
		user: ENV.DB_USER,
		password: ENV.DB_PASSWORD,
		database: ENV.DB_NAME
	})

	// var sql = `SELECT transactions.id, name_product, price_product FROM transactions INNER JOIN products ON transactions.id_product_transaction = products.id LIMIT 2 OFFSET ${offset};`
	var sql = `SELECT * FROM products ORDER BY id DESC LIMIT 6 offset 2;`
	connection.query(sql, (err, rows) => {
		if (err) {
			throw err
		}
		try {
			return res.status(200).json({
				status: "success",
				data: rows
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
