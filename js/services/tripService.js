angular.module('app')
.factory('tripService', ["$soap","$q", function($soap, $q){

	var departure_trip = {
		round_trip : 0,
		buy : 0,
		destination_id : '',
		destination_name : '',
		origin_id : '',
		origin_name : '',
		departure_date : '',
		departure_time :'',
		return_date : '',
		return_time : '',
		first_arrival_date : '',
		first_arrival_time : '',
		secondArrival_date: '',	
		second_arrival_time: '',
		ticket_amount: 0
	};

	var return_trip = {

	};
	

	var schedules = [];
		
	var base_urlWSDL = "https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/wsdl/ILepWebService";
	var base_urlSOAP = "https://webservices.buseslep.com.ar/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService";
	
	var getOriginsSOAP =  function(){
            var deferred = $q.defer();

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService', true);

            // build SOAP request
            var sr =
                '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
                '<SOAP-ENV:Envelope ' + 
                    'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" ' +
                    'xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
                    'xmlns:tns="http://tempuri.org/" ' +
                    'xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" ' +
                    'xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" ' +
                    'xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" ' +
                    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" >'+
                    '<SOAP-ENV:Body>' +
                        '<mns:LocalidadesDesde xmlns:mns="urn:LepWebServiceIntf-ILepWebService" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                            '<userWS xsi:type="xs:string">UsuarioLep</userWS>' +
                            '<passWS xsi:type="xs:string">Lep1234</passWS>' +
                            '<id_plataforma xsi:type="xs:int">3</id_plataforma>' +
                        '</mns:LocalidadesDesde>' +
                    '</SOAP-ENV:Body>' +
                '</SOAP-ENV:Envelope>';

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var x2js = new X2JS();
                        var j = x2js.xml_str2json(xmlhttp.response);
                        var obj = eval("("+j.Envelope.Body.LocalidadesDesdeResponse.return.__text+")");
                        //console.log(obj.Data);
                        deferred.resolve(obj.Data);
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
            // send request
            // ...
            return deferred.promise;
        };

    
	return {
		getTrip: function(){
			return trip;
		},
		getRoundTrip: function() {
			return trip.round_trip;
		},
		getBuy: function(){
			return trip.buy;
		},
		getTripOriginId: function(){
			return trip.origin_id;
		},	
		getTripDestinationId: function(){
			return trip.destination_id;
		},
		getTripOriginName: function(){
			return trip.origin_name;
		},
		getTripDestinationName: function(){
			return trip.destination_name;
		},
		getTripDeparture: function(){
			return trip.departure_date;
		},
		getTripDepartureTime: function(){
			return trip.departure_time;
		},
		getTripReturn: function(){
			return trip.return_date;
		},
		getTripReturnTime: function(){
			return trip.return_time;
		},
		getTripTicketAmount: function(){
			return trip.ticket_amount;
		},
		getTripFirstArrival: function(){
			return trip.first_arrival_date;
		},
		getTripSecondArrival: function(){
			return trip.secondArrival_date;
		},
		getTripFirstArrivalTime: function(){
			return trip.first_arrival_time;
		},
		getTripSecondArrivalTime: function(){
			return trip.second_arrival_time;
		},
		getSchedules: function(){
			return schedules;
		},
		setSchedules: function(val){
			schedules = val;
		},
		setRoundTrip: function(val) {
			trip.round_trip = val;
		},
		setBuy: function(val){
			trip.buy = val;
		},
		setTripOriginId: function(val){
			trip.origin_id = val;
		},
		setTripDestinationId: function(val){
			trip.destination_id = val;
		},
		setTripOriginName: function(val){
			trip.origin_name = val;
		},
		setTripDestinationName: function(val){
			trip.destination_name = val;
		},
		setTripDeparture: function(val){
			trip.departure_date = val;
		},
		setTripReturn: function(val){
			trip.return_date = val;
		},
		setTripTicketAmount: function(val){
			trip.ticket_amount = val;
		},
		getOriginsAngularWSDL: function(){
			return $soap.post(base_urlWSDL, "LocalidadesDesde",{userWS: "UsuarioLep", passWS: "Lep1234", id_plataforma: 3});
		},
		getOriginsAngularSOAP: function(){
			return $soap.post(base_urlSOAP, "LocalidadesDesde",{userWS: "UsuarioLep", passWS: "Lep1234", id_plataforma: 3});
		},
		getDestinations : function(id_origin){
				var deferred = $q.defer();

				var xmlhttp = new XMLHttpRequest();
				xmlhttp.open('POST', 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService', true);

				// build SOAP request
				var sr =
						'<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
						'<SOAP-ENV:Envelope ' + 
								'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" ' +
								'xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
								'xmlns:tns="http://tempuri.org/" ' +
								'xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" ' +
								'xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" ' +
								'xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" ' +
								'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
								'xmlns:xsd="http://www.w3.org/2001/XMLSchema" >'+
								'<SOAP-ENV:Body>' +
										'<mns:Localidadeshasta xmlns:mns="urn:LepWebServiceIntf-ILepWebService" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
												'<userWS xsi:type="xs:string">UsuarioLep</userWS>' +
												'<passWS xsi:type="xs:string">Lep1234</passWS>' +
												'<IdLocalidadOrigen xsi:type="xs:int">'+id_origin+'</IdLocalidadOrigen>' +
												'<id_plataforma xsi:type="xs:int">3</id_plataforma>' +
										'</mns:Localidadeshasta>' +
								'</SOAP-ENV:Body>' +
						'</SOAP-ENV:Envelope>';

				xmlhttp.onreadystatechange = function () {
						if (xmlhttp.readyState == 4) {
								if (xmlhttp.status == 200) {
										var x2js = new X2JS();
										var json_response = x2js.xml_str2json(xmlhttp.response);
										var valid_json = eval("("+json_response.Envelope.Body.LocalidadeshastaResponse.return.__text+")");
										deferred.resolve(valid_json.Data);
								}
						}
				}
				// Send the POST request
				xmlhttp.setRequestHeader('Content-Type', 'text/xml');
				xmlhttp.send(sr);
				// send request
				// ...
				return deferred.promise;
		},

        getOrigins : getOriginsSOAP,
	
		searchTrips : function(origin_id, destination_id, date){
			var deferred = $q.defer();

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('POST', base_urlSOAP, true);
			// build SOAP request
			var sr =
				'<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
				'<SOAP-ENV:Envelope ' + 
				'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" ' +
				'xmlns:xs="http://www.w3.org/2001/XMLSchema" ' +
				'xmlns:tns="http://tempuri.org/" ' +
				'xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" ' +
				'xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" ' +
				'xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" ' +
				'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
				'xmlns:xsd="http://www.w3.org/2001/XMLSchema" >'+
				'<SOAP-ENV:Body>' +
				'<mns:ListarHorarios xmlns:mns="urn:LepWebServiceIntf-ILepWebService" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
				'<userWS xsi:type="xs:string">UsuarioLep</userWS>' +
				'<passWS xsi:type="xs:string">Lep1234</passWS>' +
				'<IdLocalidadOrigen xsi:type="xs:int">'+origin_id+'</IdLocalidadOrigen>' +
				'<IdLocalidadDestino xsi:type="xs:int">'+destination_id+'</IdLocalidadDestino>' +
				'<id_plataforma xsi:type="xs:int">3</id_plataforma>' +
				'<Fecha xsi:type="xs:string">'+date+'</Fecha>' +
				'<DNI xsi:type="xs:int">1234567</DNI>' +
				'</mns:ListarHorarios>' +
				'</SOAP-ENV:Body>' +
				'</SOAP-ENV:Envelope>';

			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						var x2js = new X2JS();
						var json_response = x2js.xml_str2json(xmlhttp.response);
						var valid_json = eval("("+json_response.Envelope.Body.ListarHorariosResponse.return.__text+")");
						deferred.resolve(valid_json.Data);
					}
				}
			}
			// Send the POST request
			xmlhttp.setRequestHeader('Content-Type', 'text/xml');
			xmlhttp.send(sr);
			// send request
			// ...
			return deferred.promise;
		}
        
    };


}]);

