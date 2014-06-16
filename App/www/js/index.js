angular.module('myApp',[]).controller('index', function ($scope,$http) {
	delete $http.defaults.headers.common['X-Requested-With'];
	
	openFB.init('875967292418090'); 
	if(localStorage.iduser && localStorage.nameuser){
		window.location.href="menu.html";
	}
	$scope.login = function(){
		var mail = $("#mail").val() ;
		var pass = $("#pass").val();
		if(mail!="" && pass !=""){
			$.mobile.loading("show");
			$http({
				method: 'POST', 
				url:' http://bookcrossing-electivamoviles.rhcloud.com/login',
				data: {correo : mail,contrasena : pass}}).
				success(function(data, status, headers, config) {
					$.mobile.loading("hide");
					if(data[0].IdUsuario==0){
						alert("Usuario Invalido");
						$("#pass").val("");
					}
					else{
						$("#mail").val("");
						$("#pass").val("");
						localStorage.iduser= data[0].IdUsuario;
						localStorage.nameuser= data[0].Nombre;
						alert("Bienvenido\n"+data[0].Nombre);
						window.location.href ="menu.html";
					}
				}).
				error(function(data, status, headers, config) {
						$.mobile.loading("hide");
						alert("Error al iniciar sesion vuelva a intentarlo");
				});
		}
		else{
			alert("Llene de forma correcta todos los campos");
		}
	};
	
	
	$scope.registro = function(){
		var user = $("#ruser").val() ;
		var mail = $("#rmail").val() ;
		var pass = $("#rpass").val();
		var pass2 = $("#rrpass").val();
		if(mail!="" && pass !="" &&  user!="" && pass2!=""){
			if(pass == pass2){
				$.mobile.loading("show");
				$http({
					method: 'POST', 
					url:' http://bookcrossing-electivamoviles.rhcloud.com/addUsuario',
					data: {usuario:user,face:user,twi:user,correo : mail,contrasena : pass}}).
					success(function(data, status, headers, config) {
						console.log(data);
						$.mobile.loading("hide");
						if(data=="add"){
							 $("#ruser").val("");
							 $("#rmail").val("");
							 $("#rpass").val("");
		                     $("#rrpass").val("");
							alert("Gracias por registrarse");
							//$.mobile.changePage("#home");
						}
						else{
							alert("Error al realizar el registro\n vuelva a intentarlo");
						}
					}).
					error(function(data, status, headers, config) {
						console.log(data);
						$.mobile.loading("hide");
						alert("Error al realizar el registro\n vuelva a intentarlo");
					});
				}
				else{
					alert("Contraseñas no coinciden");
				}
		}
		else{
			alert("Llene de forma correcta todos los campos");
		}
	};
	
	 $scope.loginFb = function () {
        openFB.login('email',
                function() {
					localStorage.logeadofb="true";
                    alert('Facebook login succeeded');
					getInfo();
                },
                function(error) {
                    alert('Facebook login failed: ' + error.error_description);
                });
    };

    function getInfo() {
        openFB.api({
            path: '/me',
            success: function(data){
               $.mobile.loading("show");
			   $http({
					method: 'POST', 
					url:' http://bookcrossing-electivamoviles.rhcloud.com/addUsuario',
					data: {usuario:data.name , face: data.name,twi:data.id, correo : data.email, contrasena : data.id}}).
					success(function(data, status, headers, config) {
						console.log(data);
						$.mobile.loading("hide");
					}).
					error(function(data, status, headers, config) {
						console.log(data);
						$.mobile.loading("hide");
					});
					logfb(data.email,data.id);
				
            },
            error: errorHandler});
    }
	
	function logfb(correo,pass){
		alert(correo+pass);
		$http({
				method: 'POST', 
				url:' http://bookcrossing-electivamoviles.rhcloud.com/login',
				data: {correo : correo,contrasena : pass}}).
				success(function(data, status, headers, config) {
					$.mobile.loading("hide");
						localStorage.iduser= data[0].IdUsuario;
						localStorage.nameuser= data[0].Nombre;
						alert("Bienvenido\n"+data[0].Nombre);
						window.location.href ="menu.html";
				}).
				error(function(data, status, headers, config) {
						$.mobile.loading("hide");
						alert("Error al obtener los datos de usuario");
				});
	}

    function errorHandler(error) {
        alert(error.message);
    }
	
});