angular.module('app').controller('ToursController', ['$scope', '$location', '$anchorScroll', 'wsService', function ($scope, $location, $anchorScroll, wsService){
	$anchorScroll();
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
	$scope.picture = "";
	wsService.callService(wsdl_url, "", "Destinos", toursParams).then(function(response){

		for (var i = 0; i < response.length; i++) {
			splittedCities2 = response[i].Recorridos.split(" . ");
			citiesArray = [];
			for (var j = 0 ; j < splittedCities2.length; j++) {
				citiesArray.push({name: splittedCities2[j]});
			};
			
			$scope.tours.push({name: response[i].DestinoWeb, 'cities': citiesArray, picture: response[i].LinkFoto});
		};
	});

	var pic_modal = document.getElementById('pic_modal');
  	$scope.showPicture =  function(picture){
  		//console.log(picture);	
  		$scope.picture = picture;
  		pichtml = document.getElementById('pic');
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