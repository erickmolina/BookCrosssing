angular.module('myApp', []).controller('libros', function ($scope,$http,$compile) {
	delete $http.defaults.headers.common['X-Requested-With'];
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	$http({
	method: 'GET', 
	url:' http://bookcrossing-electivamoviles.rhcloud.com/getBooks',
	params: {books : "all"}}).
	success(function(data, status, headers, config) {
		console.log(data);
		var s="";
		for (i = 0; i < data.length; i++){
			s+="<li><a data-transition='slide' id='" +data[i].IdLibro+"' ng-click='bookinfo("+data[i].IdLibro+")'><img src='img/book.png' width='100' height='100'/><h3>";
			s+=data[i].NombreLibro+"</h3><p>"+data[i].Categoria+"</p></a></li>"; 
		}
		$('#lista').append(s).trigger("create");
		var $add = $('#lista').listview().listview('refresh');
		$compile($add)($scope);
	}).
	error(function(data, status, headers, config){
		console.log(data);
	});	
	
	$scope.bookinfo = function(id){
		localStorage.idlibro= id;
		window.location.href="perfil.html";
	};
	$scope.back = function (){
		window.location.href='menu.html';
	};
	
});