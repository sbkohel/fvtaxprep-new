'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.services',
  'myApp.deductions',
  'myApp.e-dashboard',
  'myApp.c-dashboard',
  'myApp.login',
  'myApp.signup',
  'myApp.version'
])
.factory('sessionService', ['$http', function($http){
        
    return{
        set: function(key, value){            
            return sessionStorage.setItem(key, value);
        },
        get: function(key){
            return sessionStorage.getItem(key);
        },
        destroy: function(key){
            $http.post('data/destroy_session.php');
            return sessionStorage.removeItem(key);
        }
    };
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.controller('indexCtrl', function($rootScope, $scope, loginService){   
    $rootScope.isLoggedIn = loginService.isLogged;    
    $rootScope.isCustomer = false;
    $rootScope.isEmployee = false;
    
    $scope.logout=function(){
        loginService.logout();
        $rootScope.isLoggedIn = false; 
        $rootScope.isCustomer = false;
        $rootScope.isEmployee = false;
     };
})
.run(function($rootScope, $location, loginService){
    
    var routespermission=['/e-dashboard','/c-dashboard'];   
    $rootScope.$on('$routeChangeStart',function(){
        if (routespermission.indexOf($location.path()) !== -1 ){
            var connected = loginService.islogged();
            connected.then(function(msg){
                console.log(msg.data);
                if (!msg.data)
                    $location.path('/login');
                else if ($rootScope.isEmployee)
                    $location.path('/e-dashboard');
                else
                    $location.path('/c-dashboard');
            });
        }
     });
 });

