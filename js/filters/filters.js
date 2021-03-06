angular.module('app').filter('lepDateYear', ["$filter",function($filter){
	
	return function(input){
		if (input == null) {
			return "";
		} 
		var _date = moment(input).format("DD/MM/YYYY");
		return _date.toUpperCase();
	}
	
}]);

angular.module('app').filter('lepHour',[function(){
	
	return function(input){
		//console.log(input);
		if (input == null){
			return "";
		}
		var _hour = moment(input).format("HH:mm");
		//console.log(_hour);
		return _hour.toUpperCase();
	}
}]);

angular.module('app').filter('lepDate', ["$filter", function($filter){

	return function(input){
		if (input == null){
			return "";
		}
		var _date = moment(input).format("DD/MM/YYYY HH:mm");
		return _date.toUpperCase();
	}
}]);

angular.module('app').filter('lepDateMonth', ["$filter", function($filter){
	
	return function(input){
		if (input == null) {
			return "";
		} 
		if (input == ''){
			return "-";
		}
		var _date = moment(input).format("DD/MM");
		return _date.toUpperCase();
	}
	
}]);

angular.module('app').filter('capitalize', ["$filter", function($filter){
	
	 return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
	
}]);