var AccountApp = angular.module("App", []);

AccountApp.controller('Controller', function ($scope, $http, Service) {
    LoadUser();
    $scope.ChangePassword = function(){
    $scope.Status = !$scope.Status;
}

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
                DeviceService.GetAllRecords().then(function (d) {
                    $scope.namesData = d.data;
                }, function () {
                    alert('Unable to Get Data !!!');
                });
                $scope.Clear();
                alert(response.data);
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        

    };

    function LoadUser(){
    Service.GetAllRecords().then(function (d) {
        $scope.User = d.data;
    }, function () {
        alert('Unable to Get Data !!!');
    });
}
});



AccountApp.factory('Service', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/AccountInformation/GetUserInfo');
    };

    console.log('i am inside Service ');

    return fac;
});
