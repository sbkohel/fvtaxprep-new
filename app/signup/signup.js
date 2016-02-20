'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope','$http','$rootScope','$location', 
            function($scope, $http, $rootScope, $location) {
        
    $scope.pwdreq='Required length 8 with at least 1 letter, 1 number, and 1 special character'; 
    $scope.isStrong = false;
    $scope.formComplete = false;

    $scope.submit = function(person){
    	$http.post('data/addUser.php', person)
    		.success(function(data, status){
                //$rootScope.isLoggedIn = true;
                bootbox.alert('Account creation successful. You may now login.',function(){});
    			$location.path('/home');
    		})
    		.error(function(data, status){
    			console.log('Error');
    		});
    };

    $scope.validatepwd = function(pwd){
    	var regexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[\W])([a-zA-Z0-9\W]{8,})$/;
    	
    	if($scope.person.passwd.match(regexp) !== null)
    		$scope.isStrong = true;
    	else{
    		$scope.isStrong = false;
    		$scope.person.passwd2 = "";
    		$scope.formComplete = false;
    		$scope.getColor();
    	}
    };

    $scope.validatepwd2 = function(){
    	
    	if ($scope.person.passwd == $scope.person.passwd2)
    		$scope.formComplete = true;
    	else{
    		$scope.formComplete = false;
    		$scope.getColor2();
    	}
    }
    
    $scope.getColor = function(){
    	if (!$scope.isStrong)
    		return '#ff3333';
    	else
    		return '#99ff99';
    }

    $scope.getColor2 = function(){
    	if (!$scope.formComplete)
    		return '#ff3333';
    	else
    		return '#99ff99';
    }
}]);