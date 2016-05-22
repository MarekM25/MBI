/**
 * Created by Marek on 06.03.2016.
 */

var app = angular.module("app",[]);

app.controller("AppCtrl",function($scope,$http) {
    var app = this;
	
	$scope.medianSearchAlgorithm = function() {
        console.log($scope.dlugoscSekwencji);
        console.log($scope.sekwencje);
        medianSearch($scope.sekwencje,$scope.dlugoscSekwencji);
  }
  
  $scope.fillSampleData = function() {
	  $scope.dlugoscSekwencji = 3;
	  $scope.sekwencje = '101011';
  }
  
});

// X - tablica ciągów sekwencji
// t - ilość sekwencji
// n - długośc pojedynczej sekwencji
// l - długość szukanego motywu
