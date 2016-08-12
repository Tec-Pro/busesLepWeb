angular.module('app')
	.factory('scheduleService',[function(){

		var schedule = {
			origin_id :'',
			origin_name : '',
			duration : '',
			status : '',
			service : '',
			price : '',
			destination_id : '',
			destination_name : '',
			arrival_datetime_1 : '',
			departure_datetime_1 : '',
			arrival_datetime_2 : '',
			departure_datetime_2 : '',
			round_trip : false
		};

		var round_trip_price = 0;
		var schedule_go = null;
		var schedule_return = null;

		var is_return_trip = false;

		return {
			saveSchedule: function(obj){
				schedule_go = obj;
				sessionStorage.setItem('schedule_go', JSON.stringify(schedule_go));
			},
			saveScheduleReturn: function(obj){
				schedule_return = obj;
				sessionStorage.setItem('schedule_return', JSON.stringify(schedule_return));
			},
			getSchedule: function(){
				if(sessionStorage.schedule_go == undefined){

					return null;
				}else{
					schedule_go = JSON.parse(sessionStorage.schedule_go);

					return schedule_go;
				}
				//return schedule;
			},
			getScheduleReturn: function(){
				if(sessionStorage.schedule_return == undefined){
					schedule_return = false;
					return schedule_return;
				}else{
					schedule_return = JSON.parse(sessionStorage.schedule_return);

					return schedule_return;
				}
				//return schedule;
			},
			setIsReturnTrip: function(val){
				is_return_trip = val;
				sessionStorage.setItem('is_return_trip', is_return_trip);
			},
			getIsReturnTrip: function(){
				if(sessionStorage.is_return_trip == undefined){
					is_return_trip = false;
					return is_return_trip;
				}else{
					is_return_trip = sessionStorage.is_return_trip;

					return is_return_trip;
				}
			},
			setRoundTripPrice: function(val){
				round_trip_price = val;
				sessionStorage.setItem('round_trip_price', round_trip_price);
			},
			getRoundTripPrice: function(){
				if (sessionStorage.round_trip_price == undefined) {
					round_trip_price = -1;
					return round_trip_price;
				} else {
					round_trip_price = sessionStorage.round_trip_price;
					return round_trip_price;
				}
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
