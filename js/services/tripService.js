angular.module('app')
.factory('tripService', function(){

	var roundTrip = 0;
	var buy = 0;

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

