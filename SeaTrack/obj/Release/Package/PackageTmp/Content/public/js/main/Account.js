var AccountApp = angular.module("AccountApp", ['angularUtils.directives.dirPagination']);

AccountApp.controller('AccountCtrl', function ($scope, $http, AccountService) {
    $scope.currentPage = 1;
    $scope.pageSize = 3;
    $scope.namesData = [];
    //$scope.loadMessage = updateInfo();
    LoadAccounts();

    $scope.ClearSearch = function () {
        $scope.SearchKey = "";
        $scope.Status = null;
    }
    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.namesData, function (item) {
            total++;
        });
        return total;
    };

    $scope.CheckUsername = function (Username) {
        $scope.UsernameCheck = "OK";
        var User = { Username: Username };
        $http({
            method: 'POST',
            url: '/Management/CheckUsername',
            data: User
        }).then(function (response) {
            console.log(response, 'kiểm tra tồn tại' + $scope.Account.FullName);
            $scope.UsernameCheck = response.data;
        });
    }
    $scope.loading = function (id) {
      
    }
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
        fetchData($scope.Account.UserID);
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
                alert(" Thêm mới thành công !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Hãy chắc chắn rằng bạn đã nhập đủ các trường !!');
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
                alert('Không có dữ liệu !!!');
            });
            $scope.Clear();
            alert(" Cập nhật thành công !!!");
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
        if (confirm("Bạn có muốn khóa người dùng ?", "thông báo")) {
            $http({
                method: 'GET',
                url: '/Management/LockUsers/' + $scope.namesData[index].UserID
            }).then(function (response) {
                LoadAccounts();
                alert(response.data);
            });
        }

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
            alert('Không có dữ liệu !!!');
        });

    }
    // -------------------------- Cấp thiết bị   ------------------------------------------------//
    $scope.UserID = function (name) {

        $scope.name = name;

    }
    //Lấy danh sách thiết bị của khách hàng chưa được sử dụng
    $scope.AddDevice = function () {
        GetListDeviceOfCustomer($scope.Account.UserID);
    }
    // xóa thiết bị được cấp và thêm vào list thiết bị không sử dụng
    $scope.RemoveDeviceFromUser = function (index) {
        DeviceToRemove = $scope.Devices[index];
        id = $scope.Account.UserID;
        var RemoveModel = { UserID: id, DeviceID: DeviceToRemove.DeviceID };
        $http({
            method: "POST",
            url: '/Management/RemoveDeviceFromUser/',
            data: RemoveModel
        }).then(function (response) {
            console.log(response, 'Bỏ cấp thiết bị cho người dùng' + $scope.Account.FullName);

        });

        $scope.Devices.splice(index, 1);
        $scope.DevicesNotUsed.push(DeviceToRemove);
      //  fetchData(id);
    }
    // cấp thiết bị cho người dùng và xóa thiết bị ra khỏi list thiết bị không sử dụng
    $scope.AddDeviceToUser = function (index) {
        DeviceToAdd = $scope.DevicesNotUsed[index];
        id = $scope.Account.UserID;
        var Model = { UserID: id, DeviceID: DeviceToAdd.DeviceID };
        $http({
            method: "POST",
            url: '/Management/AddDeviceToUser/',
            data: Model
        }).then(function (response) {
            console.log(response, 'Đã cấp thiết bị cho người dùng' + $scope.Account.FullName);

        });
        $scope.DevicesNotUsed.splice(index, 1);
        $scope.Devices.push(DeviceToAdd);
    //    fetchData(id);
    }

    // lấy danh sách thiết bị chưa được sử dụng của người dùng --> 
    function GetListDeviceOfCustomer(id) {
        $http({
            method: "GET",
            url: '/Management/GetListDeviceOfCustomer/' + id
        }).then(function (response) {
            console.log(response, 'res');
            $scope.DevicesNotUsed = response.data;
        }, function (error) {
            console.log(error, 'Không có dữ liệu.');
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
            console.log(error, 'Không có dữ liệu.');
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
