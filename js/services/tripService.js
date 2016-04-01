angular.module('app')
.factory('tripService', function(){

	var roundTrip = false;
	var buy = 1;

	return {
		getRoundTrip: function() {
			return roundTrip;
		},
		getBuy: function(){
			return buy;
		},
		setRoundTrip: function(valA){
			roundTrip = valA;
		},
		setBuy: function(valB){
			buy = valB;
		}
	};

});

