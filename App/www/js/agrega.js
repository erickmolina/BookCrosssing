angular.module('myApp', []).controller('agrega', function ($scope,$http,$compile) {
	delete $http.defaults.headers.common['X-Requested-With'];
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	$http({
	method: 'GET', 
	url:' http://bookcrossing-electivamoviles.rhcloud.com/getCategorias',
	params: {cat : "all"}}).
	success(function(data, status, headers, config) {
		console.log(data);
		var s="";
		for (i = 0; i < data.length; i++){ 
			s+="<option value='"+data[i].IdCategoria+"'>"+data[i].Categoria+"</option>";
		}
		$('#categoria').append(s);
		
	}).
	error(function(data, status, headers, config) {
		console.log(data);
	});	
	
	$scope.agregar = function(){
	   if($("#name").val()=="" || $("#desc").val() =="" || $("#categoria").val() =="0"){
			alert("llene todos los campos");
		}
		else{
			navigator.geolocation.getCurrentPosition( lecturaGPS , errorGPS , {enableHighAccuracy:true} ) ;
		}
	};
  
	function lecturaGPS(ubicacion){
	   $.mobile.loading("show");
	   var libro =  $("#name").val();
	   var desc1 = $("#desc").val();
	   var categ = $("#categoria").val();
	   var latp = ubicacion.coords.latitude;
	   var lonp = ubicacion.coords.longitude;
	   $http({
			method: 'POST', 
			url:' http://bookcrossing-electivamoviles.rhcloud.com/addBook',
			data: {name:libro, desc:desc1,cate:categ,lat:latp, lon:lonp }}).
			success(function(data, status, headers, config) {
				console.log(data);
				$.mobile.loading("hide");
				if(data=="add"){
					alert("Libro Agregado");
					$("#name").val("");
					$("#desc").val("");
				$("#categoria").val("0");
				}
				else{
					alert("Error al agregar el libro\n vuelva a intentarlo");
				}
			}).
			error(function(data, status, headers, config) {
				console.log(data);
				$.mobile.loading("hide");
				alert("Error al agregar el libro\n vuelva a intentarlo");
			});
	}
  
	function errorGPS(){
		alert("Error GPS");
	}
	
});