angular.module('app').controller('AppCtrl',["$location",function($location){
	var isMobile = {
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
	};
	console.log(isMobile.Android());
	console.log(isMobile.Windows());
	console.log(isMobile.BlackBerry());
	console.log(isMobile.iOS());
}]);