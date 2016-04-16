angular.module('app')
.controller('MainCtrl', function($scope, $location,tripService){

    //Date picker options
    $scope.dpOpts = {
        locale: {
          format: "DD/MM/YYYY",
          daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie','Sab'],
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        //If it's a single date picker or not.
        singleDatePicker: true,
        //If month dropdowns should be shown.
        showDropdowns: true
    };

    //By default, the destinationpicker is disabled.
    $scope.destinationEnabled = false;

    //By default, is a one way trip.
    $scope.roundTrip = false;

    //Current parameters of the trip.
    $scope.params = {
      today: moment(),
      origin: '',
      destination: '',
      departureDate: moment(),
      returnDate: moment(),
      amount: ''
    };

    //Function that check the availables destinations whenever the trip origin changes.
    $scope.checkDestinations = function(){
      //Enable the destination picker if the origin has been set.
      $scope.destinationDisabled = !($scope.params.origin === '')
      //Once the origin has been set, reload the possible destinations.
      if ($scope.params.origin != ''){
        //Call asynchronously the web service, through tripService, when it's ready, update the destinations in the scope.
        tripService.getDestinations($scope.params.origin).then(function(destinations){
            $scope.destinations = destinations;
        });
      } else {
        //If the origin is empty, set default value.
        $scope.params.destination = '';
      }
    };

    $scope.print = function(){
        console.log($scope.params.origin);
    };

    // tripService.getOriginsAngularWSDL().then(function(response){
    //     console.log("Angular WSDL");
    //     console.log(response);
    // });

    // console.log("Angular SOAP");
    // tripService.prueba().then(function(response){
    //     $scope.response = response;
    //     console.log($scope.response);
    // });

    // console.log("Get Origins WSDL");
    // tripService.getOriginsWSDL();


    //$scope.origins = [];
    //console.log("Get Origins SOAP");

    //Call the web service and update the origins from the scope.
    tripService.getOrigins().then(function(origins){
        $scope.origins = origins;
    });

    //Call the search web service and
    $scope.goSearch = function(){
      //Get the dates from the datepicker.
      var a = $scope.params.departureDate;
      var b = $scope.params.returnDate;
      //a must be != null, b can be null.
      //if is a round trip, and b (The return date) is after the a (The departure date) alert the user.
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
