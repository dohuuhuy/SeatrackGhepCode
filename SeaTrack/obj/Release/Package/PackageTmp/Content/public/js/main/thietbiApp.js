var DeviceApp = angular.module("ThietBiCuaKhachHangApp", ['angularUtils.directives.dirPagination']);

DeviceApp.controller('Controller', function ($scope, $http, DeviceService) {
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
        $scope.Device.ExpireDate = new Date(dateExpire);
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
        DeviceGroup: '',
        DateExpired: '',
        DeviceNote: '',
        TypeShip: ''

    };

   

    $scope.View = function (data) {
        console.log('i am inside view() ' + JSON.stringify($scope.Device));
        $scope.Device = {
            DeviceID: data.DeviceID,
            DeviceNo: data.DeviceNo,
            DeviceName: data.DeviceName,
            DeviceImei: data.DeviceImei,
            DeviceVersion: data.DeviceVersion,
            DeviceGroup: data.DeviceGroup,
            DateExpired: data.DateExpired,
            DeviceNote: data.DeviceNote,
            TypeShip: data.TypeShip
        };
        //$scope.Device.TypeShip = {
        //    '1': "Tàu nhỏ hơn 12 mét",
        //    '2': "Tàu từ 12 mét đến 15 mét",
        //    '3': "Tàu lớn hơn 15 mét"
        //}
    };

  

    function LoadDevice() {
        DeviceService.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
        }, function () {
            alert('Unable to Get Data !!!');
        });

    }
});



DeviceApp.factory('DeviceService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/Management/GetListDeviceByUserID');
    };

    console.log('i am inside Service ' + fac);

    return fac;
});
