﻿var DeviceApp = angular.module("DeviceApp", ['angularUtils.directives.dirPagination']);

DeviceApp.controller('DeviceController', function ($scope, $http, DeviceService, $timeout) {
    $scope.loaded = false;
    $timeout(function () { $scope.loaded = true; }, 100);

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.namesData = [];
    LoadDevice();
    $scope.loadMessage = updateInfo();
    function updateInfo() {
        var today = new Date();
        return "Last updated " + today.toLocaleString() + ".";
    };
    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.namesData, function (item) {
            total++;
        });
        return total;
    };
    $scope.DeviceExtension = function (dateExpire, time) {
        console.log('date' + dateExpire);
        dateExpire.setDate(dateExpire.getDate() + time * 30); // Set now + 30 days as the new date
        console.log('new date' + dateExpire);
        $scope.Device.DateExpired = new Date(dateExpire);
    }
    $scope.ClearSearch = function () {
        $scope.SearchKey = "";
        $scope.Status = null;
    }

    $scope.Device = {
        DeviceID: '',
        DeviceNo: '',
        DeviceName: '',
        DeviceImei: '',
        DeviceVersion: '',
        TypeShip: '',
        DateExpired: '',
        DeviceNote: ''

    };



    $scope.View = function (data) {
        console.log('i am inside view() + ');
        $scope.Device = {
            DeviceID: data.DeviceID,
            DeviceNo: data.DeviceNo,
            DeviceName: data.DeviceName,
            DeviceImei: data.DeviceImei,
            DeviceVersion: data.DeviceVersion,
            TypeShip: data.TypeShip,
            DateExpired: data.DateExpired,
            DeviceNote: data.DeviceNote

        };
    };
    $scope.NoDeviceExist = function (No) {
        $scope.NoCheck = "alo";
        device = { DeviceNo: No };
        $http({
            method: 'POST',
            url: '/Admin/Device/CheckDeviceExist',
            data: device
        }).then(function successCallback(response) {
            console.log("No: " + $scope.Device.DeviceNo);
            console.log("Check: " + response.data.DeviceNo);
            $scope.NoCheck = response.data.DeviceNo;
        })
    }
    $scope.ImeiDeviceExist = function (Imei) {
        $scope.ImeiCheck = "alo";
        device = { DeviceImei: Imei };
        $http({
            method: 'POST',
            url: '/Admin/Device/CheckDeviceExist',
            data: device
        }).then(function successCallback(response) {
            console.log("Imei: " + $scope.Device.DeviceImei);
            console.log("Check: " + response.data.DeviceImei);
            $scope.ImeiCheck = response.data.DeviceImei;
        })
    }

    $scope.Save = function () {
        if ($scope.Device.DeviceName != "") {
            console.log('i am inside save func' + JSON.stringify($scope.Device));
            $http({
                method: 'POST',
                url: '/Admin/Device/CreateDevice',
                data: JSON.stringify($scope.Device)
            }).then(function successCallback(response) {
                LoadDevice();
                //$scope.namesData.push(response.data);
                $scope.Clear();
                alert(" Thêm mới thành công !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Hãy chắc rằng bạn đã nhập đầy đủ !!');
        }
    };
    $scope.update = function () {
        //nếu không trường nào bị null
        console.log('i am inside update funcr ' +
            JSON.stringify($scope.Customer));
        $http({
            method: 'POST',
            url: '/Admin/Device/EditDevice',
            data: JSON.stringify($scope.Device)
        }).then(function successCallback(response) {
            $scope.namesData = null;
            LoadDevice();
            $scope.Clear();
            alert(" Cập nhật mới thành công !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });


    };
    $scope.Edit = function (data) {
        console.log('i am inside edit() ' + JSON.stringify($scope.Device));
        $scope.Device = {
            DeviceID: data.DeviceID,
            DeviceNo: data.DeviceNo,
            DeviceName: data.DeviceName,
            DeviceImei: data.DeviceImei,
            DeviceVersion: data.DeviceVersion,
            TypeShip: data.TypeShip,
            DateExpired: data.DateExpired,
            DeviceNote: data.DeviceNote,
            //ExpireDate: new Date(parseInt(data.ExpireDate.substr(6)))


        };
    };
    $scope.Clear = function () {
        $scope.Device.DeviceID = '',
        $scope.Device.DeviceNo = '',
        $scope.Device.DeviceName = '',
        $scope.Device.DeviceImei = '',
        $scope.Device.DeviceVersion = '',
        $scope.Device.TypeShip = '',
        $scope.Device.DateExpired = '',
        $scope.Device.DeviceNote = ''

    };
    $scope.Cancel = function () {
        $scope.clear();

        console.log('i am inside cancel func' + JSON.stringify($scope.Device));
    };

    $scope.Delete = function (index) {

        console.log('i am inside delete funcr' + JSON.stringify($scope.Device));
        $http({
            method: 'GET',
            url: '/Admin/Device/DeleteDevice/' + $scope.namesData[index].DeviceID
        }).then(function (response) {
            LoadDevice();
            alert(response.data);
        });
    };
    $scope.Unlock = function (index) {

        console.log('i am inside delete funcr' + JSON.stringify($scope.Device));
        $http({
            method: 'GET',
            url: '/Admin/Device/UnlockDevice/' + $scope.namesData[index].DeviceID
        }).then(function (response) {
            LoadDevice();
            alert(response.data);
        });
    };

    function LoadDevice() {
        DeviceService.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
            for (var i = 0; i < $scope.namesData.length; i++) {
                $scope.namesData[i]["DateExpired"] = new Date(parseInt($scope.namesData[i]["DateExpired"].substr(6)))
                //console.log($scope.namesData[i]["DateExpired"]);
            }
        }, function () {
            alert('Không tìm thấy dữ liệu !!!');
        });
    }
});



DeviceApp.factory('DeviceService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/Admin/Device/GetListDevice');
    };
    return fac;
});
