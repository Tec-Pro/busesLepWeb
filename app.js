

angular.module("app", ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "views/main.html"
            })
            .when("/editProfile", {
                templateUrl: "views/editProfile.html"
            })
            .when("/editPass", {
                templateUrl: "views/editPass.html"
            })
            .when("/endPurhcase", {
                templateUrl: "views/endPurhcase.html"
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
                controler: "LoginCtrl",
                templateUrl: "views/login.html"
            });
           
    });
   