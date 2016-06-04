angular.module('app').controller('ToursController', function ($scope, $location){

  	$scope.tours = [
	    { origin: 'Cordoba', destination: 'Sta Rosa de Calamuchita', 'cities':[{name: "Va. Gral Belgrano"}]},
	    { origin: 'Sta Rosa de Calamuchita', destination: 'Amancay', 'cities':[{name: "El torreon"}, {name: "San Ignacio"}, {name: "Amboy"}]},
	    { origin: 'Va. Gral Belgrano', destination: 'Va. Ciudad Parque', 'cities':[{name: "Los Reartes"}]},
  	];

 });