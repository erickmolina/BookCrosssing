angular.module('myApp', []).controller('perfil', function ($scope,$http,$compile) {
	delete $http.defaults.headers.common['X-Requested-With'];
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	
	var id = localStorage.idlibro;
	var user = localStorage.iduser;
	$http({
	method: 'GET', 
	url:' http://bookcrossing-electivamoviles.rhcloud.com/getInfoBook',
	params: {idbook : id}}).
	success(function(data, status, headers, config) {
		console.log(data);
		var s="";
		for (i = 0; i < data.length; i++){
			s+="<h3 >"+data[i].NombreLibro+ "</h3>";
			s+="<p>"+data[i].Descripcion+"</p>";
			s+="<h5> Estado: "+data[i].Estado+"</h5>";
			s+="<h4>Genero: "+data[i].Categoria+"</h5>";
		}
		$("#book").append(s);
		$scope.googleBooks(data[0].NombreLibro);
	}).
	error(function(data, status, headers, config) {
		console.log(data);
	});	
	
	$http({
	method: 'GET', 
	url:' http://bookcrossing-electivamoviles.rhcloud.com/getReadsBook',
	params: {idbook : id}}).
	success(function(data, status, headers, config) {
		console.log(data);
		var s="";
		for (i = 0; i < data.length; i++){
			s+="<li> "+data[i].Nombre+"</li>";
		}
		$("#lectores").append(s).listview().listview('refresh');
	}).
	error(function(data, status, headers, config) {
		console.log(data);
	});
	
	$http({
	method: 'GET', 
	url:' http://bookcrossing-electivamoviles.rhcloud.com/getCommentsBook',
	params: {idbook : id}}).
	success(function(data, status, headers, config) {
		console.log(data);
		var s="";
		for (i = 0; i < data.length; i++){
			s+="<li> <img src='img/profile.png' width='100' height='100'/><h5>"+data[i].Nombre+"</h5><p>"+data[i].Comentario+"</p></li>";
		}
		$("#comentarios").append(s).listview().listview('refresh');
	}).
	error(function(data, status, headers, config) {
		console.log(data);
	});	
	
	$scope.googleBooks = function(title){
		$http({
		method: 'GET', 
		url:'https://www.googleapis.com/books/v1/volumes',
		params: {q : title}}).
		success(function(data, status, headers, config) {
			//console.log(data.items[0].volumeInfo);
			//data.items[i].volumeInfo.
			var s="";
			for (i = 0; i < data.items.length; i++){
				s+="<li > <h3 href>"+data.items[i].volumeInfo.title+"</h3><h5> Autor: "+data.items[i].volumeInfo.authors[0]+"</h5><p> Editorial: "+data.items[i].volumeInfo.publisher+"</p></li>";
			}
			$("#info").append(s).listview().listview('refresh');
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		});	
		
	}
	$scope.comentar = function(){
		var comentario = $("#comment").val();
		if(comentario!=""){
			$.mobile.loading("show");
			$http({
				method: 'POST', 
				url:' http://bookcrossing-electivamoviles.rhcloud.com/addComment',
				data: {idlibro:id,idusuario:user,comment : comentario}}).
				success(function(data, status, headers, config) {
					console.log(data);
					$.mobile.loading("hide");
					if(data=="add"){
						$("#comment").val("");
						alert("Comentario Agregado");
						reloadComments();
					}
					else{
						alert("Error al agregar el comentario\n vuelva a intentarlo");
					}
				}).
				error(function(data, status, headers, config) {
					console.log(data);
					$.mobile.loading("hide");
					alert("Error al agregar el comentario\n vuelva a intentarlo");
				});
		}
	};
	
	function reloadComments(){
		$.mobile.loading("show");
		$http({
		method: 'GET', 
		url:' http://bookcrossing-electivamoviles.rhcloud.com/getCommentsBook',
		params: {idbook : id}}).
		success(function(data, status, headers, config) {
			console.log(data);
			var s="";
			for (i = 0; i < data.length; i++){
				s+="<li> <img src='img/profile.png' width='100' height='100'/><h5>"+data[i].Nombre+"</h5><p>"+data[i].Comentario+"</p></li>";
			}
			$("#comentarios").html(s).listview().listview('refresh');
			$.mobile.loading("hide");
		}).
		error(function(data, status, headers, config) {
		$.mobile.loading("hide");
			console.log(data);
		});
	}
	
});