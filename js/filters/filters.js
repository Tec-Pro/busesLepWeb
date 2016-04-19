angular.module('app').filter('lepDate', function($filter){
	
	return function(input){
		if (input == null) {
			return "";
		} 
		var _date = moment(input).format("DD/MM/YYYY");
		return _date.toUpperCase();
	}
	
});

angular.module('app').filter('lepHour', function(){
	
	return function(input){
		if (input == null){
			return "";
		}
		var _hour = moment(input).format("HH:MM");
		return _hour.toUpperCase();
	}
});