let mysql = require('mysql');
var connection = mysql.createConnection({
    host: "hadjo.mysql.database.azure.com", 
    user: "nour@hadjo", password: 'hadj@omra1', 
    database: 'hadj', 
  })
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });
  module.exports=connection
