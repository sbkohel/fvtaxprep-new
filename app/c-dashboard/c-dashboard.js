'use strict';

angular.module('myApp.c-dashboard', ['ngRoute','ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/c-dashboard', {
		templateUrl: 'c-dashboard/c-dashboard.html',
		controller: 'C-dashboardCtrl'
  	});
}])
.controller('C-dashboardCtrl', ['$scope','$http','loginService','cview',function($scope, $http, loginService, cview) {

	var apiKey = 'AIzaSyC3qfqVy5w7GstJFiLMSeqj5LukPtjUC9g';
	var scopes = 'https://www.googleapis.com/auth/calendar';		
	$scope.eventSources = [];
	$scope.message = 'Welcome to FV Tax Prep.  Please be patient as the site continues to be developed.';
	
	$scope.getHome = function(){
		return cview.getHome();
	};

	$scope.getAppt = function(){		
		return cview.getAppt();
	};

	$scope.getInfo = function(){
		return cview.getInfo();
	};

	$scope.getReturns = function(){
		return cview.getReturns();
	};

	$scope.getFeedback = function(){
		return cview.getFeedback();
	};

	$scope.logout=function(){
		loginService.logout();
	};  

	$scope.shown = function(){
		console.log('test');
		$('#calendar').fullCalendar('render');
	};

	$scope.uiConfig = {
	  	calendar:{
			editable: true,
			googleCalendarApiKey: apiKey,
			events: { url: "https://www.google.com/calendar/feeds/fvtaxprep%40gmail.com/public/full"},
			header:{
			 	left: 'month agendaWeek agendaDay',
			  	center: 'title',
			  	right: 'today prev,next'
				},
			eventRender: function( event, element, view ) {				 
			     if (event.title == "Closed") {
			         element.css('background', 'red');
			     }
			}
			//dayClick: $scope.alertEventOnClick,
			//eventDrop: $scope.alertOnDrop,
			//dayClick : $scope.setCalDate,
			//eventResize: $scope.alertOnResize
	  	}
	};	

	$scope.getCreds = function(){
		$http.post('data/getCreds.php')
    		.success(function(data, status){
    			apiKey = data.apiKey;
    		})
    		.error(function(data, status){
    			console.log('Error');
    		});
    };

	$scope.submit = function(person){
		$http.post('data/updateUser.php', person)
    		.success(function(data, status){
    		})
    		.error(function(data, status){
    			console.log('Error');
    		});
    };

    $scope.getCustomerInfo = function(person){
    	$http.post('data/getCustomerInfo.php', person)
    		.success(function(data, status){    			
    			$scope.person = data;
    		})
    		.error(function(data, status){
    			console.log('Error');
    		});
    };

    $scope.submitFeedback = function(comment){
    	var message = {};
    	message.text = comment;
    	message.sender = $scope.user;

    	$http.post('data/addComment.php', message)
    		.success(function(data, status){
    			bootbox.alert('Thank you for your feedback.  Your input is appreciated',function(){});
    			cview.setView('home');
    		})
    		.error(function(data, status){
    			console.log('Error');
    		});
    };
    
    $scope.person = {};
    $scope.user = loginService.getUser();
    $scope.getCustomerInfo($scope.user);
	
}]);