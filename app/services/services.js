'use strict';

angular.module('myApp.services', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/services', {
    templateUrl: 'services/services.html',
    controller: 'ServicesCtrl'
  });
}])

.controller('ServicesCtrl', ['$scope', '$http',function($scope, $http){
    $scope.getData = function(){  
        $http.get('data/getPrices.php')
            .success(function(response){
                $scope.records = response; 
                return $scope.records;
            });
    };
    
    $scope.openLogin = function(){
            var modalInstance = modal.open({
                templateURL: loginModal.html,
                controller: LoginCtrl,
                size: md
            });
        }

    $scope.getData();
}]);