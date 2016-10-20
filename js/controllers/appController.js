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
	if (isMobile.Android()){
		window.location = "https://play.google.com/store/apps/details?id=com.tecpro.buseslep&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1";
	}
	if (isMobile.iOS()){
		window.location = "https://itunes.apple.com/ar/app/buses-lep-horarios-y-reservas/id1044093506?mt=8";
	} else {
		$location.path("/"); 
	}
}]);