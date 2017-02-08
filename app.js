angular.module("app", ["ngRoute","ngAnimate","LocalStorageModule","angularSoap","daterangepicker","ngSanitize", "ngStorage",'ui.bootstrap'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
            $routeProvider
                .when("/", {
                    controller: "HomeCtrl",
                    templateUrl: "views/home.html"
                })
                .when("/test", {
                    controller: "TestCtrl",
                    templateUrl: "views/test.html"
                })
                .when("/editProfile", {
                    templateUrl: "views/editProfile.html"
                })
                .when("/editPass", {
                    templateUrl: "views/editPass.html"
                })
                .when("/endPurchase/:code", {
                    templateUrl: "views/endPurchase.html",
                    controller: 'EndController'
                })
                .when("/endDeposit", {
                    templateUrl: "views/endDeposit.html",
                    controller: 'EndController'
                })
                .when("/endReserve", {
                    templateUrl: "views/endReserve.html",
                    controller: 'EndController'
                })
                .when("/signin", {
                    templateUrl: "views/signin.html"
                })
                .when("/recoverPass", {
                    templateUrl: "views/recoverPass.html"
                })
                .when("/login/:nxt?", {
                    controller: "LoginCtrl",
                    templateUrl: "views/login.html"
                })
                .when("/schedules", {
                    controller: "ScheduleController",
                    templateUrl: "views/schedulesList.html"
                })
                .when("/seatPicker", {
                    controller: "SeatsController",
                    templateUrl: "views/seatPicker.html"
                })
                .when("/lastSearches", {
                    controller: "LastSearchesController",
                    templateUrl: "views/lastSearches.html"
                })
                .when("/details", {
                    controller: "DetailsController",
                    templateUrl: "views/details.html"
                })
                .when("/special", {
                    controller: "SpecialTravelCtrl",
                    templateUrl: "views/special.html"
                })
                .when("/company", {
                    controller: "CompCtrl",
                    templateUrl: "views/company.html"
                })
                .when("/summary", {
                    controller: "SummaryController",
                    templateUrl: "views/summary.html"
                })
                .when("/buy", {
                    controller: "MercadopagoController",
                    templateUrl: "views/mercadopagoTest.html"
                })
                .when("/ticketOffices", {
                    controller: "TicketOfficesController",
                    templateUrl: "views/ticketOffices.html"
                })
                .when("/tours", {
                    controller: "ToursController",
                    templateUrl: "views/tours.html"
                })
                .when("/encomiendas", {
                    controller: "EncomController",
                    templateUrl: "views/encomiendas.html"
                })
                .when("/encomiendas/:packid", {
                    controller: "EncomController",
                    templateUrl:"views/encomiendas.html"
                })
                .when("/account", {
                    templateUrl: "views/account.html"
                })
                .when("/validate/:dni?:cod?", {
                    controller: "AccValCtrl",
                    templateUrl: "views/accountValidate.html"
                })
                .when("/smartStops/:type?:id?:header?:amount?", {
                    controller: "SmartStopsCtrl",
                    templateUrl: "views/smartStops.html"
                })
                .when("/app", {
                    controller: "AppCtrl",
                    templateUrl: "views/app.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
                //$locationProvider.html5Mode(true);            
        }])
    .directive('numbersOnly', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            if (text) {
              var transformedInput = text.replace(/[^0-9]/g, '');
    
              if (transformedInput !== text) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
              }
              return transformedInput;
            }
            return undefined;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      };
    });
   
