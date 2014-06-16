var funciones = require('../logic/funcionesLibro');

exports.getFreeBooks = function(req,res,next){
	if(req.query.books && req.query.books =="all"){
		var books = req.query.books;
		funciones.fgetFreeBooks(res,books);
	}
	else{
		res.send("0");
	}
};

exports.getBooks = function(req,res,next){
	if(req.query.books && req.query.books =="all"){
		var books = req.query.books;
		funciones.fgetBooks(res,books);
	}
	else{
		res.send("0");
	}
};

exports.getInfoBook = function(req,res,next){
	if(req.query.idbook){
		var id = req.query.idbook;
		funciones.fgetInfoBook(res,id);
	}
	else{
		res.send("0");
	}
};

exports.getCommentsBook = function(req,res,next){
	if(req.query.idbook){
		var id = req.query.idbook;
		funciones.fgetCommentsBook(res,id);
	}
	else{
		res.send("0");
	}
};

exports.getReadsBook = function(req,res,next){
	if(req.query.idbook){
		var id = req.query.idbook;
		funciones.fgetReadsBook(res,id);
	}
	else{
		res.send("0");
	}
};

exports.getCategorias = function(req,res,next){
	if(req.query.cat){
		var cat = req.query.cat;
		funciones.fgetCategorias(res,cat);
	}
	else{
		res.send("0");
	}
};