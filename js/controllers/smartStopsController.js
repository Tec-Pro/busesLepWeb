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
          data[i].Origen = data[i].Origen.substr(data[i].Origen.indexOf("De") + 2 );
          var cities = data[i].Localidades.split(" - ");
          //cities.pop();
          //cities.shift();
          var rep = cities.toString();
          if (rep.length != 0){
            data[i].Localidades = cities.toString().replace(/,/g, " - ");
          } else {
            data[i].Localidades = "Directo"
          }
        }
        $scope.arrivals = data;  
      })
    } else if ($scope.type == 1){
        wsService["callService"](wsdl_url, urn, "HorariosProximaSalida", p, true).then(function(data){
        for (var i = data.length - 1; i >= 0; i--) {
          data[i].destino = data[i].destino.substr(data[i].destino.indexOf("A")+2);
          data[i].SalidaEstimada = data[i].SalidaEstimada.substr(0,data[i].SalidaEstimada.indexOf("Hs"));
          var cities = data[i].Localidades.split(" - ");
          //cities.pop();
          //cities.shift();
          var rep = cities.toString();
          if (rep.length != 0){
            data[i].Localidades = cities.toString().replace(/,/g, " - ");
          } else {
            data[i].Localidades = "Directo"
          }
        }
        $scope.departures = data;
      })
    }      
  } 
  
  caller();
  setInterval(caller, 60000);
  setInterval(interval, 55000);

  function interval(){
    var length = 0;
    if ($scope.arrivals != undefined) {
      length = $scope.arrivals.length
    } else if ($scope.departures != undefined){
      length = $scope.departures.length
    }
    if ($scope.amount != undefined){
      if ($scope.begin+parseInt($scope.amount) >= length){
        $scope.begin = 0;
      } else {
        $scope.begin = $scope.begin + parseInt($scope.amount);
      }
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