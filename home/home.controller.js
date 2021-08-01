(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'AuthenticationService', '$rootScope','FlashService'];
    function HomeController(UserService, AuthenticationService, $rootScope,FlashService) {
        var vm = this;
        vm.allCompany = [];
        vm.allCurrentUser = [];
        vm.register = register;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllCompany()
        }

        function loadAllCompany() {
            AuthenticationService.GetCompanies( function (response) {
               vm.allCompany = response;
            });
        }

        function loadCurrentUser() {
            UserService.GetAll()
            .then(function (response) {
                console.log('--------------',response);
                vm.allCurrentUser = response
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