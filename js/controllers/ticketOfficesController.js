angular.module('app').controller('TicketOfficesController', ['$scope', '$location', '$anchorScroll', 'wsService', function ($scope, $location, $anchorScroll, wsService){
	$anchorScroll();
  	wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
	urn = "LepWebServiceIntf-ILepWebService";
	method = "Boleterias";

	var rect = document.getElementById("footer").getBoundingClientRect();
	var image_container = document.getElementById("img-container").getBoundingClientRect();
	var body = document.getElementsByTagName("BODY")[0];

	$scope.ticketOffices = [];

	wsService.callService(wsdl_url, urn, method, [], true).then(function(offices){
		$scope.ticketOffices = offices;
		var rect = document.getElementById("footer").getBoundingClientRect();
		var image_container = document.getElementById("img-container").getBoundingClientRect();
		var body = document.getElementsByTagName("BODY")[0];
	});

  	$scope.selectedImg;

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
	        zoom: 15,
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
  
  var breakpoint;
	function check_width(){
		if (window.innerWidth >= 2400){
			breakpoint = 3100;
		}
		else if (window.innerWidth >= 1300) {
			breakpoint = 3150;
		} else {
			breakpoint = 3250;
		}
	}

	check_width();
    
	onscroll = function(){
		if ($location.path() === '/ticketOffices'){
			reposition();
		}
	}

	function reposition() {
		if (window.scrollY > breakpoint){
			document.getElementById('img-container').className = 'col-md-offset-1 col-md-3 hidden-xs hidden-sm absolute-img absolute-img-bottom';
		} else {
			if (window.scrollY > image_container.top) {
				document.getElementById('img-container').className = 'col-md-offset-1 col-md-3 hidden-xs hidden-sm fixed-img';
			} else {
				document.getElementById('img-container').className = 'col-md-offset-1 col-md-3 hidden-xs hidden-sm absolute-img';
			}
		}
	}
}]);