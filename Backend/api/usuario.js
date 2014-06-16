var funciones = require('../logic/funcionesUsuario');

exports.addComment = function(req,res,next){
	if(req.body.idlibro && req.body.idusuario && req.body.comment){
		var idlibro = req.body.idlibro ;
		var idusuario = req.body.idusuario;
		var comment = req.body.comment;
		funciones.faddComment(res,idlibro,idusuario,comment);
	}
	else{
		res.send("0");
	}
};

exports.addBook = function(req,res,next){
	if(req.body.name && req.body.desc && req.body.cate && req.body.lat && req.body.lon){
		var name = req.body.name ;
		var desc = req.body.desc;
		var cate = req.body.cate;
		var lat = req.body.lat;
		var lon  =req.body.lon;
		funciones.faddBook(res,name,desc,cate,lat,lon);
	}
	else{
		res.send("0");
	}
};

exports.liberateBook = function(req,res,next){
	if( req.body.idlibro && req.body.lat && req.body.lon){
		var idlibro = req.body.idlibro;
		var lat = req.body.lat;
		var lon = req.body.lon;
		funciones.fliberateBook(res,idlibro,lat,lon);
	}
	else{
		res.send("0");
	}
};

exports.catchBook = function(req,res,next){
	if(req.body.idusuario && req.body.idlibro && req.body.name){
		var name = req.body.name ;
		var idusuario = req.body.idusuario;
		var idlibro = req.body.idlibro;
		funciones.fcatchBook(res,idusuario,idlibro,name);
	}
	else{
		res.send("0");
	}
};

exports.getCatchBooks = function(req,res,next){
	if( req.query.name){
		var name = req.query.name ;
		funciones.fgetCatchBooks(res,name);
	}
	else{
		res.send("0");
	}
};