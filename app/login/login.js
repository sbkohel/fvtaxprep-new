'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])
.factory('loginService', function($rootScope, $http, $location, sessionService){
    var user;

    return {
        login: function(data, $scope){                        
            var $promise = $http.post('data/user.php', data);  
            user = data.mail;          
            
            $promise.then(function(msg){
                var data=msg.data;
                if(data){  
                    sessionService.set('uid', data.uid);
                    $rootScope.isLoggedIn = true;
                    if(data.role === 'admin'){
                        $rootScope.isEmployee = true;
                        $location.path('/e-dashboard');
                    }
                    else{
                        $rootScope.isCustomer = true;
                        $location.path('/c-dashboard');
                    } 
                        
                }       
                else{
                    $scope.msgtxt='Invalid username/password';
                    $rootScope.isLoggedIn = false;
                    $rootScope.isCustomer = false;
                    $rootScope.isEmployee = false;
                    $location.path('/login');
                }                     
            });
        },
        logout: function(){
            sessionService.destroy('uid');
            $location.path('/login');
        },
        islogged: function(){
            var checkSessionServer=$http.post('data/check_session.php');
            return checkSessionServer;            
        },
        getUser: function(){
            return user;
        }
    };
})
.controller('LoginCtrl', ['$scope','$location','loginService',function($scope, $location,loginService) {
        $scope.msgtxt='';
        
        $scope.login=function(user){                  
            loginService.login(user, $scope);
        };
        
        $scope.isLogged = function(){
          var connected = loginService.islogged();
            connected.then(function(msg){
                var data=msg.data;
                console.log(data);
                if (data){
                    $location.path('/home');
                }
            });  
        };
        
        $scope.isLogged();
}]);