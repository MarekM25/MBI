(function () {
  'use strict';

  angular
    .module('MBI')
    .service('usersService', usersService);

  /** @ngInject */
  function usersService($http, $q) {

    this.testFunc = function () {
      return $http.get('/hello');
    };
    };

})();
