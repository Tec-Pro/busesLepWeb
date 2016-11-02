angular.module('app')
.controller('ReservesCtrl', ['$scope', '$location', '$filter', '$anchorScroll', 'localStorageService', 'wsService', function($scope, $location, $filter, $anchorScroll, localStorageService, wsService){
    $anchorScroll();
    var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
    var urn = 'LepWebServiceIntf-ILepWebService';
    var service_parameters = [
      {
        name: "Dni",
        type: "int",
        value: localStorageService.get("user-lep").dni.toString()
      },
      {
        name: "id_plataforma",
        type: "int",
        value: "3"
      }
    ];

    $scope.ready = false;
    $scope.reserves = [];
    $scope.purchases = [];

  wsService.callService(wsdl_url, urn, "ListarMisReserva",service_parameters, true).then(function(response){
    //alert(JSON.stringify(response));
    $scope.reserves = response;
  });
  wsService.callService(wsdl_url, urn, "ListarMisCompras",service_parameters, true).then(function(response){
    $scope.ready = true;
    $scope.purchases = response;
  });
  
  $scope.go = function ( path ) {
      $location.path( path );
  };

  $scope.cancelReserve = function (fecha) {
        var cancel_parameters = [
          {
            name: "DNI",
            type: "int",
            value: localStorageService.get("user-lep").dni.toString()
          },
          {
            name: "FechaHoraReserva",
            type: "string",
            value: fecha.toString()
          },
          {
            name: "id_plataforma",
            type: "int",
            value: "3"
          }
        ];
        wsService.callService(wsdl_url, urn, "AnularReservas", cancel_parameters, true).then(function(response){
          if (response != 1){
                alert("No se ha podido cancelar la reserva");
          }
          location.reload();
        });
    };

}]);