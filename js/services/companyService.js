angular.module('app')
.factory('companyService', [function(){

	var active_tab = 1;
	var active_unit_tab = 1;

	return {
		getActiveTab: function(){
			return active_tab;
		},
		getActiveUnitTab: function(){
			return active_unit_tab;
		},
		setActiveTab: function(tab){
			active_tab = tab;
		},
		setActiveUnitTab: function(tab){
			active_unit_tab = tab;
		}
	};
}]);