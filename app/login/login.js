'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])
.factory('loginService', function($http, $location, sessionService){
    return {
        login: function(data, $scope){
            var $promise = $http.post('data/user.php', data);
            $promise.then(function(msg){
                var uid=msg.data;
                if(uid){  
                    sessionService.set('uid', uid);
                    console.log('changing path');
                    $location.path('/e-dashboard');
                }    
                else{
                    $scope.msgtxt='Invalid username/password';
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
        }
    };
})
.controller('LoginCtrl', ['$scope','loginService',function($scope, loginService) {
        $scope.msgtxt='';
        $scope.login=function(user){
            loginService.login(user, $scope);
        };

}]);