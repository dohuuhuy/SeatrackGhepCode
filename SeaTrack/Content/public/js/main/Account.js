﻿var AccountApp = angular.module("AccountApp", ['angularUtils.directives.dirPagination']);

AccountApp.controller('AccountCtrl', function ($scope, $http, AccountService) {
    $scope.currentPage = 1;
    $scope.pageSize = 3;
    $scope.namesData = [];
    //$scope.loadMessage = updateInfo();
    LoadAccounts();

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

    $scope.Account = {
        UserID: "",
        Username: "",
        Password: "",
        FullName: "",
        Phone: "",
        Address: "",
        ManageBy: "",
        CreateBy: "",
        Status: "",
        Image: ""
    };

    $scope.View = function (data) {
        console.log('i am inside view() + ' + data);
        $scope.Account = {
            UserID: data.UserID,
            Username: data.Username,
            Password: data.Password,
            FullName: data.FullName,
            Phone: data.Phone,
            Address: data.Address,
            ManageBy: data.ManageBy,
            CreateBy: data.CreateBy,
            Status: data.Status,
            Image: data.Image
        };
    };
    $scope.Save = function () {
        if ($scope.Account.Username != "") {
            console.log('i am inside save func' + JSON.stringify($scope.Account));
            $http({
                method: 'POST',
                url: '/Management/CreateUser',
                data: JSON.stringify($scope.Account)
            }).then(function successCallback(response) {

                // $scope.namesData.push(response.data);
                LoadAccounts();
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
            JSON.stringify($scope.Account));
        $http({
            method: 'POST',
            url: '/Management/EditUsers',
            data: JSON.stringify($scope.Account)
        }).then(function successCallback(response) {
            $scope.namesData = null;

            AccountService.GetAllRecords().then(function (d) {
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
        $scope.Account = {
            UserID: data.UserID,
            Username: data.Username,
            Password: data.Password,
            FullName: data.FullName,
            Phone: data.Phone,
            Address: data.Address,
            ManageBy: data.ManageBy,
            CreateBy: data.CreateBy,
            Status: data.Status,
            Image: data.Image
        };
        fetchData($scope.Account.UserID);
    };
    $scope.Clear = function () {
        $scope.Account.UserID = '',
            $scope.Account.Username = '',
            $scope.Account.FullName = '',
            $scope.Account.Phone = '',
            $scope.Account.Address = '',
            $scope.Account.CreateBy = '',
            $scope.Account.ManageBy = '',
            $scope.Account.Status = ''

    };
    $scope.Cancel = function () {
        $scope.clear();

        console.log('i am inside cancel func' + JSON.stringify($scope.Account));
    };

    $scope.Lock = function (index) {

        console.log('i am inside khóa funcr' + JSON.stringify($scope.Account));
        $http({
            method: 'GET',
            url: '/Management/LockUsers/' + $scope.namesData[index].UserID
        }).then(function (response) {
            LoadAccounts();
            alert(response.data);
        });
    };
    $scope.Unlock = function (index) {

        console.log('i am inside mở khóa funcr' + JSON.stringify($scope.Account));
        $http({
            method: 'GET',
            url: '/Management/UnlockUsers/' + $scope.namesData[index].UserID
        }).then(function (response) {
            LoadAccounts();
            alert(response.data);
        });
    };

    function LoadAccounts() {
        AccountService.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
        }, function () {
            alert('Unable to Get Data !!!');
        });

    }
    // -------------------------- Cấp thiết bị   ------------------------------------------------//
    $scope.UserID = function ( id, role, manageby, Username) {
        $scope.role = role;
        $scope.id = id;
        $scope.manageby = manageby;
        $scope.Username = Username;

    }
    //Lấy danh sách thiết bị của khách hàng chưa được sử dụng
    $scope.AddDevice = function (Username) {
        GetListDeviceNotUsedByUser(Username);
    }
    // xóa thiết bị được cấp và thêm vào list thiết bị không sử dụng
    $scope.RemoveDeviceFromUser = function (UserID, index) {
        DeviceToRemove = $scope.DevicesNotUsed[index];
        var RemoveModel = { Us, DeviceID: DeviceToRemove.DeviceID };
        $http({
            method: "POST",
            url: '/Management/RemoveDeviceFromUser/',
            data: RemoveModel
        }).then(function (response) {
            console.log(response, 'res');

        });

        $scope.Devices.splice(index, 1);
        $scope.DevicesNotUsed.push(DeviceToRemove);
    }
    // cấp thiết bị cho người dùng và xóa thiết bị ra khỏi list thiết bị không sử dụng
    $scope.AddDeviceToUser = function (UserID, index) {
        DeviceToAdd = $scope.DevicesNotUsed[index];
        var Model = { UserID: UserID, DeviceID: DeviceToAdd.DeviceID };
        $http({
            method: "POST",
            url: '/Management/AddDeviceToUser/',
            data: Model
        }).then(function (response) {
            console.log(response, 'res');

        });
        $scope.DevicesNotUsed.splice(index, 1);
        $scope.Devices.push(DeviceToAdd);
    }

    // lấy danh sách thiết bị chưa được sử dụng của người dùng --> 
    function GetListDeviceNotUsedByUser(Username) {
        $http({
            method: "GET",
            url: '/Management/GetListDeviceNotUsedByUser/' + Username
        }).then(function (response) {
            console.log(response, 'res');
            $scope.DevicesNotUsed = response.data;
        }, function (error) {
            console.log(error, 'can not get data.');
        });
        };

        // lấy danh sach thiết bị của người dùng theo id trong list của khách hàng
        // oke chạy
        function fetchData(UserID) {
            $http({
                method: "GET",
                url: '/Management/GetListDeviceByUserID/' + UserID
            }).then(function (response) {
                console.log(response, 'res');
                $scope.Devices = response.data;
            }, function (error) {
                console.log(error, 'can not get data.');
            });
        };
});

AccountApp.factory('AccountService', function ($http) {
    var Acc = {};
    Acc.GetAllRecords = function () {
        return $http.get('/Management/GetListUserOfCus');
    };
    return Acc;
});
