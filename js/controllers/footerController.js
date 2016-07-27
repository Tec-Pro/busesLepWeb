angular.module('app')
.controller('FooterCtrl', ['$scope', '$location', '$http', '$window', 'localStorageService', 'companyService', 'wsService', 'feedService', function ($scope, $location, $http, $window, localStorageService, companyService, wsService,feedService) {
	$http.get("http://api.openweathermap.org/data/2.5/weather?id=3860259&APPID=6b10444e5758a2d047de8e60b9fd368d")
	.then(function (response){
		$scope.weather = {temp: response.data.main.temp - 273.15,
						  tempMin: response.data.main.temp_min - 273.15,
						  tempMax: response.data.main.temp_max - 273.15};
	});

	feedService.parseFeed('http://www.lavoz.com.ar/rss.xml').then(function(res){
		$scope.feeds = res.data.responseData.feed.entries;
	});

	$scope.goCompanyContact = function(){
      companyService.setActiveTab(2);
      $window.scrollTo(0,0);
      $location.path('/company');
    }
}]);


