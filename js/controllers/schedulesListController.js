(function(){

	var schedulesList = angular.module('schedulesList', []);

	schedulesList.controller('ScheduleController', function(){
  		this.products = schedules;
	});

	 var schedules = [
	    { departureDate: '10/10/2016', arrivalDate: '07/03/2202', departureTime: '18:00', arrivalTime: '20:00', status: true},
	    { departureDate: '20/20/2010', arrivalDate: '23/10/3303', departureTime: '07:00', arrivalTime: '12:00', status: true},
	    { departureDate: '30/30/2020', arrivalDate: '12/04/2123', departureTime: '13:00', arrivalTime: '21:00', status: true},
	    { departureDate: '10/10/2016', arrivalDate: '07/03/2202', departureTime: '18:00', arrivalTime: '20:00', status: false},
	    { departureDate: '20/20/2010', arrivalDate: '23/10/3303', departureTime: '07:00', arrivalTime: '12:00', status: true},
	    { departureDate: '30/30/2020', arrivalDate: '12/04/2123', departureTime: '13:00', arrivalTime: '21:00', status: false},
	    { departureDate: '10/10/2016', arrivalDate: '07/03/2202', departureTime: '18:00', arrivalTime: '20:00', status: true},
	    { departureDate: '20/20/2010', arrivalDate: '23/10/3303', departureTime: '07:00', arrivalTime: '12:00', status: false},
	    { departureDate: '30/30/2020', arrivalDate: '12/04/2123', departureTime: '13:00', arrivalTime: '21:00', status: true}
  	];

})();