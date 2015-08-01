'use strict';

angular.module('myApp.deductions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/deductions', {
    templateUrl: 'deductions/deductions.html',
    controller: 'DeductionsCtrl'
  });
}])

.controller('DeductionsCtrl', [function() {

}]);