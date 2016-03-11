/**
 * Created by Marek on 06.03.2016.
 */

var app = angular.module("app",[]);

app.controller("AppCtrl",function($scope,$http) {
    var app = this;
	
	
	$scope.msg = 'not clicked';
	
	  $scope.go = function() {

    $scope.msg = 'clicked';
  }
})