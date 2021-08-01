(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService','AuthenticationService'];
    function RegisterController(UserService, $location, $rootScope, FlashService,AuthenticationService) {
        var vm = this;
        vm.register = register;
        vm.allCompany = [];
        
        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            AuthenticationService.GetCompanies( function (response) {
               vm.allCompany = response;
            });
        }

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    console.log('+++++++++++++++++',response);
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        vm.dataLoading = false;
                         $location.path('/');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
