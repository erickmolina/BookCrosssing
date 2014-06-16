var connection = require("./conexion");

exports.flogin = function(res,mail,pass){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("SELECT IdUsuario,Nombre From Usuario Where Correo ='"+mail+"'and Contrasena='"+pass+"'", function(err, rows, fields) {
		if (err) throw err;
			if(rows.length ==0){
				res.send([{"IdUsuario":0,"Nombre":"null"}]);
			}
			else{
				res.json(rows);
			}
		});
	con.end();
};


exports.faddUsuario= function(res,usuario,face,twi,correo,pass){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("Insert into Usuario(Nombre,FacebookId,TwitterId,Correo,Contrasena) Values('"+usuario+"','"+face+"','"+twi+"','"+correo+"','"+pass+"')", function(err, rows, fields) {
	if (err) throw err;
		res.send("add");
	});
	con.end();
}
