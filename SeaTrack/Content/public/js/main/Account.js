var AccountApp = angular.module("AccountApp", ['angularUtils.directives.dirPagination']);

AccountApp.controller('AccountCtrl', function ($scope, $http, AccountService) {
    $scope.currentPage = 1;
    $scope.pageSize = 10;
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
        Username : "",
        Password : "",
        FullName : "",
        Phone : "",
        Address : "",
        ManageBy : "",
        CreateBy : "",
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
});



AccountApp.factory('AccountService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/Management/GetListUserOfCus');
    };
    console.log('i am inside Service ' + fac.GetAllRecords());

    return fac;
});
