angular.module('app').controller('ScheduleController', ['$scope', '$location', '$anchorScroll', 'tripService', 'scheduleService', '$filter', 'wsService', function ($scope, $location, $anchorScroll, tripService, scheduleService, $filter, wsService){
	var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
	var wsdl_url_wsConGps = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";
    var urn = 'LepWebServiceIntf-ILepWebService';

    var loading_modal = document.getElementById('sched-modal');

	var display_loading_modal = function() {
		loading_modal.style.display = "block";
	}

	var hide_loading_modal = function() {
		loading_modal.style.display = "none";
	}
	$anchorScroll();

    getReturnSchedules = function(){
		var listarHorarios_parameters2 = [
          {
            name: "userWS",
            type: "string",
            value: "UsuarioLep"
          },
          {
            name: "passWS",
            type: "string",
            value: "Lep1234"
          },
          {
            name: "IdLocalidadOrigen",
            type: "int",
            value: $scope.origin_id
          },
          {
            name: "IdLocalidadDestino",
            type: "int",
            value: $scope.destination_id
          },
          {
            name: "Fecha",
            type: "string",
            value: $scope.departure_trip.return_date.format("YYYYMMDD")
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
        display_loading_modal();
        wsService.callService(wsdl_url_wsConGps, urn, "ListarHorarioscGPS", listarHorarios_parameters2).then(function(schedules){ //"ListarHorarioscGPS"
        	hide_loading_modal();
			if (schedules.length > 0){
				$scope.schedules = schedules;
				$scope.min_return_price = Math.min.apply(Math, schedules.map(function(s){return s.precioVuelta}));
				$scope.max_return_price = Math.max.apply(Math, schedules.map(function(s){return s.precioVuelta}));
			} else {
				window.alert("No existen viajes para esa fecha");
			}
		}, function(reason){
		    if (reason == "timeout"){
		        alert("Tiempo de respuesta agotado, verifique su conexión o intente más tarde.");
		    } else {
		    	alert("Error: "+reason+". Por favor, intente más tarde.");
		    }
		    hide_loading_modal();
    	});
	};

	$scope.departure_trip = tripService.getDepartureTrip();
	$scope.schedules = tripService.getSchedules();
	$scope.min_go_price = Math.min.apply(Math, $scope.schedules.map(function(s){return s.precio}));
	$scope.max_go_price = Math.max.apply(Math, $scope.schedules.map(function(s){return s.precio}));


  	$scope.isRoundTrip = $scope.departure_trip.round_trip === 1;

  	if ($scope.isRoundTrip){
  		$scope.min_return_price = Math.min.apply(Math, $scope.schedules.map(function(s){return s.precioVuelta}));
		$scope.max_return_price = Math.max.apply(Math, $scope.schedules.map(function(s){return s.precioVuelta}));
  	}

	if($scope.schedules == undefined || $scope.departure_trip == undefined){
        $location.path('/');
    }
	$scope.origin = $scope.departure_trip.origin_name;
	$scope.destination = $scope.departure_trip.destination_name;
	$scope.origin_id = $scope.departure_trip.origin_id;
	$scope.destination_id = $scope.departure_trip.destination_id;
	$scope.departure_date = $scope.departure_trip.departure_date;

	$scope.titleLabel = "Ida";

	if(scheduleService.getIsReturnTrip()){
		$scope.origin = $scope.departure_trip.destination_name;
		$scope.destination = $scope.departure_trip.origin_name;
		$scope.departure_date = $scope.departure_trip.return_date;
		$scope.origin_id = $scope.departure_trip.destination_id;
		$scope.destination_id = $scope.departure_trip.origin_id;
		$scope.titleLabel = "Vuelta";
		getReturnSchedules();
	}


	$scope.checkTravel = function(index){
		parameters = [
			{
				name: "userWS",
				type: "string",
				value: "UsuarioLep"
			},
			{
				name: "passWS",
				type: "string",
				value: "Lep1234"
			},
			{
				name: "Id_Empresa",
				type: "int",
				value: $scope.schedules[index].Id_Empresa
			},
			{
				name: "Id_destino",
				type: "int",
				value: $scope.schedules[index].id_destino
			}, 
			{	
				name: "Cod_Horario",
				type: "int",
				value: $scope.schedules[index].cod_horario
			}
		];
		display_loading_modal();
		$scope.travels = [];
	    wsService.callService(wsdl_url_wsConGps, urn, "ConsultarRecorridoServicio", parameters).then(function(response){
			$scope.travels = response;
			display_travel_modal();
			hide_loading_modal();
		})
	}


	$scope.params = {
      today: moment(),
      departureDate: $scope.departure_date,
      returnDate: moment()
    };

	$scope.$watch('params.departureDate', function(date){
		if($scope.params.departureDate.isSame == undefined)
			return;
    	if (!$scope.params.departureDate.isSame($scope.departure_date)){
	        var listarHorarios_parameters = [
		        {
		            name: "userWS",
		            type: "string",
		            value: "UsuarioLep"
		        },
		        {
		            name: "passWS",
		            type: "string",
		            value: "Lep1234"
		        },
		        {
		            name: "IdLocalidadOrigen",
		            type: "int",
					value: $scope.origin_id
		        },
		        {
		            name: "IdLocalidadDestino",
		            type: "int",
					value: $scope.destination_id
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
        	display_loading_modal();
	        wsService.callService(wsdl_url_wsConGps, urn, "ListarHorarioscGPS", listarHorarios_parameters).then(function(schedules){
				hide_loading_modal();
				if (schedules.length > 0){
					$scope.schedules = schedules;
					$scope.min_go_price = Math.min.apply(Math, $scope.schedules.map(function(s){return s.precio}));
					$scope.max_go_price = Math.max.apply(Math, $scope.schedules.map(function(s){return s.precio}));
				} else {
					window.alert("No existen viajes para esa fecha");
				}
			}, function(reason){
			    if (reason == "timeout"){
			        alert("Tiempo de respuesta agotado, verifique su conexión o intente más tarde.");
			    } else {
			    	alert("Error: "+reason+". Por favor, intente más tarde.");
			    }
			    hide_loading_modal();
    		});
			$scope.departure_date = $scope.params.departureDate;
    	}
    });

	// parametersPrice = [
	// 	{
	// 		name: "userWS",
	// 		type: "string",
	// 		value: "UsuarioLep"
	// 	},
	// 	{
	// 		name: "passWS",
	// 		type: "string",
	// 		value: "Lep1234"
	// 	},
	// 	{
	// 		name: "ID_LocalidadOrigen",
	// 		type: "int",
	// 		value: $scope.origin_id
	// 	},
	// 	{
	// 		name: "ID_LocalidadDestino",
	// 		type: "int",
	// 		value: $scope.destination_id
	// 	}
	// ]
	// display_loading_modal();
	// wsService.callService(wsdl_url_wsConGps, urn, 'ObtenerTarifaTramo', parametersPrice).then(function(tarifas){
	// 	hide_loading_modal();
	// 	console.log(tarifas);
 // 		result = tarifas.split("-");
 // 		$scope.goPrice = Number(result[0].trim().substring(7));
 // 		$scope.roundTripPrice = Number(result[1].trim().substring(13));
 // 	}, function(reason){
	//     if (reason == "timeout"){
	//         alert("Tiempo de respuesta agotado, verifique su conexión o intente más tarde.");
	//     } else {
	//     	alert("Error: "+reason+". Por favor, intente más tarde.");
	//     }
	//     hide_loading_modal();
 //    });

	//riocuarto es id=10 cordoba plaza es id=1
	//Date picker options
    $scope.dpOpts = {
        locale: {
          format: "DD/MM",
          daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        //If it's a single date picker or not.
        singleDatePicker: true,
        //If month dropdowns should be shown.
        showDropdowns: true
    };

  	$scope.goSummary = function(index) {
		if($scope.departure_trip.round_trip != 0){
			if(!scheduleService.getIsReturnTrip()){
				setScheduleGo(index);
				//tripService.saveTripPrice($scope.schedules[index].precio);
				scheduleService.setIsReturnTrip(true);
				location.reload();
			}
			else{
				setScheduleReturn(index);
        		//scheduleService.setRoundTripPrice($scope);
				//tripService.saveTripPrice($scope.schedules[index].precio);
				$location.path('/summary');
			}
		}
		else{
			//tripService.saveTripPrice($scope.schedules[index].precio);
			setScheduleGo(index);
			$location.path('/summary');
		}
	};

	setScheduleGo = function(index){
		var selectedSchedule = $scope.schedules[index];
		/*scheduleService.setScheduleFirstDepartureDatetime(selectedSchedule.fechahora);
		scheduleService.setScheduleFirstArrivalDatetime(selectedSchedule.FechaHoraLlegada);
		scheduleService.setSchedulePrice($scope.goPrice);
		scheduleService.setScheduleStatus(selectedSchedule.ServicioPrestado);
		scheduleService.setScheduleDuration(selectedSchedule.DemoraViaje);
		scheduleService.setScheduleDestinationId($scope.departure_trip.destination_id);
		scheduleService.setScheduleOriginId($scope.departure_trip.origin_id);
		scheduleService.setScheduleDestinationName($scope.departure_trip.destination_name);
		scheduleService.setScheduleOriginName($scope.departure_trip.origin_name);*/
		scheduleService.saveSchedule(selectedSchedule);
	};

	setScheduleReturn = function(index){
		var selectedSchedule = $scope.schedules[index];
		scheduleService.saveScheduleReturn(selectedSchedule);
	};

	$scope.check_available = function(schedule){
		return schedule.ServicioPrestado === 'disponible';
	}

	$scope.range = function(min, max, step){
		    step = step || 1;
		    var input = [];
		    for (var i = min; i <= max; i += step) input.push(i);
		    return input;
  	};

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

    var travel_modal = document.getElementById('travel-modal');

    var display_travel_modal = function(){
    	travel_modal.style.display = "block";
    }

    $scope.hide_travel_modal = function(){
    	travel_modal.style.display = "none";
    }

}]);
