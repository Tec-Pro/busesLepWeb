angular.module('app')
.controller('CompCtrl', ['$scope', '$location', '$anchorScroll', 'wsService', 'companyService', function($scope, $location, $anchorScroll, wsService, companyService){

	$scope.active = companyService.getActiveTab();
	$scope.active_unit_tab = companyService.getActiveUnitTab();
	$scope.active_gall_img = 1;
	$scope.active_gall_thmb = 2;

	$scope.contact = {};
	$anchorScroll();

	$scope.go = function ( path ) {
      $location.path( path );
    };

	$scope.submit_contact = function(){
		var wsdl_url_web = "https://webservices.buseslep.com.ar:443/WebServices/WSLepPaginaWeb.dll/soap/IWSLepPaginaWeb";
		var urn = "WSLepPaginaWebIntf-IWSLepPaginaWeb";
		var contact_parameters = 
		[
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
				name: "DNI",
				type: "string",
				value: $scope.contact.dni
			},
			{
				name: "Nombre",
				type: "string",
				value: $scope.contact.first_name
			},
			{
				name: "Apellido",
				type: "string",
				value: $scope.contact.last_name
			},
			{
				name: "Email",
				type: "string",
				value: $scope.contact.email
			},
			{
				name: "Texto",
				type: "string",
				value: $scope.contact.text
			}
		];

		wsService.callService(wsdl_url_web, urn, "AgregarContacto", contact_parameters).then(function(response){
            if (response[0].Resul == 1){
            	display_response_modal();
            	$scope.contact = {};
            }
		});
	}

	$scope.set_active = function(tab){
		$scope.active = tab;
	}

	$scope.set_active_unit_tab = function(tab){
		$scope.active_unit_tab = tab;
	}

	$scope.images = [
		{
			thumbnail: "./img/company/thumbnail1.png",
			url: "./img/company/fullsize1.png"
		},
		{
			thumbnail: "./img/company/thumbnail2.png",
			url: "./img/company/fullsize2.png"
		},
		{
			thumbnail: "./img/company/thumbnail3.png",
			url: "./img/company/fullsize3.png"
		},
		{
			thumbnail: "./img/company/thumbnail4.png",
			url: "./img/company/fullsize4.png"
		},
		{
			thumbnail: "./img/company/thumbnail5.png",
			url: "./img/company/fullsize5.png"
		}
	]

	$scope.set_active_gall_img = function(pos){
		if (0 <= pos || pos <= 4){
			$scope.active_gall_img = pos;
		}
	}

	$scope.active_gall_img_right = function(){
		if ($scope.active_gall_img == 4){
			$scope.active_gall_img = 0;
		} else {
			$scope.active_gall_img++;
		}
	}


	$scope.active_gall_img_left = function(){
		if ($scope.active_gall_img == 0){
			$scope.active_gall_img = 4;
		} else {
			$scope.active_gall_img--;
		}
	}

	$scope.set_active_gall_thmb = function(pos){
    if (0 <= pos || pos <= 4){
      $scope.active_gall_thmb = pos;
      $scope.active_gall_img = pos;
    }
  };

  $scope.active_gall_thmb_right = function(){
    if ($scope.active_gall_thmb == 4){
      $scope.active_gall_thmb = 0;
      $scope.active_gall_img = 0;
    } else {
      $scope.active_gall_thmb++;
      $scope.active_gall_img++;
    }
  };


  $scope.active_gall_thmb_left = function(){
    if ($scope.active_gall_thmb == 0){
      $scope.active_gall_thmb = 4;
      $scope.active_gall_img = 0;
    } else {
      $scope.active_gall_thmb--;
      $scope.active_gall_img--;
    }
  };
		// Get the modal
	var modal = document.getElementById('my-comp-modal');

	// Get the button that opens the modal
	var btn = document.getElementById("comp-gall-btn");

	// When the user clicks the button, open the modal
	btn.onclick = function() {
	  modal.style.display = "block";
	}

	var display_modal = function(){
	  modal.style.display = "block";
	}

	var contact_modal = document.getElementById("response-modal");

	var display_response_modal = function(){
		contact_modal.style.display = "block";
	}

	$scope.hide_response_modal = function(){
		contact_modal.style.display = "none";
	}

	$scope.open_image = function(){
		display_modal();
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	      modal.style.display = "none";
	    }
	    if (event.target == contact_modal){
	    	contact_modal.style.display = "none";
	    }
	}
}]);
