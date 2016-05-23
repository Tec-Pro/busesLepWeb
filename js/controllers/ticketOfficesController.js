angular.module('app').controller('TicketOfficesController', function ($scope, $location){
  	$scope.ticketOffices = [
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: 'img/Boleterias/EjemploFotoBoleteria.png'},
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: "img/Empresa/Confort_imagen2.png"},
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: 'img/Boleterias/EjemploFotoBoleteria.png'},
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: 'img/Empresa/Confort_imagen1.png'},
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: 'img/Empresa/Confort_imagen3.png'},
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: 'img/Boleterias/EjemploFotoBoleteria.png'},
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: 'img/Empresa/Confort_imagen2.png'},
	    { location: 'Adelia Maria', address: 'Terminal de Omnibus', phone: '03585 421541 / 422300', img: 'img/Boleterias/EjemploFotoBoleteria.png'}
  	];

  	$scope.selectedImg = "img/Boleterias/EjemploFotoBoleteria.png";

  	$scope.goSchedules = function() {
	   // $location.path('/schedules');	 
	    //seat.img = '../img/occupied_seat.png'
	};

	$scope.selectedRow = null;  // initialize our variable to null
  	$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
    	$scope.selectedRow = index;
    	$scope.selectedImg = $scope.ticketOffices[index].img;
  	}

});