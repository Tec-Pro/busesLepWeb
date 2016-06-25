angular.module('app').controller('SeatsController', function ($scope, $location, wsService){

	//ejemplo de seasson storage
	/*var user = {'name':'John'};
		sessionStorage.setItem('user', JSON.stringify(user));
		var obj = JSON.parse(sessionStorage.user);*/
	
	$scope.wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
	$scope.urn = 'LepWebServiceIntf-ILepWebService';
	$scope.method = 'EstadoButacasPlantaHorario';
	$scope.parameters = [
	{
		name: "userWS",
		type: "string",
		value: "UsuarioLep"
	},
	{
		name: "passWS",
		type: "string",
		value: "Lep1234"
	},
	{
		name: "IdEmpresa",
		type: "int",
		value: "1"
	},
	{
		name: "IdDestino",
		type: "int",
		value: "26"
	},
	{
		name: "CodHorario",
		type: "int",
		value: "959"
	},
	{
		name: "IdLocalidadDesde",
		type: "int",
		value: "10"
	},
	{
		name: "IdLocalidadHasta",
		type: "int",
		value: "1"
	},
	{
		name: "id_plataforma",
		type: "int",
		value: "3"
	}]

	const Occupied =  'img/occupied_seat.png';
    const Free =  'img/free_seat.png';
    const Selected = 'img/selected_seat.png';
    const None = 'img/none_seat.png';
    const Driver = 'img/driver_seat.png';

	
 	wsService.callService($scope.wsdl_url, $scope.urn, $scope.method, $scope.parameters).then(function(response){
 		
 		
 		
 		
		
 		 /*$scope.seatsArr = [
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
           	{img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
    	];*/
    	$scope.seatsArrGo = reallocateSeats(response);
    	$scope.seatsArrReturn = reallocateSeats(response);
    	
 	});

	function reallocateSeats(seatsToReallocate){
		var driverAdded = false;
		var result = [
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
           	{img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
            {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0}, {img: None,seatNum: 0},
    	];
		for (var i = 0; i < seatsToReallocate.length; i++) {
            col = seatsToReallocate[i].Columna;
            row = seatsToReallocate[i].Fila;
            ocu = seatsToReallocate[i].Ocupado;
            num = seatsToReallocate[i].NumButaca;
            index = 5 * (col - 1) + (row - 1);
            if(index > 59){
                index = 59;
            }
            if (ocu == 0)
                result[index].img = Free;
            else
                result[index].img = Occupied;
           result[index].seatNum = num;
        }

        if(result[59].img != None && result[58].img == None && result[54].img == None && result[53].img == None && result[48].img == None){ //un temita
            result[58].img = result[59].img;
            result[58].seatNum = result[59].seatNum;
            result[59].img = None;
            result[55].img = Driver;
            driverAdded = true;
        }

        for(var i=0; i<result.length;i += 5){ //hago el espejo de la "matriz"
            aux1 = 0;
            aux2 = 0;
            ind = i;
            for(var j = i+4; j > i+2; j-- ){
                aux1 =  result[j].img;
                aux2 = result[j].seatNum;
                result[j].img = result[ind].img;
                result[j].seatNum = result[ind].seatNum;
                result[ind].img = aux1;
                result[ind].seatNum = aux2;
                ind++;
            }
        }

        noneCount = 0;
        while (result[noneCount].img == None) { // cuenta la cantidad de lugares vacios de atras
            noneCount++;
        }
        noneCount = noneCount / 5;
        if (noneCount > 0){
            var i = 0;
            for (i = 0; i < result.length - noneCount * 5; i++) { //corre los asientos hacia atras, asi no queda nada en blanco
                result[i].img = result[noneCount * 5 + i].img;
                result[i].seatNum = result[noneCount * 5 + i].seatNum;
                result[noneCount * 5 + i].img = None;
            }
            auxArr = [];
            for(var j = 0; j < i; j++){ //achico el arreglo para sacarle los lugares de adelante que quedaron vacios
                //auxArr[j]. = result[j].img;
                //auxArr[j][1] = result[j].seatNum;
                auxArr[j] = { img: result[j].img,seatNum: result[j].seatNum};

            }
            result = auxArr.slice(0); //lo clona en teoria
        }
        var n = true;
        for(var i = result.length-1; i> result.length - 6; i--){ //me fijo si la ultima fila es nula
            n = n && result[i].img == None;
        }
        if(n){
            auxArr = [];
            for(var i = 0 ; i< result.length - 5; i++){
              //  auxArr[i][0] = result[i][0];
               // auxArr[i][1] = result[i][1];
                auxArr[i] = { img: result[i].img,seatNum: result[i].seatNum};

            }
            result = auxArr.slice(0);
        }

         var numcols = 5;// aca falta que se acomode la vista con el arreglo que esto es un bardo

       
        if(!driverAdded) {
            var z = true;
            for (var i = result.length - 1; i > result.length - numcols - 1; i--) { //me fijo si la ultima fila es nula
                z = z && result[i].img == None;
            }
            if (!z) {
                auxArr2 = []; //agrega una fila al ultimo
                for (var i = 0; i < result.length; i++) {
                    //auxArr2[i][0] = result[i][0];
                    //auxArr2[i][1] = result[i][1];
                    auxArr2[i] = { img: result[i].img,seatNum: result[i].seatNum};
                }
                for (var i = result.length; i < result.length + numcols; i++) {
                    //auxArr2[i][0] = None;
                    //auxArr2[i][1] = 0;
                    auxArr2[i] = { img: None,seatNum: 0};
                }
               // auxArr2[auxArr2.length - 1][0] = Driver; //agrego el conductor a la ultima fila
                //auxArr2[auxArr2.length - 1][1] = 0;
                auxArr2[auxArr2.length - 1] = { img: Driver,seatNum: 0};

                result = auxArr2.slice(0);
            } else {
                result[seatsArr.length - 1].img = Driver;
                result[seatsArr.length - 1].seatNum = 0;
            }
        }

        aux= result.slice(0); //invierte verticalmente la matriz
        var iAux=result.length-1;
        for(var i=0; i < result.length; i++){
            aux[iAux]=result[i];
            iAux--;
        }
        return aux.slice(0);
 

	};

    $scope.toggleImage = function(seat,position) {
    	//console.log(seat.seatNum);
    	var isSelection = 0;
    	var newImage = Free;
    	switch(seat.img) {
		    case Free: // selecciona
		       	isSelection = 1;
		       	newImage = Selected;
		        break;
		    case Selected: // deselecciona
		    	isSelection = 0;
		        break;
		     default: // seleccionado
		     	return;
		        break;
		}
    	pickSeatMethod = 'SeleccionarButaca';
		parametersPickSeat = [
		{
			name: "userWS",
			type: "string",
			value: "UsuarioLep"
		},
		{
			name: "passWS",
			type: "string",
			value: "Lep1234"
		},
		{
			name: "NroButaca",
			type: "int",
			value: seat.seatNum.toString()
		},
		{
			name: "IDVenta",
			type: "int",
			value: "8454"
		},
		{
			name: "EsIda",
			type: "int",
			value: "1"
		},
		{
			name: "EsSeleccion",
			type: "int",
			value: isSelection.toString()
		},
		{
			name: "id_plataforma",
			type: "int",
			value: "3"
		}]
		wsService.callService($scope.wsdl_url, $scope.urn, pickSeatMethod, parametersPickSeat).then(function(response){
			//console.log(response);
			if(response == '1' || response == '0' ){
				$scope.seatsArr[position].img = newImage;
			}
			
		});
		
    	/*switch($scope.seatsArr[seat.id].status) {
		    case 1: // libre
		       $scope.seatsArr[seat.id].img = 'img/selected_seat.png';
    			$scope.seatsArr[seat.id].status = 3;
		        break;
		    case 2: // ocupado no hace nada
		        break;
		    case 3: // seleccionado
		       $scope.seatsArr[seat.id].img = 'img/free_seat.png';
    			$scope.seatsArr[seat.id].status = 1;
		        break;
		}*/
        //seat.img = '../img/occupied_seat.png'
    };

    $scope.goDetails= function() {
    	$location.path('/details');	 
	};

	$scope.goBack = function () {
		window.history.back();
	}

	$scope.range = function(min, max, step){
	    step = step || 1;
	    var input = [];
	    for (var i = min; i <= max; i += step) input.push(i);
	    return input;
		};
});
