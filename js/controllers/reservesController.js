angular.module('app')
.controller('ReservesCtrl', function($scope, $location, localStorageService, wsService){
  
    var wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
    var urn = 'LepWebServiceIntf-ILepWebService';
    var service_parameters = [
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

    $scope.reserves = [];
    $scope.purchases = [];

	wsService.callService(wsdl_url, urn, "ListarMisReserva",service_parameters).then(function(response){
	  //alert(JSON.stringify(response));
    $scope.reserves = response;
	});
  wsService.callService(wsdl_url, urn, "ListarMisCompras",service_parameters).then(function(response){
    $scope.purchases = response;
  });
  
  $scope.cancelReserve = function (fecha) {
        var cancel_parameters = [
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
            name: "DNI",
            type: "int",
            value: $scope.user.dni.toString()
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
        wsService.callService(wsdl_url, urn, "AnularReservas", cancel_parameters).then(function(response){
          //alert(JSON.stringify(response));
          if (response != 1){
                alert("No se ha podido cancelar la reserva");
          }
        });
    };

});