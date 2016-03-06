/**
 * Created by Marek on 06.03.2016.
 */

var app = angular.module("app",[]);

app.controller("AppCtrl",function($scope,$http) {
    var app = this;

    $http.get("/api/pin").success(function (data) {
        app.pins = data.objects;
    });
})