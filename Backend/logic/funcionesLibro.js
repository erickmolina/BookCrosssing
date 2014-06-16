var connection = require("./conexion");

exports.fgetFreeBooks = function(res,books){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("SELECT IdLibro,NombreLibro,Categoria, LLatitud, LLongitud FROM Libro L INNER JOIN Categoria C ON L.FK_Categoria = C.IdCategoria WHERE Estado =  'Liberado'", function(err, rows, fields) {
		if (err) throw err;
			res.json(rows);
		});
	con.end();
};

exports.fgetBooks = function(res,books){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("SELECT IdLibro,NombreLibro,Categoria FROM Libro L INNER JOIN Categoria C ON L.FK_Categoria = C.IdCategoria", function(err, rows, fields) {
		if (err) throw err;
			res.json(rows);
		});
	con.end();
};


exports.fgetInfoBook = function(res,id){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("SELECT IdLibro,NombreLibro,Categoria,Descripcion,Estado FROM Libro L INNER JOIN Categoria C ON L.FK_Categoria = C.IdCategoria WHERE IdLibro= '"+id+"'", function(err, rows, fields) {
		if (err) throw err;
			res.json(rows);
		});
	con.end();
};


exports.fgetCommentsBook = function(res,id){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query(" SELECT Nombre,Comentario,Fecha FROM Libro L INNER JOIN Comentario C ON C.FK_Libro = L.IdLibro INNER JOIN Usuario U ON U.IdUsuario = C.FK_Usuario WHERE IdLibro= '"+id+"'", function(err, rows, fields) {
		if (err) throw err;
			res.json(rows);
		});
	con.end();
};


exports.fgetReadsBook = function(res,id){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("SELECT Nombre FROM Libro L INNER JOIN Lector Le ON Le.FK_Libro = L.IdLibro INNER JOIN Usuario U ON U.IdUsuario = Le.FK_Usuario WHERE IdLibro= '"+id+"'", function(err, rows, fields) {
		if (err) throw err;
			res.json(rows);
		});
	con.end();
};

exports.fgetCategorias= function(res,cat){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
	var con = connection.createConnection();
	con.connect();
	con.query("SELECT IdCategoria,Categoria FROM Categoria", function(err, rows, fields) {
		if (err) throw err;
			res.json(rows);
		});
	con.end();
};

