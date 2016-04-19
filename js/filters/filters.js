angular.module('app').filter('lep-date', function($filter){
	
	return function(input){
		if (input == null) {
			return "";
		} 
		var _date = $filter('date')(moment(input).toDate(),'dd/MM/yyyy');
		return _date.toUpperCase();
	}
	
});