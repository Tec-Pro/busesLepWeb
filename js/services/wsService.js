angular.module('app')
.factory('wsService', ["$q","$timeout", function($q, $timeout){

	var wsService = {};
	/*
	* This method is a general web service caller. It takes as parameters
	* the Web Service Description Language link of the Web Service to be called,
	* the unique resource name (urn) of the web service,
	* the method of the Web Service that the user wants to invoke and 
	* an array of objects containing the parameters, each parameter p will be an object
	* that contains the parameter name, the type and the value.
	* ie: p = [{name: 'userws', type: 'string', value: 'UsuarioLep'}
	*/
	wsService.callService = function(wsdl_url, urn, method, parameters){
		//Create the deferred object
		var deferred = $q.defer();
		//Create the xmlhttp petition 

		var xmlhttp = new XMLHttpRequest();
		//Specify the type of request so that it will be a post, sent to the wsdl
		//passed by the user and that it will be an asynchronous call.
		xmlhttp.open('POST', wsdl_url, true);
     
		//Build the SOAP request
		var soap_request = 
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
                        '<mns:'+ method + ' xmlns:mns="urn:'+ urn +'" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
        for (i = 0; i< parameters.length; i++){
        	var current = parameters[i];
        	soap_request = soap_request + '<'+current.name+' xsi:type="xs:'+current.type+'">'+current.value+'</'+current.name+'>';
        }

        soap_request = soap_request + '</mns:'+method+'>' +
     								'</SOAP-ENV:Body>' +
     							'</SOAP-ENV:Envelope>';
                            // '<userWS xsi:type="xs:string">UsuarioLep</userWS>' +
                            // '<passWS xsi:type="xs:string">Lep1234</passWS>' +
                            // '<id_plataforma xsi:type="xs:int">3</id_plataforma>' +
       //	console.log("Peticion: "+soap_request);
       	//When the status of the request changes to ready, parse the received object.
       	xmlhttp.onreadystatechange = function() {
       		//When the request status is ready and the response has been received.
       		if (xmlhttp.readyState == 4){
       			//If the response status is OK then parse the object.
       			if (xmlhttp.status == 200){
       				//Create the XML to JSON parser.
       				var x2js = new X2JS();
       				//Parse the XMLHttp response that we received.
       				var json_response = x2js.xml_str2json(xmlhttp.response);
       				//Set the method response tag.
       				var method_response = method+'Response';
       				//Create the json object.
              try{
       				   var json_object = eval("("+json_response.Envelope.Body[method_response].return.__text+")");
                 //Resolve the deferred call with the data of the Json object.
                 if(json_object.Data != undefined){
                    deferred.resolve(json_object.Data);
                 }
                 else{
                    str = xmlhttp.response.toString();
                    
                    n = str.search("</return>");
                    x = str.search("<return");
                    str = str.substring(x,n);
                    x = str.search("\">");
                    str = str.substring(x+2,n);
                    deferred.resolve(str);
                 }
                 
              }
              catch(err) {
                  str = xmlhttp.response.toString();
                  
                  n = str.search("</return>");
                  x = str.search("<return");
                  str = str.substring(x,n);
                  x = str.search("\">");
                  str = str.substring(x+2,n);
                  deferred.resolve(str);
              }
       			} else {
              deferred.reject(xmlhttp.status.toString());
            }
       		}
       	}  
        $timeout(function(){
          deferred.reject("timeout");
        }, 10000);              
       	//Send the POST request.
       	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        //Return a promise.
       	xmlhttp.send(soap_request);
       	return deferred.promise;

	};

	return wsService;
	// var parseResult = function(){

	// };

}]);