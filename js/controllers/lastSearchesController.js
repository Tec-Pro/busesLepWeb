angular.module('app').controller('LastSearchesController', function ($scope, $location){
  	$scope.searches = [
	    { goingDate: '10/10/2016', backDate: '07/03/2202', goingCity: 'Almafuerte', backCity: 'Rio Cuarto', status: true},
	    { goingDate: '20/20/2010', backDate: '23/10/3303', goingCity: 'Almafuerte', backCity: 'Rio Cuarto', status: true},
	    { goingDate: '30/30/2020', backDate: '12/04/2123', goingCity: 'Almafuerte', backCity: 'Rio Cuarto', status: true},
	    { goingDate: '10/10/2016', backDate: '07/03/2202', goingCity: 'Almafuerte', backCity: '', status: false},
	    { goingDate: '20/20/2010', backDate: '23/10/3303', goingCity: 'Cordoba', backCity: 'Rio Cuarto', status: true},
	    { goingDate: '30/30/2020', backDate: '12/04/2123', goingCity: 'Almafuerte', backCity: 'Rio Cuarto', status: false},
	    { goingDate: '10/10/2016', backDate: '07/03/2202', goingCity: 'Berrotaran', backCity: 'Rio Cuarto', status: true},
	    { goingDate: '20/20/2010', backDate: '23/10/3303', goingCity: 'Almafuerte', backCity: '', status: false},
	    { goingDate: '30/30/2020', backDate: '12/04/2123', goingCity: 'Cordoba', backCity: 'Rio Cuarto', status: true}
  	];

  	$scope.goSchedules = function() {
	    $location.path('/schedules');	 
	    //seat.img = '../img/occupied_seat.png'
	};

});