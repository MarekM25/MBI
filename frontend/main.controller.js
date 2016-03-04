(function () {
  'use strict';

  angular
    .module('MBI')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,usersService,companyService) {
    var vm = this;

	vm.test = '';

    var testFunc = function () {
      usersService.getUsers().success(function (test) {
        vm.test = test;
      });
    };

    testFunc();
  }
})();
