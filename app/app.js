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
.service('cview',function(){
  var home = true;
  var appt = false;
  var info = false;
  var returns = false;
  var feedback = false;

  return{
    getHome: function(){
      return home;
    },
    getAppt: function(){
      return appt;
      console.log("appt is " + appt);
    },
    getInfo: function(){
      return info;
    },
    getReturns: function(){
      return returns;
    },
    getFeedback: function(){
      return feedback;
    },
    setView:function(val){
      if (val == 'home'){
        home = true;
        appt = false;
        info = false;
        returns = false;
        feedback = false;
      } else if (val == 'appt'){
        home = false;
        appt = true;
        info = false;
        returns = false;
        feedback = false;
      } else if (val == 'info'){
        home = false;
        appt = false;
        info = true;
        returns = false;
        feedback = false;
      } else if (val == 'returns'){
        home = false;
        appt = false;
        info = false;
        returns = true;
        feedback = false;
      } else if (val == 'feedback'){
        home = false;
        appt = false;
        info = false;
        returns = false;
        feedback = true;
      }
    }
  };
})
.controller('indexCtrl', ['$rootScope', '$scope', 'loginService','cview', function($rootScope, $scope, loginService, cview){   
    
    $rootScope.isLoggedIn = loginService.isLogged;    
    $rootScope.isCustomer = false;
    $rootScope.isEmployee = false;
    
    $scope.setView = function(val){
      cview.setView(val);
    }

    $scope.logout=function(){
        loginService.logout();
        $rootScope.isLoggedIn = false; 
        $rootScope.isCustomer = false;
        $rootScope.isEmployee = false;
     };
}])
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

