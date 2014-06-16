angular.module('myApp', []).controller('perfilcaptura', function ($scope,$http,$compile) {
	delete $http.defaults.headers.common['X-Requested-With'];
	
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	if(!localStorage.logeadofb){
		$("#btnpublicar").prop('disabled', true).trigger("change");
	}
	var id = localStorage.idlibro;
	var iduser = localStorage.iduser;
	var nombre= localStorage.nameuser;
	
	$scope.iniciar=  function(){
		$http({
		method: 'GET', 
		url:' http://bookcrossing-electivamoviles.rhcloud.com/getInfoBook',
		params: {idbook : id}}).
		success(function(data, status, headers, config) {
			console.log(data);
			var s="";
			for (i = 0; i < data.length; i++){
				s+="<h2>"+data[i].NombreLibro+ "</h2>";
				s+="<p>"+data[i].Descripcion+"</p>";
				s+="<h4>Genero: "+data[i].Categoria+"</h5>";
			}
			$("#book").append(s);
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		});	
	};
	
	$scope.capturarLibro= function(){
	   alert(id+iduser,nombre);
	   $.mobile.loading("show");
	   $http({
			method: 'POST', 
			url:' http://bookcrossing-electivamoviles.rhcloud.com/catchBook',
			data: {idlibro:id,idusuario:iduser, name:nombre }}).
			success(function(data, status, headers, config) {
				console.log(data);
				$.mobile.loading("hide");
				if(data=="catch"){
					alert("Libro Capturado");
					$("#btnreg").attr('disabled', 'disabled');
				}
				else{
					alert("Error al capturar el libro\n vuelva a intentarlo");
				}
			}).
			error(function(data, status, headers, config) {
				console.log(data);
				$.mobile.loading("hide");
				alert("Error al capturar el libro\n vuelva a intentarlo");
			});
	};
	
	$scope.publicar = function(){
		var comment = $("comment").val();
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: comment
            },
            success: function() {
                alert('the item was posted on Facebook');
            },
            error: errorHandler});
	};
	function errorHandler(error) {
        alert(error.message);
    }
});