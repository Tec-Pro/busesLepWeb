angular.module('app').controller('SeatsController', ['$scope', '$location', '$anchorScroll', 'wsService', 'tripService', 'scheduleService', function ($scope, $location, $anchorScroll, wsService, tripService, scheduleService){
    $anchorScroll();  
    wsdl_url = 'https://webservices.buseslep.com.ar:443/WebServices/WebServiceLepCEnc.dll/soap/ILepWebService';
    urn = 'LepWebServiceIntf-ILepWebService';
    var sell_code = tripService.getSellCode();
    var trip = tripService.getDepartureTrip();
    var schedule = scheduleService.getSchedule();
    var scheduleReturn = scheduleService.getScheduleReturn();
    window.scrollTo(0,1);
    if(sell_code == undefined || schedule==undefined){
        $location.path('/'); 
    }
    $scope.passengers = tripService.getPassengers();
    $scope.isRoundTrip = tripService.getDepartureTrip().round_trip === 1;
    $scope.seatsSelectedGo = [];
    $scope.seatsSelectedReturn = [];
    const Occupied =  'img/seatpicker/occupied_seat.png';
    const Free =  'img/seatpicker/free_seat.png';
    const Selected = 'img/seatpicker/selected_seat.png';
    const None = 'img/seatpicker/none_seat.png';
    const Driver = 'img/seatpicker/driver_seat.png';

    seatsWsCall(schedule.Id_Empresa,schedule.id_destino,schedule.cod_horario,trip.origin_id,trip.destination_id,true);
    if($scope.isRoundTrip){
        seatsWsCall(scheduleReturn.Id_Empresa,scheduleReturn.id_destino,scheduleReturn.cod_horario,trip.destination_id, trip.origin_id, false);
    }
    function seatsWsCall(companyId,destintionId,scheduleCode,originId,destinationId,isGo){
        parameters = [
        {
            name: "IdEmpresa",
            type: "int",
            value: companyId.toString()
        },
        {
            name: "IdDestino",
            type: "int",
            value: destintionId.toString()
        },
        {
            name: "CodHorario",
            type: "int",
            value: scheduleCode.toString()
        },
        {
            name: "IdLocalidadDesde",
            type: "int",
            value: originId.toString()
        },
        {
            name: "IdLocalidadHasta",
            type: "int",
            value: destinationId.toString()
        },
        {
            name: "id_plataforma",
            type: "int",
            value: "3"
        }]
        wsService.callService(wsdl_url, urn, 'EstadoButacasPlantaHorario', parameters, true).then(function(response){
            console.log(response);
            if (response["length"] > 1){
                if(isGo){
                    $scope.seatsArrGo = reallocateSeats(response);
                }
                else{
                    $scope.seatsArrReturn = reallocateSeats(response);
                } 
            } else {
                for (var i = 0; i < $scope["passengers"]; i++){
                    if ($scope.isRoundTrip){
                        autoPick($scope["passengers"], 1);
                        autoPick($scope["passengers"], 0);
                    } else {
                        autoPick($scope["passengers"],1);   
                    }
                    $location["path"]("/details");
                }
            }
        });
    };

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

    function autoPick(amount, go) {
        parametersPickSeat = [
        {
            name: "NroButaca",
            type: "int",
            value: "100"
        },
        {
            name: "IDVenta",
            type: "int",
            value: sell_code.toString()
        },
        {
            name: "EsIda",
            type: "int",
            value: go
        },
        {
            name: "EsSeleccion",
            type: "int",
            value: "1"
        },
        {
            name: "id_plataforma",
            type: "int",
            value: "3"
        }]

        wsService.callService(wsdl_url,urn, 'SeleccionarButaca', parametersPickSeat, true).then(function(response){
            console.log(response)
            if(response == '1'){
                if(go == 1){
                    $scope.seatsSelectedGo.push("-");
                    tripService.saveSelectedSeatsGo($scope.seatsSelectedGo);
                }
                else{
                    $scope.seatsSelectedReturn.push("-");
                    tripService.saveSelectedSeatsReturn($scope.seatsSelectedReturn);
                }
            } else if (response == '-1'){
                alert("Error: Asientos ocupados");
                $location.path("/schedules");
            } else if (response == '-2'){
                alert("Error: No hay asientos para seleccionar");
                $location.path("/schedules");
            }
        });
    }

    $scope.toggleSeat = function(seat,position,isGo) {
        var isSelection = 0;
        var newImage = Free;
        var isIda = "1";
        if(!isGo){
            isIda = "0";
        }
        switch(seat.img) {
            case Free: // selecciona
                //console.log("free");
                   isSelection = 1;
                   newImage = Selected;
                break;
            case Selected: // deselecciona
                //console.log("deselected");
                isSelection = 0;
                break;
             default: // seleccionado
                 return;
                break;
        }
        parametersPickSeat = [
        {
            name: "NroButaca",
            type: "int",
            value: seat.seatNum.toString()
        },
        {
            name: "IDVenta",
            type: "int",
            value: sell_code.toString()
        },
        {
            name: "EsIda",
            type: "int",
            value: isIda
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
        
            wsService.callService(wsdl_url,urn, 'SeleccionarButaca', parametersPickSeat, true).then(function(response){
                if(response == '1'){
                    if(isGo){
                        $scope.seatsArrGo[position].img = newImage;
                        $scope.seatsSelectedGo.push(seat.seatNum);
                    }
                    else{
                        $scope.seatsArrReturn[position].img = newImage;
                        $scope.seatsSelectedReturn.push(seat.seatNum);
                    }
                }
                if(response == '0'){
                    if(isGo){
                        $scope.seatsArrGo[position].img = newImage;
                        var index = $scope.seatsSelectedGo.indexOf(seat.seatNum);
                        if (index > -1) {
                            $scope.seatsSelectedGo.splice(index, 1);
                        }
                    }
                    else{
                        $scope.seatsArrReturn[position].img = newImage;
                        var index = $scope.seatsSelectedReturn.indexOf(seat.seatNum);
                        if (index > -1) {
                            $scope.seatsSelectedReturn.splice(index, 1);
                        }
                    }               
                }
            });
        
    };

    $scope.goBuy = function() {
        if($scope.seatsSelectedGo.length != $scope.passengers){
            alert("Quedan asientos de Ida sin seleccionar");
            return;
        }
        if($scope.isRoundTrip && $scope.seatsSelectedReturn.length != $scope.passengers){
            alert("Quedan asientos de Vuelta sin seleccionar");
            return;
        }     
        tripService.saveSelectedSeatsGo($scope.seatsSelectedGo);
        tripService.saveSelectedSeatsReturn($scope.seatsSelectedReturn);
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
}]);
