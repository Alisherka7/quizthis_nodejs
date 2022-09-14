const mysql = require('mysql');
// mysql connectiun
var con = mysql.createConnection({
  host: '54.180.5.195',
  user: 'alisherka7',
  password: 'Alisherka7!',
  database: 'quiz_this'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('connected!');
});
module.exports = con;
