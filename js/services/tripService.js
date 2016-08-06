angular.module('app')
.factory('tripService', ["$soap","$q", function($soap, $q){

	var purchase_origin = 0;

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

	var origin_office = 0;
	var destination_office = 0;
	var trip_price = 0;
	var sell_code = -1;
	var passengers = 1;
	var selectedSeatsGo = [];
	var selectedSeatsReturn = [];
	
	/*var user = {'name':'John'};
	sessionStorage.setItem('user', JSON.stringify(user));
	var obj = JSON.parse(sessionStorage.user);*/

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
		savePurchaseOrigin: function(obj){
			purchase_origin = obj;
			sessionStorage.setItem('purchase_origin', purchase_origin);
		},
		savePassengers: function(obj){
			passengers = obj;
			sessionStorage.setItem('passengers', passengers);	
		},
		saveSellCode: function(obj){
			sell_code = obj;
			sessionStorage.setItem('sell_code', sell_code);	
		},
		saveDepartureTrip: function(){
			sessionStorage.setItem('departure_trip', JSON.stringify(departure_trip));	
		},
		saveTripPrice: function(val){
			trip_price = val;
			sessionStorage.setItem('trip_price', trip_price);	
		},
		saveSelectedSeatsGo: function(val){
			if(val != undefined){
				selectedSeatsGo = val;	
			}	
			sessionStorage.setItem('selected_seats_go', JSON.stringify(selectedSeatsGo));
		},
		saveSelectedSeatsReturn: function(val){
			if(val != undefined){
				selectedSeatsReturn = val;
			}
			sessionStorage.setItem('selected_seats_return', JSON.stringify(selectedSeatsReturn));	
		},
		getPurchaseOrigin: function () {
			return sessionStorage.purchase_origin;
		},
		getDepartureTrip: function(){
			if(sessionStorage.departure_trip == undefined){
				departure_trip = {
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
				return departure_trip;
			}else{
				departure_trip = JSON.parse(sessionStorage.departure_trip);
				departure_trip.departure_date = moment(departure_trip.departure_date, "YYYY-MM-DD");
				if(departure_trip.round_trip == 1){
					departure_trip.return_date = moment(departure_trip.return_date, "YYYY-MM-DD");
				}
				return departure_trip;
			}
		},
		getOriginOffice: function(){
			var result = sessionStorage.origin_office;
			if (result == undefined){
				return 0;
			}
			return JSON.parse(result);
		},
		getDestinationOffice: function(){
			return destination_office;
		},
		getReturnTrip: function(){
			return return_trip;
		},
		getSelectedSeatsGo: function(){
			var result = sessionStorage.selected_seats_go;
		
			if(result != undefined){
				return JSON.parse(result);
			}
			else{
				return selectedSeatsGo;
			}
		},
		getSelectedSeatsReturn: function(){
			var result = sessionStorage.selected_seats_return;
			
			if(result != undefined){
				return JSON.parse(result);
			}
			else{
				return selectedSeatsReturn;
			}
		},
		getTripPrice: function(){
			return sessionStorage.trip_price;
		},
		getSellCode: function(){
			return sessionStorage.sell_code;
		},
		getPassengers: function(){
			return sessionStorage.passengers;
		},
		getSchedules: function(){
			//return schedules;
			if(sessionStorage.schedules != undefined){
				return JSON.parse(sessionStorage.schedules);
			}
			else{
				return undefined;
			}
		},
		setSchedules: function(val){
			schedules = val;
			//console.log(JSON.stringify(schedules));
			sessionStorage.setItem('schedules', JSON.stringify(schedules));
			//console.log(JSON.parse(sessionStorage.schedules));
		},
		setRoundTrip: function(val) {
			departure_trip.round_trip = val;
		},
		setBuy: function(val){
			departure_trip.buy = val;
		},
		setTripOriginId: function(val){
			departure_trip.origin_id = val;
		},
		setOriginOffice: function(val){
			var org_off = {origin_office: val}
			sessionStorage.setItem('origin_office', JSON.stringify(org_off));
			origin_office = val;
		},
		setDestinationOffice: function(val){
			destination_office = val;
		},
		setTripDestinationId: function(val){
			departure_trip.destination_id = val;
		},
		setTripOriginName: function(val){
			departure_trip.origin_name = val;
		},
		setTripDestinationName: function(val){
			departure_trip.destination_name = val;
		},
		setTripDeparture: function(val){
			departure_trip.departure_date = val;
		},
		setTripReturn: function(val){
			departure_trip.return_date = val;
		},
		setTripTicketAmount: function(val){
			departure_trip.ticket_amount = val;
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

