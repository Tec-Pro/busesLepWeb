angular.module('app')
.controller('FooterCtrl',function ($scope, $http, feedService) {
	$http.get("http://api.openweathermap.org/data/2.5/weather?id=3860259&APPID=6b10444e5758a2d047de8e60b9fd368d")
	.then(function (response){
		$scope.weather = {temp: response.data.main.temp - 273.15,
						  tempMin: response.data.main.temp_min - 273.15,
						  tempMax: response.data.main.temp_max - 273.15};
	});



	feedService.parseFeed('http://www.lavoz.com.ar/rss.xml').then(function(res){
		$scope.feeds = res.data.responseData.feed.entries;
	});

	
});


