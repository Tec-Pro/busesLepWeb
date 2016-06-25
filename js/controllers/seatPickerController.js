angular.module('app').controller('SeatsController', function ($scope, $location, wsService){

	
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

	
 	wsService.callService($scope.wsdl_url, $scope.urn, $scope.method, $scope.parameters).then(function(origins){
 		seatsResponse = origins;
 		var driverAdded = false;
 		console.log(seatsResponse);
 		 $scope.seatsArr = [
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

    	for (var i = 0; i < seatsResponse.length; i++) {
            col = seatsResponse[i].Columna;
            row = seatsResponse[i].Fila;
            ocu = seatsResponse[i].Ocupado;
            num = seatsResponse[i].NumButaca;
            index = 5 * (col - 1) + (row - 1);
            if(index > 59){
                index = 59;
            }
            if (ocu == 0)
                $scope.seatsArr[index].img = Free;
            else
                $scope.seatsArr[index].img = Occupied;
            $scope.seatsArr[index].seatNum = num;
        }

        if($scope.seatsArr[59].img != None && $scope.seatsArr[58].img == None && $scope.seatsArr[54].img == None && $scope.seatsArr[53].img == None && $scope.seatsArr[48].img == None){ //un temita
            $scope.seatsArr[58].img = $scope.seatsArr[59].img;
            $scope.seatsArr[58].seatNum = $scope.seatsArr[59].seatNum;
            $scope.seatsArr[59].img = None;
            $scope.seatsArr[55].img = Driver;
            driverAdded = true;
        }

        for(var i=0; i<$scope.seatsArr.length;i += 5){ //hago el espejo de la "matriz"
            aux1 = 0;
            aux2 = 0;
            ind = i;
            for(var j = i+4; j > i+2; j-- ){
                aux1 =  $scope.seatsArr[j].img;
                aux2 = $scope.seatsArr[j].seatNum;
                $scope.seatsArr[j].img = $scope.seatsArr[ind].img;
                $scope.seatsArr[j].seatNum = $scope.seatsArr[ind].seatNum;
                $scope.seatsArr[ind].img = aux1;
                $scope.seatsArr[ind].seatNum = aux2;
                ind++;
            }
        }

        noneCount = 0;
        while ($scope.seatsArr[noneCount].img == None) { // cuenta la cantidad de lugares vacios de atras
            noneCount++;
        }
        noneCount = noneCount / 5;
        if (noneCount > 0){
            var i = 0;
            for (i = 0; i < $scope.seatsArr.length - noneCount * 5; i++) { //corre los asientos hacia atras, asi no queda nada en blanco
                $scope.seatsArr[i].img = $scope.seatsArr[noneCount * 5 + i].img;
                $scope.seatsArr[i].seatNum = $scope.seatsArr[noneCount * 5 + i].seatNum;
                $scope.seatsArr[noneCount * 5 + i].img = None;
            }
            auxArr = [];
            for(var j = 0; j < i; j++){ //achico el arreglo para sacarle los lugares de adelante que quedaron vacios
                //auxArr[j]. = $scope.seatsArr[j].img;
                //auxArr[j][1] = $scope.seatsArr[j].seatNum;
                auxArr[j] = { img: $scope.seatsArr[j].img,seatNum: $scope.seatsArr[j].seatNum};

            }
            $scope.seatsArr = auxArr.slice(0); //lo clona en teoria
        }
        var n = true;
        for(var i = $scope.seatsArr.length-1; i> $scope.seatsArr.length - 6; i--){ //me fijo si la ultima fila es nula
            n = n && $scope.seatsArr[i].img == None;
        }
        if(n){
            auxArr = [];
            for(var i = 0 ; i< $scope.seatsArr.length - 5; i++){
              //  auxArr[i][0] = $scope.seatsArr[i][0];
               // auxArr[i][1] = $scope.seatsArr[i][1];
                auxArr[i] = { img: $scope.seatsArr[i].img,seatNum: $scope.seatsArr[i].seatNum};

            }
            $scope.seatsArr = auxArr.slice(0);
        }

         var numcols = 5;// aca falta que se acomode la vista con el arreglo que esto es un bardo

       
        if(!driverAdded) {
            var z = true;
            for (var i = $scope.seatsArr.length - 1; i > $scope.seatsArr.length - numcols - 1; i--) { //me fijo si la ultima fila es nula
                z = z && $scope.seatsArr[i].img == None;
            }
            if (!z) {
                auxArr2 = []; //agrega una fila al ultimo
                for (var i = 0; i < $scope.seatsArr.length; i++) {
                    //auxArr2[i][0] = $scope.seatsArr[i][0];
                    //auxArr2[i][1] = $scope.seatsArr[i][1];
                    auxArr2[i] = { img: $scope.seatsArr[i].img,seatNum: $scope.seatsArr[i].seatNum};
                }
                for (var i = $scope.seatsArr.length; i < $scope.seatsArr.length + numcols; i++) {
                    //auxArr2[i][0] = None;
                    //auxArr2[i][1] = 0;
                    auxArr2[i] = { img: None,seatNum: 0};
                }
               // auxArr2[auxArr2.length - 1][0] = Driver; //agrego el conductor a la ultima fila
                //auxArr2[auxArr2.length - 1][1] = 0;
                auxArr2[auxArr2.length - 1] = { img: Driver,seatNum: 0};

                $scope.seatsArr = auxArr2.slice(0);
            } else {
                $scope.seatsArr[seatsArr.length - 1].img = Driver;
                $scope.seatsArr[seatsArr.length - 1].seatNum = 0;
            }
        }

        aux= $scope.seatsArr.slice(0); //invierte verticalmente la matriz
        var iAux=$scope.seatsArr.length-1;
        for(var i=0; i < $scope.seatsArr.length; i++){
            aux[iAux]=$scope.seatsArr[i];
            iAux--;
        }
        $scope.seatsArr= aux.slice(0);

 	});

 	

   

	$scope.seats = [];
	$scope.seats.push({ img: Driver,status: 4, id: 0});
	$scope.seats.push({ img: None,status: 0, id: 1});
	$scope.seats.push({ img: None,status: 0, id: 2});
	$scope.seats.push({ img: None,status: 0, id: 3});
	$scope.seats.push({ img: None,status: 0, id: 4});
	for (var i = 5; i < 65; i++) {
		if(i % 5 == 2 || i % 5 == 3){
			$scope.seats.push({ img: 'img/none_seat.png',status: 0, id: i});
		}
		else{
			$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: i});
		}
	};
	$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 65});
	$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 66});
	$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 67});
	$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 68});
	$scope.seats.push({ img: 'img/free_seat.png',status: 1, id: 69});

    $scope.toggleImage = function(seat) {
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
