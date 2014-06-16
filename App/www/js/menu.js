angular.module('myApp', []).controller('menu', function ($scope,$http,$compile) {
	delete $http.defaults.headers.common['X-Requested-With'];
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	$scope.logout = function(){
		localStorage.clear();
		revoke();
		//navigator.app.exitApp();
		window.location.href="index.html";
	};
	
	 function revoke() {
        openFB.revokePermissions(
                function() {
                    alert('Permissions revoked');
                },
                errorHandler);
    }

    function errorHandler(error) {
        //alert(error.message);
    }
});