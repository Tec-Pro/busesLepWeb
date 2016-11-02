angular.module('app')
.factory('reserveService', [function(){
	var reserve = {};

	return {
		setReserve: function(r){
			reserve = r;
		},
		getReserve: function(){
			return reserve;
		}
	}
}]);