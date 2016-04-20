angular.module('app')
	.factory('scheduleService',[function(){
		
		var schedule = {};
		schedule.origin_id = '';
		schedule.origin_name = '';
		schedule.destination_id = '';
		schedule.destination_name = '';
		schedule.arrival_date_1 = '';
		schedule.arrival_time_1 = '';
		schedule.departure_date_1 = '';
		schedule.departure_time_1 = '';
		schedule.arrival_date_2 = '';
		schedule.arrival_time_2 = '';
		schedule.departure_date_2 = '';
		schedule.departure_time_2 = '';
		schedule.amount = 0;
		schedule.round_trip = false;
		
		return {
			getSchedule: function(){
				return schedule;
			},
			/*getScheduleOriginId : function(){
				return schedule.origin_id;
			},
			getScheduleOriginName: function(){
				return schedule.origin_name;
			},
			getScheduleDestinationId{return schedule.destination_id;},
			{return schedule.destination_name;},
			{return schedule.arrival_date_1;},
			{return schedule.arrival_time_1;},
			{return schedule.departure_date_1;},
			{return schedule.departure_time_1;},
			{return schedule.arrival_date_2;},
			{return schedule.arrival_time_2;},
			{return schedule.departure_date_2;},
			{return schedule.departure_time_2;},
			{return schedule.amount;},
			{return schedule.round_trip;},*/
			
			setScheduleOriginId : function(val){
				schedule.origin_id = val;
			},
			setScheduleOriginName : function(val) {
				schedule.origin_name = val;
			},
			setScheduleDestinationId : function(val){
				schedule.destination_id = val;
			},
			setScheduleDestinationName : function(val){
				schedule.destination_name = val;
			},
			setScheduleFirstArrivalDate : function(val){
				schedule.arrival_date_1 = val;
			},
			setScheduleFirstArrivalTime : function(val){
				schedule.arrival_time_1 = val;
			},
			setScheduleFirstDepartureDate : function(val){
				schedule.departure_date_1 = val;
			},
			setScheduleFirstDepartureTime : function(val){
				schedule.departure_time_1 = val;
			},
			setScheduleSecondArrivalDate : function(val){
				schedule.arrival_date_2 = val;
			},
			setScheduleSecondArrivalTime : function(val){
				schedule.arrival_time_2 = val;
			},
			setScheduleSecondDepartureDate : function(val){
				schedule.departure_date_2 = val;
			},
			setScheduleSecondDepartureTime : function(val){
				schedule.departure_time_2 = val;
			},
			setScheduleTicketAmount : function(val){
				schedule.amount = val;
			},
			setScheduleRoundTrip : function(val){
				schedule.round_trip = val;
			}
		};
		
	}]);