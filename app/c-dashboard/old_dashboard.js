'use strict';

angular.module('myApp.c-dashboard', ['ngRoute','ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/c-dashboard', {
		templateUrl: 'c-dashboard/c-dashboard.html',
		controller: 'C-dashboardCtrl'
  	});
}])
.controller('C-dashboardCtrl', ['$scope','loginService',function($scope, loginService) {
	
	var clientId = '207892211754-5ddoocqapv70c72gbnj09ml2hc6qgv1l.apps.googleusercontent.com';
	var apiKey = 'AIzaSyC3qfqVy5w7GstJFiLMSeqj5LukPtjUC9g';
	var scopes = 'https://www.googleapis.com/auth/calendar';


	


	//handleAuthClick();
	// $scope.eventSources = //handleAuthClick();
	// [
	// 		{
	// 			events: [
	// 				{
	// 					title: 'Test1',
	// 					start: new Date('12/29/2015').toISOString(),
	// 					allDay: true,
	// 					backgroundColor: '#ff0000',
	// 				},
	// 				{
	// 					title: "Test2", 
	// 					start: new Date('2015-12-23T14:30:00').toISOString(),
	// 					end: new Date('2015-12-23T16:30:00').toISOString(),
	// 					allDay: false
	// 				}

	// 			]
	// 		}
	// 	];
	// console.log($scope.eventSources);	
	
	$scope.logout=function(){
		loginService.logout();
	};  

//   	function handleAuthClick(event) {
// 		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, makeApiCall());		
//   	}

// 	function makeApiCall() {
// 		var eventList = 
// 		[
// 			{
// 				events: [
// 					{
// 						title: 'Test1',
// 						start: new Date('12/29/2015').toISOString(),
// 						allDay: true,
// 						backgroundColor: '#ff0000',
// 					},
// 					{
// 						title: "Test2", 
// 						start: new Date('2015-12-23T14:30:00').toISOString(),
// 						end: new Date('2015-12-23T16:30:00').toISOString(),
// 						allDay: false
// 					}

// 				]
// 			}
// 		];

// 		gapi.client.load('calendar', 'v3', function() {
// 			var request = gapi.client.calendar.events.list({
// 				'calendarId': 'fvtaxprep@gmail.com',
// 				'timeMin': (new Date()).toISOString(),
// 				'showDeleted': false,
// 				'singleEvents': true,
// 				'maxResults': 10,
// 				'orderBy': 'startTime'
// 	  		});

// 		  	request.execute(function(resp) {

// 				resp.items.forEach(
// 					function(item){
// 				  		var event = {
// 							//id : item.id,
// 							title : item.summary,
// 							start : item.start.dateTime != null ? new Date(item.start.dateTime).toISOString() : new Date(item.start.date).toISOString(),
// 							end : item.end.dateTime != null ? new Date(item.end.dateTime).toISOString() : new Date(item.end.date).toISOString(),
// 							allDay: false
// 					  	}
// 					  	eventList[0].events.push(event);
// 					}
// 				);	
// 			});
// 		})
// 		return eventList;
// 	};
// /*
// 	$scope.setCalDate = function(date, jsEvent, view) {
//             var selectedDate = moment(date).format('YYYY-MM-DD');				    // set dateFrom based on user click on calendar
//             $scope.calendarDate[0].events[0].start = selectedDate;				    // update Calendar event dateFrom
//             $scope.selectedDate = $filter('date')(selectedDate, 'yyyy-MM-dd');		// update $scope.dateFrom
//                 //console.log($scope.calendarDate);
//                 console.log($scope.selectedDate);
// 	};
// */
	$scope.uiConfig = {
	  	calendar:{
			height: 450,
			editable: true,
			googleCalendarApiKey: apiKey,
			events: { url: "https://www.google.com/calendar/feeds/fvtaxprep%40gmail.com/public/basic", title: 'Booked'},
			header:{
			 	left: 'month agendaWeek agendaDay',
			  	center: 'title',
			  	right: 'today prev,next'
				},
			//dayClick: $scope.alertEventOnClick,
			//eventDrop: $scope.alertOnDrop,
			//dayClick : $scope.setCalDate,
			//eventResize: $scope.alertOnResize
	  	}
	};
	//$('#calendar').fullCalendar('refetchEvents')
}]);