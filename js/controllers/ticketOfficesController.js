angular.module('app').controller('TicketOfficesController', ['$scope', '$location', '$anchorScroll', 'wsService', function ($scope, $location, $anchorScroll, wsService){
	$anchorScroll();
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

  	var latitude = 0;
  	var longitude = 0;
  	var map_modal = document.getElementById('map-modal');
  	$scope.showMap =  function(lat,lon){
  		latitude = Number(lat);
  		longitude = Number(lon);   
  		var mapCenter = new google.maps.LatLng(latitude, longitude);
	    map_modal.style.display = "block";
	    var mapOptions = {
	        zoom: 10,
	        center: mapCenter,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
    	var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
    	var marker=new google.maps.Marker({
  			position:mapCenter,
  		});

		marker.setMap(map);
    };

	$scope.hide_modal = function(){
      map_modal.style.display = "none";
    }
  	
}]);