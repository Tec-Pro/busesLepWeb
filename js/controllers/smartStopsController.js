angular.module('app')
.controller('SmartStopsCtrl', ['$scope','wsService', '$routeParams', function($scope,wsService, $routeParams){

	wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WSHorariosProximaSalidayPlataforma.dll/soap/ILWService';
  urn = 'LepWebServiceIntf-ILWService';	

  $scope.type = $routeParams.type;
  var id = $routeParams.id;

  var p = [{
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
            name: "id_Boleteria",
            type: "int",
            value: id
        },
        {
            name: "id_plataforma",
            type: "int",
            value: "3"
        }
  ];

  function caller(){
	  wsService["callService"](wsdl_url, urn, "HorariosProximaSalida", p).then(function(data){
	  		if ($scope.type == 0){
  				$scope.arrivals = data;	
  			}	else if ($scope.type == 1){
					$scope.departures = data;
  			}
			}
		);	
  }
  caller();
  setInterval(caller, 60000);
}]);