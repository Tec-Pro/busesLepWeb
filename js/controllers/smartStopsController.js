angular.module('app')
.controller('SmartStopsCtrl', ['$scope','wsService', '$routeParams', function($scope,wsService, $routeParams){

	wsdl_url = 'https://webservices.buseslep.com.ar/WebServices/WSHorariosProximaSalidayArribos.dll/soap/ILWService';
  urn = 'LepWebServiceIntf-ILWService';	

  $scope.type = $routeParams.type;
  var id = $routeParams.id;

  var p = [
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

  function splitter(data){
    if ($scope.type ==0){
      data = data.subStr(data.indexOf(" ") + 1);
    } else if ($scope.type == 1){
      data = data.subStr(data.indexOf(" ")+1);
    }
  }

  function caller(){
		if ($scope.type == 0){
      wsService["callService"](wsdl_url, urn, "HorariosProximosArribos", p, true).then(function(data){
        data.map(splitter(data.Origen));
			  $scope.arrivals = data;	
        console.log(data);
      })
		}	else if ($scope.type == 1){
      wsService["callService"](wsdl_url, urn, "HorariosProximaSalida", p, true).then(function(data){
			 $scope.departures = data;
       console.log(data);
      })
		}      
	}	
  
  caller();
  setInterval(caller, 60000);
}]);