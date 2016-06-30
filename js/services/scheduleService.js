angular.module('app')
	.factory('scheduleService',[function(){
		
		var schedule = {};
		schedule.origin_id = '';
		schedule.origin_name = '';
		schedule.duration = '';
		schedule.status = '';
		schedule.service = '';
		schedule.price = '';
		schedule.destination_id = '';
		schedule.destination_name = '';
		schedule.arrival_datetime_1 = '';
		schedule.departure_datetime_1 = '';
		schedule.arrival_datetime_2 = '';
		schedule.departure_datetime_2 = '';
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
			setScheduleDuration: function(val) {
				schedule.duration = val;
			},
			setSchedulePrice: function(val) {
				schedule.price = val;
			},
			setScheduleStatus: function(val){
				schedule.status = val;
			},
			setScheduleFirstArrivalDatetime : function(val){
				schedule.arrival_datetime_1 = val;
			},
			setScheduleFirstDepartureDatetime : function(val){
				schedule.departure_datetime_1 = val;
			},
			setScheduleSecondArrivalDatetime : function(val){
				schedule.arrival_datetime_2 = val;
			},
			setScheduleSecondDepartureDatetime : function(val){
				schedule.departure_datetime_2 = val;
			},
			setScheduleRoundTrip : function(val){
				schedule.round_trip = val;
			}
		};
		
	}]);