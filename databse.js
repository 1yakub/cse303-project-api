var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sqluser',
  password : 'siam1998',
  database : 'dbms'
});
 
connection.connect(err=>{
    if(!err){
        console.log('Connected')
    }
    else{
        console.log(err)
    }
});
module.exports = connection
 //CREATE USER 'sqluser'@'%' IDENTIFIED WITH mysql_native_password BY 'siam1998';