angular.module('app').controller('ToursController', ['$scope', '$location','wsService', function ($scope, $location, wsService){

	var wsdl_url = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepcGPS.dll/soap/ILepWebService";

	var toursParams = [
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

	$scope.tours = [];
	wsService.callService(wsdl_url, "", "Destinos", toursParams).then(function(response){

		for (var i = 0; i < response.length; i++) {
			splittedOrigAndDest = response[i].DestinoWeb.split("-");
			splittedCities2 = response[i].Recorridos.split(" . ");
			citiesArray = [];
			for (var j = 0 ; j < splittedCities2.length; j++) {
				citiesArray.push({name: splittedCities2[j]});
			};
			
			$scope.tours.push({origin: splittedOrigAndDest[0],destination: splittedOrigAndDest[splittedOrigAndDest.length-1], 'cities': citiesArray, picture: response[i].LinkFoto});
		};
	});

	var pic_modal = document.getElementById('pic_modal');
  	$scope.showPicture =  function(picture){
  		pichtml = document.getElementById('pic');
  		pichtml.src = picture;
  		pic_modal.style.display = "block";
    };

	$scope.hide_modal = function(){
      pic_modal.style.display = "none";
    }
  	/*$scope.tours = [
	    { origin: 'Cordoba', destination: 'Sta Rosa de Calamuchita', 'cities':[{name: "Va. Gral Belgrano"}]},
	    { origin: 'Sta Rosa de Calamuchita', destination: 'Amancay', 'cities':[{name: "El torreon"}, {name: "San Ignacio"}, {name: "Amboy"}]},
	    { origin: 'Va. Gral Belgrano', destination: 'Va. Ciudad Parque', 'cities':[{name: "Los Reartes"}]},
  	];*/

 }]);