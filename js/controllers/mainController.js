angular.module('app')
.controller('MainCtrl', function($scope, $location,tripService){

    $scope.dpOpts = {
        locale: {
            format: "DD/MM/YYYY",
            daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

        },
        singleDatePicker: true,
        showDropdowns: true
    };

    $scope.params = {
        today: moment(),
        origin: '',
        destination: '',
        departureDate: moment(),
        arrivalDate: moment(),
        amount: ''
    };

    $scope.checkDestinations = function(){
        $scope.destinationDisabled = !($scope.params.origin === '')
    };

    $scope.print = function(){
        console.log($scope.params.origin);
    };

    // tripService.getOriginsAngularWSDL().then(function(response){
    //     console.log("Angular WSDL");
    //     console.log(response);
    // });

    // tripService.getOriginsAngularSOAP().then(function(response){
    //     console.log("Angular SOAP");
    //     console.log(response);
    // })

    // console.log("Get Origins WSDL");
    // tripService.getOriginsWSDL();

    console.log("Get Origins SOAP");
    tripService.getOriginsSOAP();

    $scope.origins = 
        [{"SoloEncomiendas":0,"Localidad":"Adelia Maria","ID_Localidad":33},
         {"SoloEncomiendas":0,"Localidad":"Alcira Gigena","ID_Localidad":9},
         {"SoloEncomiendas":0,"Localidad":"Almafuerte","ID_Localidad":4}
        ];
    $scope.destinationEnabled = false;
    // $scope.origins = 
    //     [{"SoloEncomiendas":0,"Localidad":"Adelia Maria","ID_Localidad":33},
    //     {"SoloEncomiendas":0,"Localidad":"Alcira Gigena","ID_Localidad":9},
    //     {"SoloEncomiendas":0,"Localidad":"Almafuerte","ID_Localidad":4},
    //     {"SoloEncomiendas":0,"Localidad":"Arias","ID_Localidad":68},
    //     {"SoloEncomiendas":0,"Localidad":"Berrotaran","ID_Localidad":5},
    //     {"SoloEncomiendas":0,"Localidad":"Chazon","ID_Localidad":57},
    //     {"SoloEncomiendas":0,"Localidad":"Cordoba Plaza","ID_Localidad":1},
    //     {"SoloEncomiendas":0,"Localidad":"Cordoba Terminal","ID_Localidad":47},
    //     {"SoloEncomiendas":0,"Localidad":"Corral de Bustos","ID_Localidad":63},
    //     {"SoloEncomiendas":0,"Localidad":"Despeñaderos","ID_Localidad":6},
    //     {"SoloEncomiendas":0,"Localidad":"Elena","ID_Localidad":11},
    //     {"SoloEncomiendas":0,"Localidad":"Embalse","ID_Localidad":8},
    //     {"SoloEncomiendas":0,"Localidad":"General Levalle","ID_Localidad":28},
    //     {"SoloEncomiendas":0,"Localidad":"Isla Verde","ID_Localidad":62},
    //     {"SoloEncomiendas":0,"Localidad":"La Cautiva","ID_Localidad":27},
    //     {"SoloEncomiendas":0,"Localidad":"Laborde","ID_Localidad":59},
    //     {"SoloEncomiendas":0,"Localidad":"Laboulaye","ID_Localidad":14},
    //     {"SoloEncomiendas":0,"Localidad":"Las Acequias","ID_Localidad":72},
    //     {"SoloEncomiendas":0,"Localidad":"Los Condores","ID_Localidad":13},
    //     {"SoloEncomiendas":0,"Localidad":"Monte Maiz","ID_Localidad":61},
    //     {"SoloEncomiendas":0,"Localidad":"Olaeta","ID_Localidad":54},
    //     {"SoloEncomiendas":0,"Localidad":"Pascanas","ID_Localidad":58},
    //     {"SoloEncomiendas":0,"Localidad":"Rio Cuarto","ID_Localidad":10},
    //     {"SoloEncomiendas":0,"Localidad":"Rio Tercero","ID_Localidad":39},
    //     {"SoloEncomiendas":0,"Localidad":"San Basilio","ID_Localidad":32},
    //     {"SoloEncomiendas":0,"Localidad":"Santa Rosa de Calamuchita","ID_Localidad":3},
    //     {"SoloEncomiendas":0,"Localidad":"Ucacha","ID_Localidad":56},
    //     {"SoloEncomiendas":0,"Localidad":"Vicuña Mackenna","ID_Localidad":26},
    //     {"SoloEncomiendas":0,"Localidad":"Villa del Dique","ID_Localidad":7},
    //     {"SoloEncomiendas":0,"Localidad":"Villa Gral. Belgrano","ID_Localidad":2}];

    // $scope.destinations = [{"id_localidad_origen":10,"id_localidad_destino":33,"hasta":"Adelia Maria","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":9,"hasta":"Alcira Gigena","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":4,"hasta":"Almafuerte","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":68,"hasta":"Arias","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":37,"hasta":"Baigorria","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":55,"hasta":"Bengolea","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":5,"hasta":"Berrotaran","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":35,"hasta":"Carolina","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":65,"hasta":"Cavanagh","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":53,"hasta":"Charras","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":57,"hasta":"Chazon","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":52,"hasta":"Chucul","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":1,"hasta":"Cordoba Plaza","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":47,"hasta":"Cordoba Terminal","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":63,"hasta":"Corral de Bustos","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":23,"hasta":"Cruce Malena","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":24,"hasta":"Cruce Moldes","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":30,"hasta":"Cura Palihue","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":11,"hasta":"Elena","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":8,"hasta":"Embalse","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":34,"hasta":"Ensenada","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":38,"hasta":"Espinillo","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":28,"hasta":"General Levalle","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":31,"hasta":"Guardia Vieja","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":67,"hasta":"Guatimozín","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":22,"hasta":"Holmberg","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":62,"hasta":"Isla Verde","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":27,"hasta":"La Cautiva","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":25,"hasta":"La Tosquita","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":59,"hasta":"Laborde","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":14,"hasta":"Laboulaye","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":72,"hasta":"Las Acequias","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":51,"hasta":"Las Higueras","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":13,"hasta":"Los Condores","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":61,"hasta":"Monte Maiz","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":64,"hasta":"O´Higgins","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":66,"hasta":"O´Higgins (cruce)","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":54,"hasta":"Olaeta","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":58,"hasta":"Pascanas","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":36,"hasta":"Punta de Agua","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":29,"hasta":"Rio Bamba","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":39,"hasta":"Rio Tercero","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":18,"hasta":"San Agustín","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":32,"hasta":"San Basilio","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":3,"hasta":"Santa Rosa de Calamuchita","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":56,"hasta":"Ucacha","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":26,"hasta":"Vicuña Mackenna","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":7,"hasta":"Villa del Dique","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":2,"hasta":"Villa Gral. Belgrano","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":12,"hasta":"Villa Rumipal","desde":"Rio Cuarto"},{"id_localidad_origen":10,"id_localidad_destino":60,"hasta":"W.Escalante","desde":"Rio Cuarto"}]
    // tripService.getOrigins();

    $scope.destinations = [
        {"id_localidad_destino":10, "hasta":"Adelia Maria"},
        {"id_localidad_destino":11, "hasta":"Embalse"}
    ];
    //console.log($scope.response);

    $scope.roundTrip = false;

    $scope.goSearch = function(){
        var a = $scope.params.departureDate;
        var b = $scope.params.arrivalDate;
        if ($scope.roundTrip && !(a.isSame(b) || a.isBefore(b))) {
            window.alert("La fecha de llegada no puede ser anterior a la de salida");
        } else {
            $location.path('/schedules');
            //console.log($scope.roundTrip);
            if ($scope.roundTrip === true){
                tripService.setRoundTrip(1);
            } else {
                tripService.setRoundTrip(0);
            }
            // console.log("Todo bien");
            // console.log(a.isSame(a));
            // console.log(a.format("YYYYMMDD"));
        }
        // $location.path('/schedules');
        // console.log($scope.roundTrip);
        // if ($scope.roundTrip === true){
        //     tripService.setRoundTrip(1);
        // } else {
        //     tripService.setRoundTrip(0);
        // }
        // console.log(tripService.getRoundTrip());
    };
});


