'use strict';

angular.module('myApp.e-dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/e-dashboard', {
    templateUrl: 'e-dashboard/e-dashboard.html',
    controller: 'E-dashboardCtrl'
  });
}])
.controller('E-dashboardCtrl', ['$scope','loginService',function($scope, loginService ) {
     $scope.logout=function(){
         loginService.logout();
     };   
}]);