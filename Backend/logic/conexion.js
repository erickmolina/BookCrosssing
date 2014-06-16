var mysql = require('mysql');     

function createConnection(){
    var connection = mysql.createConnection({
		host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
		user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
		password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
		database : process.env.OPENSHIFT_GEAR_NAME,
		multipleStatements: true
    });
	 return connection;
}

exports.createConnection = createConnection;
exports.mysql = mysql;