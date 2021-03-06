﻿
var App = angular.module("LaiTauApp", ['angularUtils.directives.dirPagination']);

App.controller('Controller', function ($scope, $http, Service) {
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.namesData = [];
    $scope.DevicesNotUsed = [];
    $scope.AddDeviceToUser = [];
    LoadDriver();
    $scope.loadMessage = updateInfo();

    $scope.loading = function (id) {
        console.log('--------------: ' + id);
        //fetchdata(id);
    }
    function updateInfo() {
        var today = new Date();
        return "Last updated " + today.toLocaleString() + ".";
    };

   

    $scope.CheckCMND = function (CMND) {
        console.log('cmnd: ' + CMND);
        $scope.CMNDexists = "OK";
        var x = { CMND: CMND };
        $http({
            method: 'POST',
            url: '/Management/CheckCMND',
            data: x
        }).then(function (response) {
            console.log(response, 'kiểm tra tồn tại' );
            $scope.CMNDexists = response.data;
        });
    }


    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.namesData, function (item) {
            total++;
        });
        return total;
    };
    $scope.ClearSearch = function () {
        $scope.SearchKey = "";
        $scope.Status = null;
    }
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
        CreateDateGPLT: '',
        ExpriseDateGPLT: '',
        CreateDate: ''

    };


    $scope.View = function (data) {
        $scope.Driver = {
            DriverID: data.DriverID,
            DriverName: data.DriverName,
            Phone: data.Phone,
            Address: data.Address,
            GPLT: data.GPLT,
            CMND: data.CMND,
            Rank: data.Rank,
            Note: data.Note,
            ManageBy: data.ManageBy,
            Status: data.Status,
            CreateDateGPLT: new Date(parseInt(data.CreateDateGPLT.substr(6))),
            ExpriseDateGPLT: new Date(parseInt(data.ExpriseDateGPLT.substr(6))),
            IssuedBy: data.IssuedBy,
            CreateDate: new Date(parseInt(data.CreateDate.substr(6))),

        };
        console.log('i am inside view()' + JSON.stringify($scope.Driver.DriverID));

        fetchData($scope.Driver.DriverID);

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
                url: '/Management/CreateDriver',
                data: JSON.stringify($scope.Driver)
            }).then(function successCallback(response) {
                LoadDriver();
                //$scope.namesData.push(response.data);
                $scope.Clear();
                alert(" Thêm mới thành công !");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Hãy nhập đủ thông tin !!');
        }
    };
    $scope.update = function () {
        //nếu không trường nào bị null
        console.log('i am inside update funcr ' +
            JSON.stringify($scope.Driver));
        $http({
            method: 'POST',
            url: '/Management/EditDriver',
            data: JSON.stringify($scope.Driver)
        }).then(function successCallback(response) {
            $scope.namesData = null;
            Service.GetAllRecords().then(function (d) {
                $scope.namesData = d.data;
            }, function () {
                alert('Không có dữ liệu !!!');
            });
            $scope.Clear();
            alert(" Cập nhật thành công !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });


    };
    $scope.Edit = function (data) {
        $scope.Driver = {
            DriverID: data.DriverID, 
            DriverName: data.DriverName, 
            Phone: data.Phone, 
            Address: data.Address, 
            GPLT: data.GPLT, 
            CMND: data.CMND,
            Rank: data.Rank,
            Note: data.Note, 
            CreateDateGPLT: new Date(parseInt(data.CreateDateGPLT.substr(6))),
            ExpriseDateGPLT: new Date(parseInt(data.ExpriseDateGPLT.substr(6))),
            IssuedBy: data.IssuedBy, 
        };
        console.log('i am inside edit() ' + JSON.stringify($scope.Driver));
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
            $scope.Driver.IssuedBy = '',
            $scope.Driver.CreateDateGPLT = '',
            $scope.Driver.ExpriseDateGPLT = ''

    };
    $scope.Cancel = function () {
        $scope.clear();

        console.log('i am inside cancel func' + JSON.stringify($scope.Driver));
    };

    $scope.Lock = function (index) {

        console.log('i am inside khóa funcr' + JSON.stringify($scope.Driver));
        if (confirm("Bạn có muốn Khóa lái tàu ?", "thông báo")) {
            $http({
                method: 'GET',
                url: '/Management/LockDriver/' + $scope.namesData[index].DriverID
            }).then(function (response) {
                LoadDriver();
                alert(response.data);
            });
        }
    };
    $scope.Unlock = function (index) {

        console.log('i am inside mở khóa funcr' + JSON.stringify($scope.Driver));
        $http({
            method: 'GET',
            url: '/Management/UnlockDriver/' + $scope.namesData[index].DriverID
        }).then(function (response) {
            LoadDriver();
            alert(response.data);
        });
    };

    function LoadDriver() {
        Service.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
        }, function () {
            alert('Không có dữ liệu !!!');
        });

    }

    // -------------------------- Cấp thiết bị   ------------------------------------------------//
    $scope.UserID = function (name) {

        $scope.name = name;

    }


    //Lấy danh sách thiết bị của khách hàng chưa được sử dụng
    $scope.AddDevice = function () {
        GetListDeviceOfCustomer();
    }
    // xóa thiết bị được cấp và thêm vào list thiết bị không sử dụng
    $scope.RemoveDeviceFromUser = function (index) {
        DeviceToRemove = $scope.Devices[index];
        id = $scope.Driver.DriverID;
        var RemoveModel = { UserID: id, DeviceID: DeviceToRemove.DeviceID };
        $http({
            method: "POST",
            url: '/Management/RemoveDeviceFromUserWithDriver/',
            data: RemoveModel
        }).then(function (response) {
            
        });

        $scope.Devices.splice(index, 1);
        $scope.DevicesNotUsed.push(DeviceToRemove);
        //fetchData(id);
    }
    // cấp thiết bị cho người dùng và xóa thiết bị ra khỏi list thiết bị không sử dụng
    $scope.AddDeviceToUser = function (index) {
        DeviceToAdd = $scope.DevicesNotUsed[index];
        id = $scope.Driver.DriverID;
        console.log(id);
        var Model = { UserID: id, DeviceID: DeviceToAdd.DeviceID };
        $http({
            method: "POST",
            url: '/Management/AddDeviceToUserWithDriver/',
            data: Model
        }).then(function (response) {

        });
        $scope.DevicesNotUsed.splice(index, 1);
        $scope.Devices.push(DeviceToAdd);
        //fetchData(id);
    }
    $scope.SaveDevice = function (id) {
        fetchData(id);
    }
    // lấy danh sách thiết bị chưa được sử dụng của người dùng --> 
    function GetListDeviceOfCustomer() {
        $http({
            method: "GET",
            url: '/Management/GetListDeviceOfCustomerWithDriver'
        }).then(function (response) {
            console.log(response, 'res');
            $scope.DevicesNotUsed = response.data;
            for (var i = 0; i < $scope.namesData.length; i++) {
                $scope.DevicesNotUsed[i]["DateExpired"] = new Date(parseInt($scope.DevicesNotUsed[i]["DateExpired"].substr(6)));
            }
        }, function (error) {
            console.log(error, 'Không có dữ liệu.');
        });
    };

    // lấy danh sach thiết bị của người dùng theo id trong list của khách hàng
    // oke chạy
    function fetchData(DriverID) {
        $http({
            method: "GET",
            url: '/Management/GetListDeviceByDriverID/' + DriverID
        }).then(function (response) {
            console.log(response, 'resi');
            if (response != '') {
                $scope.Devices = response.data;
                for (var i = 0; i < $scope.namesData.length; i++) {
                    $scope.Devices[i]["DateExpired"] = new Date(parseInt($scope.Devices[i]["DateExpired"].substr(6)));
                }
            } 
        }, function (error) {
            console.log(error, 'Không có dữ liệu');
        });
    };
});



App.factory('Service', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/Management/GetListDriverByUserID');
    };
    console.log('i am inside Service ');

    return fac;
});
