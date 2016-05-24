

angular.module("app", ["ngRoute","LocalStorageModule","angularSoap","daterangepicker"])
    .config(function($routeProvider){
        $routeProvider
            .when("/", {
                controller: "HomeCtrl",
                templateUrl: "views/home.html"
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
            .when("/endReserve", {
                templateUrl: "views/endReserve.html"
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
                controller: "specialTravelController",
                templateUrl: "views/special.html"
            })
            .when("/reserveDetails", {
                controller: "DetailsController",
                templateUrl: "views/reserveDetails.html"
            })
            .when("/summary", {
                controller: "SummaryController",
                templateUrl: "views/summary.html"
            })
            .when("/userReserves", {
                templateUrl: "views/userReserves.html"
            })
            .when("/userTickets", {
                templateUrl: "views/userTickets.html"
            });             
    });
   
