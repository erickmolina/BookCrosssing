var connection = require("./conexion");

exports.faddComment= function(res,idlibro,idusuario,comment){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("Insert into Comentario(FK_Libro,FK_Usuario,Comentario) Values('"+idlibro+"','"+idusuario+"','"+comment+"')", function(err, rows, fields) {
	if (err) throw err;
		res.send("add");
	});
	con.end();
};

exports.faddBook = function(res,name,desc,cate,lat,lon){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("Insert into Libro(FK_Categoria,NombreLibro,Descripcion,LLatitud,LLongitud,Estado,LectorActual) Values('"+cate+"','"+name+"','"+desc+"','"+lat+"','"+lon+"','Liberado','ND')", function(err, rows, fields) {
	if (err) throw err;
		res.send("add");
	});
	con.end();
};

exports.fliberateBook = function(res,idlibro,lat,lon){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("UPDATE Libro SET Estado='Liberado',LectorActual='ND',LLatitud='"+lat+"',LLongitud='"+lon+"' WHERE IdLibro='"+idlibro+"'", function(err, rows, fields) {
	if (err) throw err;
		res.send("liberate");
	});
	con.end();
};

exports.fcatchBook = function(res,idusuario,idlibro,name){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("CALL SP_CapturarLibro('"+idusuario+"','"+idlibro+"','"+name+"')", function(err, rows, fields) {
	if (err) throw err;
		res.send("catch");
	});
	con.end();
};

exports.fgetCatchBooks = function(res,name){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("SELECT IdLibro,NombreLibro,Categoria,Descripcion FROM Libro L INNER JOIN Categoria C ON L.FK_Categoria = C.IdCategoria WHERE LectorActual =  '"+name+"'", function(err, rows, fields) {
	if (err) throw err;
		res.json(rows);
	});
	con.end();
};