angular.module('app')
.controller('MainCtrl', function($scope, $location,tripService){



    $.soap({
        url: 'https://webservices.buseslep.com.ar/WebServices/WebServiceLepCEnc.dll',
        namespaceURL: 'urn:LepWebServiceIntf-ILepWebService',
         SOAPAction: 'POST',   
        error: function (soapResponse) {
            alert('that other server might be down...')
        }
    });

    $.soap({
        method: '#LocalidadesDesde',
        SOAPAction: 'POST',   
        data: {
            userWS:"UsuarioLep", 
            passWS:"Lep1234",
            id_plataforma: 1
        },
        success: function (soapResponse) {
            alert('GOOOOOOD')
        }
    });


    $scope.today = moment();
    $scope.departureDate = moment();
    $scope.arrivalDate = moment();

    $scope.opts = {
        locale: {
            format: "DD/MM/YYYY",
            daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

        },
        singleDatePicker: true
    };

    $scope.params = {
        current: new Date(),
        origin: '',
        destination: '',
        departure: new Date(),
        arrival: '',
        amount: ''
    };





//    tripService.getOrigins();

    //console.log($scope.response);

    $scope.roundTrip = false;

    $scope.goSearch = function(){
        $location.path('/schedules');
        console.log($scope.roundTrip);
        if ($scope.roundTrip === true){
            tripService.setRoundTrip(1);
        } else {
            tripService.setRoundTrip(0);
        }
        console.log(tripService.getRoundTrip());
    };
});


