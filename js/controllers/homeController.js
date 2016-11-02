angular.module('app')
.controller('HomeCtrl', ['$scope', '$sce', '$location', '$window', '$anchorScroll', 'localStorageService', 'wsService', 'tripService', 'companyService', function($scope, $sce, $location, $window, $anchorScroll, localStorageService, wsService, tripService, companyService){
    $anchorScroll();
    var wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
    var wsdl_url_web = "https://webservices.buseslep.com.ar:443/WebServices/WSLepPaginaWeb.dll/soap/IWSLepPaginaWeb";
    var urn = '';

    $scope.home_news = [];

    var drp = $('#departureDate');

    $scope.show_departure = function(){

    }

    $scope.home_images = [];

    wsService.callService(wsdl_url_web, urn, "ImagenesHome", [], true).then(function(imgs){
    	$scope.home_images = imgs;
    });

    wsService.callService(wsdl_url_web, urn, "Noticias", [], true).then(function(news){
    	$scope.home_news = news;
    })

    $scope.dropdown_toggle = function(){
        $('#origin').dropdown("toggle");
        ////console.log($(".dropdown-toggle"));
    }

    sessionStorage.clear();
    //Date picker options
    $scope.dpOpts = {
        locale: {
          format: "DD/MM/YYYY",
          daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        //If it's a single date picker or not.
        singleDatePicker: true,
        //If month dropdowns should be shown.
        showDropdowns: true
    };
    var lastSearches = localStorageService.get("last-searches");
    if (lastSearches != null){ // it isn't the first search
      $scope.searches = JSON.parse(lastSearches);
      for (i = 0; i < $scope.searches.length; i++){
        if($scope.searches[i] != null){
          if(moment().isAfter(moment($scope.searches[i].goingDate, moment.ISO_8601),'day')){
            $scope.searches.splice(i,1);
            i--;
          }
        }
      } 
    }
    else{
      $scope.searches = [];
    }
    $scope.searches.length = 6; //Only last 6 searches are stored
    //By default, the destinationpicker is disabled.
    $scope.destinationDisabled = true;

    //Before the departure date is set, the return date selector is disabled.
    $scope.returnDateDisabled = true;

    //By default, is a one way trip.
    $scope.roundTrip = false;

    //Current parameters of the trip.
    $scope.params = {
      today: moment(),
      origin: '',
      origin_name: 'Ciudad Origen',
      destination: '',
      destination_name: 'Ciudad Destino',
      departureDate: '',
      returnDate: ''
    };

    $scope.origin_search = '';
    $scope.destination_search = '';
    
  var localidadesDesde_parameters = [
    {
      name: "id_plataforma",
      type: "int",
      value: "3"
    }
  ]
  $scope.origins = [];

  $scope.clear_return = function(){
    $scope.params.returnDate= '';
  }

  $scope.load_origins = function(){

    $scope.origin_search = '';
    $scope.destination_search = '';
    $scope.destinations = '';
    if($window.innerWidth >= 768){
      $anchorScroll('sticky-element');
    } else {
      $anchorScroll('search-container');
    }
    //Call the web service and update the origins from the scope.
    if ($scope.origins.length == 0){
      display_modal();
      wsService.callService(wsdl_url, urn, "LocalidadesDesdeWeb",localidadesDesde_parameters, true).then(function(origins){
        hide_modal();
        $scope.origins = origins;
      }, function(reason){
        if (reason == "timeout"){
          alert("Tiempo de respuesta agotado, verifique su conexión o intente más tarde.");
        } else {
          alert("Error: "+reason+". Por favor, intente más tarde.");
        }
        hide_modal();
      });
    }
  };

  $scope.$watch('origin_search', function(){
    if (!($scope.origin_search == undefined)){
      if ($scope.origin_search.length >= 1 ){
        origin = $('#origin');
        if (origin.attr("aria-expanded") == "false"){
          origin.dropdown('toggle');
        } 
      }
    }
  });

  $scope.$watch('destination_search', function(){
    if (!($scope.destination_search == undefined)){
      if ($scope.destination_search.length >= 1 ){
        destination = $('#destination');
        if (destination.attr("aria-expanded") == "false"){
          destination.dropdown('toggle');
        } 
      }
    }
  })
    //Function that check the availables destinations whenever the trip origin changes.
    $scope.checkDestinations = function(origin){
        $scope.params.origin = origin;
        $scope.origin_search = origin.Localidad;
      	//Enable the destination picker if the origin has been set.
      	$scope.destinationDisabled = ($scope.params.origin === '');
      	//Once the origin has been set, reload the possible destinations.
      	if ($scope.params.origin != ''){
          $scope.params.origin_name = origin.Localidad;
        	//Call asynchronously the web service, through wsService, when it's ready, update the destinations in the scope.
        	// var id_localidad = $scope.params.origin.ID_Localidad.toString();
          var getDestinations_params = [
            {
              name: "IdLocalidadOrigen",
              type: "int",
              value: $scope.params.origin.ID_Localidad.toString()
            },
            {
              name: "id_plataforma",
              type: "int",
              value: "3"
            }
          ];
          display_modal();
          wsService.callService(wsdl_url,urn,"Localidadeshasta",getDestinations_params, true).then(function(destinations){
              $scope.destinations = destinations;
              hide_modal();
      	    }, function(reason){
              if (reason == "timeout"){
                alert("Tiempo de respuesta agotado, verifique su conexión o intente más tarde.");
              } else {
                alert("Error: "+reason+". Por favor, intente más tarde.");
              }
              hide_modal();
          });
		  	tripService.setTripOriginId($scope.params.origin.ID_Localidad);
		  	tripService.setTripOriginName($scope.params.origin.Localidad);
      	} else {
        	//If the origin is empty, set default value.
          $scope.params.origin_name = 'Ciudad Origen';
      	}
        $scope.params.destination = '';
        $scope.params.destination_name = 'Ciudad Destino';
    };
	
  	$scope.setDestinationData = function(destination){
      $scope.destination_search = destination.hasta;
      $scope.params.destination = destination;
	  	if ($scope.params.destination != ''){
        $scope.params.destination_name = destination.hasta;
		    tripService.setTripDestinationId($scope.params.destination.id_localidad_destino);
		    tripService.setTripDestinationName($scope.params.destination.hasta);
		  } else {
        $scope.params.destination_name = 'Ciudad Destino';
        tripService.setTripDestinationId('');
        tripService.setTripDestinationName('');
      }
    };

    $scope.go = function ( path ) {
      $location.path( path );
    };

    //Call the search web service and
    $scope.goSearch = function(){
      //Get the dates from the datepicker.
      sessionStorage.clear();
      var a = $scope.params.departureDate;
      var b = $scope.params.returnDate;
      //a must be != null, b can be null.
      //if is a round trip, and b (The return date) is after the a (The departure date) alert the user.
      if (a === ''){
        window.alert("Por favor elija una fecha de salida");
      } else {
        if ((b != '') && (a.isAfter(b, 'day'))) {
            	window.alert("La fecha de llegada no puede ser anterior a la de salida");
        } else {
  		  //Else redirect to schedules and set the data in the service.
  				if (b != ''){
  					tripService.setRoundTrip(1);
  					tripService.setTripReturn(b);
  				} else {
  					tripService.setRoundTrip(0);
  					tripService.setTripReturn('');
  				}
  				tripService.setTripOriginId($scope.params.origin.ID_Localidad);
  				tripService.setTripOriginName($scope.params.origin.Localidad);
  				tripService.setTripDestinationId($scope.params.destination.id_localidad_destino);
  				tripService.setTripDestinationName($scope.params.destination.hasta);
          tripService.setOriginOffice($scope.params.origin.TieneBoleteria);
          tripService.setDestinationOffice($scope.params.destination.TieneBoleteria);
          ////console.log($scope.params.departureDate);
  				tripService.setTripDeparture($scope.params.departureDate);
  				// tripService.searchTrips($scope.params.origin.ID_Localidad, $scope.params.destination.id_localidad_destino, $scope.params.departureDate.format("YYYYMMDD")).then(function(schedules)
          var listarHorarios_parameters = [
            {
              name: "IdLocalidadOrigen",
              type: "int",
              value: $scope.params.origin.ID_Localidad
            },
            {
              name: "IdLocalidadDestino",
              type: "int",
              value: $scope.params.destination.id_localidad_destino
            },
            {
              name: "Fecha",
              type: "string",
              value: $scope.params.departureDate.format("YYYYMMDD")
            },
            {
              name: "DNI",
              type: "int",
              value: "1"
            },
            {
              name: "id_plataforma",
              type: "int",
              value: "3"
            }          
          ];
          tripService.saveDepartureTrip();
          display_modal();
          wsService.callService(wsdl_url, urn, "ListarHorarioscGPS", listarHorarios_parameters, true).then(function(schedules){ //"ListarHorarioscGPS"
  						hide_modal();
              if (schedules.length > 0){
                var trip = tripService.getDepartureTrip();
                $scope.searches.unshift({ goingDate: trip.departure_date, backDate: trip.return_date, goingCity_id:trip.origin_id, goingCity:trip.origin_name, goingCityOffice: $scope.params.origin.TieneBoleteria, backCity_id:trip.destination_id, backCity:trip.destination_name, status: false});
                localStorageService.set("last-searches",JSON.stringify($scope.searches));
                //guardar aca departure-trip
                //tripService.saveDepartureTrip();
  							tripService.setSchedules(schedules);
                //console.log(schedules);
  							$location.path('/schedules');
  						} else {
  							window.alert("No existen viajes para esa fecha");
  						}
  				}, function(reason){
              if (reason == "timeout"){
                alert("Tiempo de respuesta agotado, verifique su conexión o intente más tarde.");
              } else {
                alert("Error: "+reason+". Por favor, intente más tarde.");
              }
              hide_modal();
          });
        }
      }
    };

    $scope.goSearch2 = function(orig_id,dest_id,orig, orig_office, dest, dDate, rDate){
      //if(moment().isAfter(moment(dDate, moment.ISO_8601),'day')){
      //  alert("Este viaje ya caducó");
      //}
      //else{
        dDate = moment(dDate, moment.ISO_8601).format("YYYY-MM-DD");
        if (rDate != ''){
          tripService.setRoundTrip(1);
          rDate = moment(rDate, moment.ISO_8601).format("YYYY-MM-DD");
          tripService.setTripReturn(rDate);
        } else {
          tripService.setRoundTrip(0);
          tripService.setTripReturn('');
        }
        tripService.setTripOriginId(orig_id.toString());
        tripService.setTripOriginName(orig);
        tripService.setTripDestinationId(dest_id.toString());
        tripService.setTripDestinationName(dest);
        tripService.setOriginOffice(orig_office);
        ////console.log($scope.params.departureDate);
        tripService.setTripDeparture(dDate);
        // tripService.searchTrips($scope.params.origin.ID_Localidad, $scope.params.destination.id_localidad_destino, $scope.params.departureDate.format("YYYYMMDD")).then(function(schedules)
        var listarHorarios_parameters = [
          {
            name: "IdLocalidadOrigen",
            type: "int",
            value: orig_id.toString()
          },
          {
            name: "IdLocalidadDestino",
            type: "int",
            value: dest_id.toString()
          },
          {
            name: "Fecha",
            type: "string",
            value: moment(dDate, moment.ISO_8601).format("YYYYMMDD")
          },
          {
            name: "DNI",
            type: "int",
            value: "1"
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
          }          
        ];
        tripService.saveDepartureTrip();
        //alert(JSON.stringify(tripService.getDepartureTrip()));
        wsService.callService(wsdl_url, urn, "ListarHorarioscGPS", listarHorarios_parameters, true).then(function(schedules){
            if (schedules.length > 0){
              //guardar aca departure-trip
              //tripService.saveDepartureTrip();
              tripService.setSchedules(schedules);
              $location.path('/schedules');
            } else {
              window.alert("No existen viajes para esa fecha");
            }
        });
      //}
    };

    $scope.$watch('params.departureDate', function(date){
      if ($scope.params.departureDate !== ''){
        $scope.returnDateDisabled = false;
      } else {
        $scope.returnDateDisabled = true;
      }
      if ($scope.params.returnDate !== ''){ 
        var a = $scope.params.returnDate;
        var b = date;
        if (a.isBefore(b, 'day')){
          $scope.params.returnDate = date;
        }
      }
    });

    $scope.goCompanyUnits = function(tab){
      companyService.setActiveTab(3);
      companyService.setActiveUnitTab(tab);
      $window.scrollTo(0,0);
      $location.path('/company');
    }

    // Get the modal
    
    var modal = document.getElementById('home-modal');
    

    var display_modal = function(){
      if ($location.path() == "/") {
        modal.style.display = "block";
      }
    }

    var hide_modal = function(){
      if ($location.path() == "/") {
        modal.style.display = "none";
      }
    }

    $scope.load_origins();
}]);
