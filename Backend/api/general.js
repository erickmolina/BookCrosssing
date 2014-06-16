var funciones = require('../logic/funcionesGeneral');

exports.login = function(req,res,next){
	if(req.body.correo && req.body.contrasena){
		var mail = req.body.correo ;
		var pass = req.body.contrasena;
		funciones.flogin(res,mail,pass);
	}
	else{
		res.send("0");
	}
};


exports.addUsuario = function(req,res,next){
	if(req.body.correo && req.body.contrasena &&req.body.usuario &&req.body.face && req.body.twi){
		var usuario = req.body.usuario;
		var correo = req.body.correo;
		var pass = req.body.contrasena;
		var face = req.body.face;
		var  twi = req.body.twi;
		funciones.faddUsuario(res,usuario,face,twi,correo,pass);
	}
	else{
		res.send("0");
	}
};

exports.index = function(req,res){
	res.send("おかえり");
}