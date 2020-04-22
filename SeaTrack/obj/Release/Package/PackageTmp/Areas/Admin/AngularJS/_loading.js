var app = angular.module('Loading', [])

app.controller("LoadCtrl", ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.loaded = false;

    $timeout(function () { $scope.loaded = true; }, 5000);
}]);