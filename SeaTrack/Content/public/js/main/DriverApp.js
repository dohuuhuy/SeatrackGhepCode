var App = angular.module("LaiTauApp", ['angularUtils.directives.dirPagination']);

App.controller('Controller', function ($scope, $http, Service) {
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.namesData = [];
    LoadDriver();
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
    $scope.DeviceExtension = function(dateExpire,time) {
    console.log('date'+dateExpire);
    dateExpire.setDate(dateExpire.getDate() + time*30); // Set now + 30 days as the new date
    console.log('new date'+dateExpire);
    $scope.Device.ExpireDate = new Date(dateExpire);
    $scope.Device.DateExpired = new Date(dateExpire);
    }
    $scope.ClearSearch = function(){
    $scope.SearchKey = "";
    $scope.Status = null;
    }

    $scope.Driver = {
        DriverID: '',
        DriverName: '',
        Phone: '',
        Address: '',
        GPLT: '',
        CMND: '',
        Rank: '',
        IssuedBy: '',
        Note: '',
        ManageBy: '',
        Status: '',

    };

    $scope.View = function (data) {
        console.log('i am inside view() + ');
        $scope.Driver = {
            DriverID: data.DriverID,
            DriverName: data.DriverName,
            Phone: data.Phone,
            Address: data.Address,
            GPLT: data.GPLT,
            CMND: data.CMND,
            Note: data.Note,
            ManageBy: data.ManageBy,
            Status: data.Status

        };
    };
    $scope.NoDriverExist = function (No) {
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

    $scope.Save = function () {
        if ($scope.Driver.DriverName != "") {
            console.log('i am inside save func' + JSON.stringify($scope.Driver));
            $http({
                method: 'POST',
                url: '/Admin/Device/CreateDevice',
                data: JSON.stringify($scope.Driver)
            }).then(function successCallback(response) {
                LoadDriver();
                //$scope.namesData.push(response.data);
                $scope.Clear();
                alert(" Added Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };
    $scope.update = function () {
        //nếu không trường nào bị null
        console.log('i am inside update funcr ' +
            JSON.stringify($scope.Driver));
            $http({
                method: 'POST',
                url: '/Admin/Device/EditDevice',
                data: JSON.stringify($scope.Driver)
            }).then(function successCallback(response) {
                $scope.namesData = null;
                Service.GetAllRecords().then(function (d) {
                    $scope.namesData = d.data;
                }, function () {
                    alert('Unable to Get Data !!!');
                });
                $scope.Clear();
                alert(" Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        

    };
    $scope.Edit = function (data) {
        console.log('i am inside edit() ' + JSON.stringify($scope.Device));
        $scope.Driver = {
            DriverID: data.DriverID,
            DriverName: data.DriverName,
            Phone: data.Phone,
            Address: data.Address,
            GPLT: data.GPLT,
            CMND: data.CMND,
            Note: data.Note,
            ManageBy: data.ManageBy,
            Status: data.Status

        };
    };
    $scope.Clear = function () {
        $scope.Driver.DriverID = '',
            $scope.Driver.DriverName = '',
            $scope.Driver.Phone = '',
            $scope.Driver.Address = '',
            $scope.Driver.GPLT = '',
            $scope.Driver.CMND = '',
            $scope.Driver.Note = '',
            $scope.Driver.ManageBy = '',
            $scope.Driver.Status = ''

    };
    $scope.Cancel = function () {
        $scope.clear();

        console.log('i am inside cancel func' + JSON.stringify($scope.Driver));
    };

    $scope.Delete = function (index) {

        console.log('i am inside delete funcr' + JSON.stringify($scope.Driver));
        $http({
            method: 'GET',
            url: '/Admin/Device/DeleteDevice/' + $scope.namesData[index].DriverID
        }).then(function (response) {
            LoadDriver();
            alert(response.data);
        });
    };
    $scope.Unlock = function (index) {

        console.log('i am inside delete funcr' + JSON.stringify($scope.Driver));
        $http({
            method: 'GET',
            url: '/Admin/Device/UnlockDevice/' + $scope.namesData[index].DriverID
        }).then(function (response) {
            LoadDriver();
            alert(response.data);
        });
    };

    function LoadDriver() {
        Service.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
        }, function () {
            alert('Unable to Get Data !!!');
        });

    }
});



App.factory('Service', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/Management/GetListDriverByUserID');
    };

    console.log('i am inside Service ');

    return fac;
});
