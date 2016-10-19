angular.module('app')
.controller('SmartStopsCtrl', ['$scope','wsService', function($scope,wsService){

	$scope.arrivals = [{
			arrival_time: "15:00",
			from: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			arrival_time: "15:00",
			from: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			arrival_time: "15:00",
			from: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			arrival_time: "15:00",
			from: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			arrival_time: "15:00",
			from: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			arrival_time: "15:00",
			from: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
	}];

	$scope.departures = [{
			departure_time: "15:00",
			destination: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			departure_time: "15:00",
			destination: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			departure_time: "15:00",
			destination: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			departure_time: "15:00",
			destination: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			departure_time: "15:00",
			destination: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
		},{
			departure_time: "15:00",
			destination: "Córdoba",
			company: "Buses Lep",
			platform: "15",
			bus: "5"
	}];
}]);