

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
            })
            .when("/ticketOffices", {
                controller: "TicketOfficesController",
                templateUrl: "views/ticketOffices.html"
            })
            .when("/tours", {
                templateUrl: "views/tours.html"
            })
            .when("/account/reserves", {
                templateUrl: "views/accountReserves.html"
            })
            .when("/account/purchases", {
                templateUrl: "views/accountPurchases.html"
            })
            .when("/account/lastsearch", {
                templateUrl: "views/accountSearches.html"
            })
            .when("/account/checkbalance", {
                templateUrl: "views/accountCheckBalance.html"
            })
            .when("/account/buycredits", {
                templateUrl: "views/accountBuyCredits.html"
            })
            .when("/account/reserves", {
                templateUrl: "views/accountReserves.html"
            })
            .when("/account/update", {
                templateUrl: "views/accountUpdate.html"
            });             
    });
   
