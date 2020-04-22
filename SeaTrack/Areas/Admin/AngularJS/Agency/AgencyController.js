﻿myapp.controller('AgencyController', function ($scope, $window, AgencyService) {
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.Role = function (role) {
        $scope.role = role;
        if(role == 3){

            $scope.Customers = [];
            LoadListCustomer();
        }
        if(role == 4){
            $scope.Users = [];
            LoadListUser();
        }

    }
    function LoadListCustomer() {
        var lstAg = AgencyService.ListUser(3)
        lstAg.then(function (d) {
            $scope.Customers = d.data;
            for (var i = 0; i < $scope.Customers.length; i++) {
                $scope.Customers[i]["CreateDate"] = new Date(parseInt($scope.Customers[i]["CreateDate"].substr(6)))
                console.log($scope.Customers[i]["CreateDate"]);
            }
        },
            function () {
                alert("Không thể load danh sách đại lý")
            });
    }
    function LoadListUser() {
        var lstAg = AgencyService.GetListUserOfAgency()
        lstAg.then(function (d) {
            $scope.Users = d.data;
            for (var i = 0; i < $scope.Users.length; i++) {
                $scope.Users[i]["CreateDate"] = new Date(parseInt($scope.Users[i]["CreateDate"].substr(6)))
                console.log($scope.Users[i]["CreateDate"]);
            }
        },
            function () {
                alert("Không thể load danh sách đại lý")
            });
    }

    function Resetsave() {
        $scope.Username = "";
        $scope.Password = "";
        $scope.Fullname = "";
        $scope.Phone = "";
        $scope.Address = "";
        $scope.ManageBy = "";
    }
    $scope.ClearSearch = function(){
        $scope.SearchKey = "";
        $scope.Status = null;
    }

    $scope.Resetsave = function () {
        Resetsave();
    }
    $scope.AddUser = function(){
        LoadListCustomer();
    }

    $scope.UsernameExist = function (Username) {
        $scope.UsernameCheck = "OK";
        var r = AgencyService.CheckUsername(Username)
        r.then(function successCallback(response) {
            $scope.UsernameCheck = response.data;
        })
    }

    $scope.save = function () {
        var user = {
            Username: $scope.Username,
            Password: $scope.Password,
            Fullname: $scope.Fullname,
            Phone: $scope.Phone,
            Address: $scope.Address,
            ManageBy: $scope.ManageBy
        };
        if($scope.role == 2){
            var saverecord = AgencyService.save(user, 2);
        }
        if($scope.role == 3){
            var saverecord = AgencyService.save(user, 3);
        }
        if($scope.role == 4){
            var saverecord = AgencyService.save(user, 4);
        }

        saverecord.then(function (d) {
            if (d.data.success === true) {
                if($scope.role == 2){
                    LoadListAgency();
                }
                if($scope.role == 3){
                    LoadListCustomer();
                }
                if ($scope.role == 4) {
                    LoadListUser();
                } 
                alert("Thêm thành công");
                Resetsave();
            }
        })
    }
    $scope.LockUser = function(UserID){
        var res = AgencyService.LockUser(UserID);
        res.then(function(d) {
            alert(d.data)
            if($scope.role == 3){
                LoadListCustomer();
            }
            if ($scope.role == 4) {
                LoadListUser();
            }
        })
    }

    $scope.UnLockUser = function(UserID){
        var res = AgencyService.UnLockUser(UserID);
        res.then(function(d) {
            alert(d.data)
            if($scope.role == 3){
                LoadListCustomer();
            }
            if ($scope.role == 4) {
                LoadListUser();
            }
        })
    }

    $scope.DeleteUser = function (UserID) {
        console.log(UserID);
        if (confirm("bạn có muốn xóa ?", "thông báo")) {

            var res = AgencyService.DeleteUser(UserID);
            res.then(function (d) {
                alert(d.data);
                if ($scope.role == 3) {
                    LoadListCustomer();
                }
                if ($scope.role == 4) {
                    LoadListUser();
                }
            })

        }
    }

})