angular.module('myApp', []).controller('capturar', function ($scope,$http,$compile) {
	delete $http.defaults.headers.common['X-Requested-With'];
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	var iduser = localStorage.iduser;
	var nameuser =localStorage.nameuser;
	$http({
	method: 'GET', 
	url:' http://bookcrossing-electivamoviles.rhcloud.com/getFreeBooks',
	params: {books : "all"}}).
	success(function(data, status, headers, config) {
		console.log(data);
		var s="";
		var b="<ul id='buscar' data-role='listview' data-enhanced='true' data-filter='true' data-filter-reveal='true' data-filter-placeholder='Buscar un libro..' data-inset='true'>";
		for (i = 0; i < data.length; i++){
			s+="<li><a data-transition='slide' id='" +data[i].IdLibro+"' ng-click='capturarLibro("+data[i].IdLibro+")'><img src='img/book.png' width='100' height='100'/><h3>";
			s+=data[i].NombreLibro+"</h3><p>"+data[i].Categoria+"</p></a></li>"; 
			b+="<li><a id='" +data[i].IdLibro+"' ng-click='capturarLibro("+data[i].IdLibro+")'>"+data[i].NombreLibro+"</a></li>";
		}
		b+="</ul>";
		var $busc =$('#dbusc').html(b).trigger("create");
		$('#lista').append(s).trigger("create");
		var $add = $('#lista').listview().listview('refresh');
		$compile($add)($scope);
		$compile($busc)($scope);
	}).
	error(function(data, status, headers, config){
		console.log(data);
	});	
	
	$scope.capturarLibro = function(id){
		localStorage.idlibro =id;
		window.location.href="perfilcaptura.html";
	};
	
});