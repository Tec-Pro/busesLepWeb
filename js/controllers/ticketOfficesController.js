angular.module('app').controller('TicketOfficesController', ['$scope', '$location','wsService', function ($scope, $location, wsService){
  	
  	wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
	urn = "LepWebServiceIntf-ILepWebService";
	method = "Boleterias";

	var ticketOfficesParams = [
		{
			name: "userWS",
		    type: "string",
		    value: "UsuarioLep"
		},
		{
			name: "passWS",
		    type: "string",
		    value: "Lep1234"
		}
	];

	$scope.ticketOffices = [];

	wsService.callService(wsdl_url, urn, method, ticketOfficesParams).then(function(offices){
		$scope.ticketOffices = offices;
	});

  	$scope.selectedImg = "img/Boleterias/EjemploFotoBoleteria.png";

  	$scope.goSchedules = function() {
	   // $location.path('/schedules');	 
	    //seat.img = '../img/occupied_seat.png'
	};

	$scope.selectedRow = null;  // initialize our variable to null
  	$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
    	$scope.selectedRow = index;
    	$scope.selectedImg = $scope.ticketOffices[index].linkfoto;
  	}

}]);