﻿var AccountApp = angular.module("App", []);

AccountApp.controller('Controller', function ($scope, $http, Service) {
    LoadUser();
    $scope.ChangePassword = function(){
    $scope.Status = !$scope.Status;
    $scope.User.CreateDate = new Date(ParseInt($scope.User.CreateDate.substr(6)));
}

    $scope.update = function () {
        //nếu không trường nào bị null
        
            console.log('i am inside update funcr ' +
                JSON.stringify($scope.User));
            $http({
                method: 'POST',
                url: '/AccountInformation/UpdateUser',
                data: JSON.stringify($scope.User)
            }).then(function successCallback(response) {
                LoadUser();
                $scope.Clear();
                alert(response.data);
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        

    };
    $scope.Clear = function(){
        $scope.OldPassword = null;
        $scope.NewPassword = null;
        $scope.ConfirmPassword = null;

    }
    function LoadUser(){
    Service.GetAllRecords().then(function (d) {
        $scope.User = d.data;
    }, function () {
        alert('Unable to Get Data !!!');
    });
}
});



AccountApp.factory('Service', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/AccountInformation/GetUserInfo');
    };

    console.log('i am inside Service ');

    return fac;
});