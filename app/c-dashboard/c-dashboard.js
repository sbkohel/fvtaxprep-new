'use strict';

angular.module('myApp.c-dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/c-dashboard', {
    templateUrl: 'c-dashboard/c-dashboard.html',
    controller: 'C-dashboardCtrl'
  });
}])
.controller('C-dashboardCtrl', ['$scope','loginService',function($scope, loginService ) {
     $scope.logout=function(){
         loginService.logout();
     };   
}]);