

angular.module("app", ["ngRoute","LocalStorageModule"])
    .config(function($routeProvider){
        $routeProvider
            .when("/", {
                controller: "MainCtrl",
                templateUrl: "views/main.html"
            })
            .when("/editProfile", {
                templateUrl: "views/editProfile.html"
            })
            .when("/editPass", {
                templateUrl: "views/editPass.html"
            })
            .when("/endPurchase", {
                templateUrl: "views/endPurchase.html"
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
            .when("/login", {
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
                templateUrl: "views/details.html"
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
   
