﻿var app = angular.module("App", []);

app.controller("Controller", function ($scope, $http) {
    $scope.UserID = function (id, role, manageby) {
        $scope.id = id;
        $scope.role = role;
        $scope.manageby = manageby;
            fetchData(id);
            if (role == 3) {
    
}

        //GetListDeviceNotUsedByUser(id);
    }
    $scope.AddDevice = function (UserID, ManageBy) {
        if ($scope.role == 3) {
        GetListDeviceNotUsedByUser(UserID);
        }
        if ($scope.role == 4) {
        GetListDeviceOfCustomer(ManageBy, UserID);
        }
    }
    $scope.RemoveDeviceFromUser = function (UserID, index) {
        DeviceToRemove = $scope.Devices[index];
        var RemoveModel = { UserID: UserID, DeviceID: DeviceToRemove.DeviceID };
        $http({
            method: "POST",
            url: '/Admin/Device/RemoveDeviceFromUser/',
            data: RemoveModel
        }).then(function (response) {
            console.log(response, 'res');

        });
        $scope.Devices.splice(index, 1);
        $scope.DevicesNotUsed.push(DeviceToRemove);
        //fetchData(UserID);


    }

    $scope.AddDeviceToUser = function (UserID, index) {
        DeviceToAdd = $scope.DevicesNotUsed[index];
        var Model = { UserID: UserID, DeviceID: DeviceToAdd.DeviceID };
        $http({
            method: "POST",
            url: '/Admin/Device/AddDeviceToUser/',
            data: Model
        }).then(function (response) {
            console.log(response, 'res');

        });
        $scope.DevicesNotUsed.splice(index, 1);
        $scope.Devices.push(DeviceToAdd);

        //GetListDeviceNotUsedByUser(UserID);
        //fetchData(UserID);

    }

    $scope.LoadDevice = function (UserID) {
        fetchData(UserID);
    }
    function GetListDeviceNotUsedByUser(UserID) {
        $http({
            method: "GET",
            url: '/Admin/Device/GetListDeviceBelongToAgencyNotUsedByUser/' + UserID
        }).then(function (response) {
            console.log(response, 'res');
            if (response != '') {
                $scope.DevicesNotUsed = (response.data);
                for (var i = 0; i < $scope.DevicesNotUsed.length; i++) {
                    $scope.DevicesNotUsed[i]["DateExpired"] = new Date(parseInt($scope.DevicesNotUsed[i]["DateExpired"].substr(6)))
                    console.log($scope.DevicesNotUsed[i]["DateExpired"]);
                }
            }
        }, function (error) {
            console.log(error, 'can not get data.');
        });
    };
    function GetListDeviceOfCustomer(ManageBy, UserID) {
        var user = { UserID: UserID, ManageBy: ManageBy };
        $http({
            method: "POST",
            url: '/Admin/Device/GetListDeviceOfCustomer',
            data: user
        }).then(function (response) {
            console.log(response, 'res');
            if (response != '') {
                $scope.DevicesNotUsed = (response.data);
                for (var i = 0; i < $scope.DevicesNotUsed.length; i++) {
                    $scope.DevicesNotUsed[i]["DateExpired"] = new Date(parseInt($scope.DevicesNotUsed[i]["DateExpired"].substr(6)))
                    console.log($scope.DevicesNotUsed[i]["DateExpired"]);
                }
            }
        }, function (error) {
            console.log(error, 'can not get data.');
        });
    };

    function fetchData(UserID) {
        $http({
            method: "GET",
            url: '/Admin/Device/GetListDeviceByUserID/' + UserID
        }).then(function (response) {
            console.log(response, 'res');
            if (response != '') {
                $scope.Devices = (response.data);
                for (var i = 0; i < $scope.Devices.length; i++) {
                    $scope.Devices[i]["DateExpired"] = new Date(parseInt($scope.Devices[i]["DateExpired"].substr(6)))
                    console.log($scope.Devices[i]["DateExpired"]);
                }
            }

        }, function (error) {
            console.log(error, 'can not get data.');
        });
    };

})
