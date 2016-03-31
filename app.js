

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
            .when("/details/:isRoundTrip/:isBuy", {
                controller: "DetailsController",
                templateUrl: "views/details.html"
            })
            .when("/summary", {
                templateUrl: "views/summary.html"
            });             
    });
   
