var AccountApp = angular.module("AccountApp",[]);

AccountApp.controller("AccountControllers", function ($scope, $http, AccountService) {
    
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
        Username : "",
        Password : "",
        Fullname : "",
        Phone : "",
        Address : "",
        ManageBy : "",
        CreatBy : "",
        Status : ""
    };

    $scope.View = function (data) {
        console.log('i am inside view() + ');
        $scope.Account = {
            UserID: data.UserID,
            Username: data.Username,
            Password: data.Password,
            Fullname: data.Fullname,
            Phone: data.Phone,
            Address: data.Address,
            ManageBy: data.ManageBy,
            CreatBy: data.CreatBy,
            Status: data.Status,
        };
    };

    function LoadAccounts() {
        AccountService.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
        }, function () {
            alert('Unable to Get Data !!!');
        });

    }
});



AccountApp.factory('AccountService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/management/GetListUserOfCus');
    };

    console.log('i am inside Service ');

    return fac;
});
