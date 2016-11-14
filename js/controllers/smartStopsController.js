angular.module('app')
.controller('SmartStopsCtrl', ['$scope','wsService', '$routeParams', function($scope,wsService, $routeParams){

	wsdl_url = 'https://webservices.buseslep.com.ar/WebServices/WSHorariosProximaSalidayArribos.dll/soap/ILWService';
  urn = 'LepWebServiceIntf-ILWService';	

  $scope.type = $routeParams.type;
  var id = $routeParams.id;
  $scope.header = $routeParams.header == 1;
  $scope.amount = $routeParams.amount;
  $scope.begin = 0;

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

  function caller(){
    if ($scope.type == 0){      
      wsService["callService"](wsdl_url, urn, "HorariosProximosArribos", p, true).then(function(data){
        
        for (var i = data.length - 1; i >= 0; i--) {
          var cities = data[i].Localidades.split(" - ");
          cities.pop();
          cities.shift();
          var rep = cities.toString();
          data[i].Localidades = cities.toString().replace(/,/g, " - ");
        }
        $scope.arrivals = data;  
      })
    } else if ($scope.type == 1){
        wsService["callService"](wsdl_url, urn, "HorariosProximaSalida", p, true).then(function(data){
        
        for (var i = data.length - 1; i >= 0; i--) {
          var cities = data[i].Localidades.split(" - ");
          cities.pop();
          cities.shift();
          var rep = cities.toString();
          data[i].Localidades = cities.toString().replace(/,/g, " - ");
        }
        $scope.departures = data;
        
      })
    }      
  } 
  
  caller();
  setInterval(caller, 15000);
  setInterval(interval, 14000);

  function interval(){
    console.log($scope.begin);
    var length = 0;
    if ($scope.arrivals != undefined) {
      length = $scope.arrivals.length
    } else if ($scope.departures != undefined){
      length = $scope.departures.length
    }
    console.log(length);
    if ($scope.begin+parseInt($scope.amount) >= length){
      $scope.begin = 0;
    } else {
      $scope.begin = $scope.begin + parseInt($scope.amount);
    }
  }

  function splitter(data){
    if ($scope.type ==0){
      data = data.subStr(data.indexOf(" ") + 1);
    } else if ($scope.type == 1){
      data = data.subStr(data.indexOf(" ")+1);
    }
  }

}]);