angular.module('app')
.factory('companyService', [function(){

	var active_tab = 0;
	var active_unit_tab = 0;
	var show_contact = false;
	return {
		getActiveTab: function(){
			return active_tab;
		},
		getActiveUnitTab: function(){
			return active_unit_tab;
		},
		getShowContact: function(){
			return show_contact;
		},
		setActiveTab: function(tab){
			active_tab = tab;
		},
		setActiveUnitTab: function(tab){
			active_unit_tab = tab;
		},
		setShowContact: function(con){
			show_contact = con;
		}
	};
}]);