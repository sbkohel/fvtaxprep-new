'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.services',
  'myApp.deductions',
  'myApp.e-dashboard',
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
.run(function($rootScope, $location, loginService){
    
    var routespermission=['/e-dashboard'];   
    $rootScope.$on('$routeChangeStart',function(){
        console.log ('testing route ' + $location.path());
        if (routespermission.indexOf($location.path()) !== -1 ){
            var connected = loginService.islogged();
            connected.then(function(msg){
                console.log(msg);
                if (!msg.data)
                     $location.path('/login');
            });
           
        }
     });
 });

