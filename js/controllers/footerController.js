angular.module('app')
.controller('FooterCtrl', ['$scope', '$location', '$http', '$window', 'localStorageService', 'companyService', 'wsService', 'feedService', function ($scope, $location, $http, $window, localStorageService, companyService, wsService,feedService) {
	//CLIMA
	$http.get("http://api.openweathermap.org/data/2.5/weather?id=3860259&units=metric&APPID=6b10444e5758a2d047de8e60b9fd368d")
	.then(function (response){
		$scope.weather = {temp: Math.floor(response.data.main.temp),
						  tempMin: response.data.main.temp_min,
						  tempMax: response.data.main.temp_max};
	});
	//FEED
	feedService.parseFeed('http://www.lavoz.com.ar/rss.xml').then(function(res){
		$scope.feeds = res.data.responseData.feed.entries;
	});
	//NOTICIAS Y NOVEDADES
	var wsdl_url ="https://webservices.buseslep.com.ar:443/WebServices/WSLepPaginaWeb.dll/soap/IWSLepPaginaWeb";
	var urn = 'LepWebServiceIntf-ILepWebService';
	var parameters = [
    {
      name: "userWS",
      type: "string",
      value: "UsuarioLep"
    },
    {
      name: "passWS",
      type: "string",
      value: "Lep1234"
    }];

	wsService.callService(wsdl_url, urn, "Noticias", parameters).then(function(response){
    	$scope.noticias = response;
    });
	wsService.callService(wsdl_url, urn, "Novedades", parameters).then(function(response){
        $scope.novedades = response;
    });

	$scope.goCompanyContact = function(){
      companyService.setActiveTab(2);
      $window.scrollTo(0,0);
      $location.path('/company');
    }
}]);


