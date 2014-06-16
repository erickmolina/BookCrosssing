angular.module('myApp', []).controller('liberar', function ($scope,$http,$compile) {
	delete $http.defaults.headers.common['X-Requested-With'];
	
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	var nombre= localStorage.nameuser;
	$scope.inicio= function(){
		$http({
		method: 'GET', 
		url:' http://bookcrossing-electivamoviles.rhcloud.com/getCatchBooks',
		params: {name : nombre}}).
		success(function(data, status, headers, config) {
			console.log(data);
			var s="";
			for (i = 0; i < data.length; i++){
				s+="<li><img src='img/book.png' width='100' height='150'/>"
				s+="<h3 style=tex-align:cente;>"+data[i].NombreLibro+"</h3>"
				s+= "<button id='" +data[i].IdLibro+"' ng-click='liberarLibro("+data[i].IdLibro+")' data-theme='b' >Liberar Aqui</button></li>";
			}
			$('#lista').html(s).trigger("create");
			var $add = $('#lista').listview().listview('refresh');
			$compile($add)($scope);
		}).
		error(function(data, status, headers, config){
			console.log(data);
		});	
	};
	
	$scope.liberarLibro = function(id){
		localStorage.idlibro =id;
		navigator.geolocation.getCurrentPosition( lecturaGPS , errorGPS , {enableHighAccuracy:true} ) ;
	};
	
	function lecturaGPS(ubicacion){
	   $.mobile.loading("show");
	   var id = localStorage.idlibro;
	  
	   var latp = ubicacion.coords.latitude;
	   var lonp = ubicacion.coords.longitude;
	   $http({
			method: 'POST', 
			url:' http://bookcrossing-electivamoviles.rhcloud.com/liberateBook',
			data: {idlibro:id,lat:latp, lon:lonp }}).
			success(function(data, status, headers, config) {
				console.log(data);
				$.mobile.loading("hide");
				if(data=="liberate"){
					alert("Libro Liberado");
					$scope.inicio();
					
				}
				else{
					alert("Error al liberar el libro\n vuelva a intentarlo");
				}
			}).
			error(function(data, status, headers, config) {
				console.log(data);
				$.mobile.loading("hide");
				alert("Error al liberar el libro\n vuelva a intentarlo");
			});
	}
  
	function errorGPS(){
		alert("Error GPS");
	}
	
});