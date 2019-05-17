const mysql = require('mysql')

exports.register = function(req, res){

  const connection = mysql.createConnection({
  	host : "localhost",
  	user : "root",
  	password : "",
  	database : "angular_crud_role"
  })

  var sql = "SELECT * FROM data_pegawai WHERE nip_pegawai='"+userId+"'"; //userID
  connection.query(sql, function  (err_final,rows){
    bcrypt.hash("ujikit", null, null, (err, hash) => {
      if (err) { throw err }
      console.log(hash);
      return res.status(200).json({
        "status": "success",
        "data: ": +JSON.stringify(hash)
      })
    })
  })

}
