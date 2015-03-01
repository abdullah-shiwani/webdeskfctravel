var mysql   =   require('mysql');

var DB_CONFIG = {
	host: "localhost",
	user: "root",
	pass: "",
	database: "webdesk_fc",
	charset: 'UTF8_GENERAL_CI'
}

var connection = mysql.createConnection(DB_CONFIG);


connection.connect(function(){
	console.log("<== MySQL Database is Connected ==>");
});


module.exports = connection;