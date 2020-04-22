var myapp = angular.module('SOSapp', ['angularUtils.directives.dirPagination']);

myapp.controller('SOSctrl', function ($scope, $http, SV) {
    LoadSOS();
    $scope.currentPage = 1;
    $scope.pageSize = 10;
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

    $scope.XuLy = function (id) { // xử lý chuyển status về -1
        if (confirm("Bạn chắn xóa ?")) {
            console.log("helo! tao chưa có làm " + id);
            $http({
                method: 'GET',
                url: '/Admin/AdSOS/ChangeStatusSOS/' + id
            }).then(function (response) {
                LoadSOS()
                alert("Xử lý thành công");
            });
        }
        
    };
 
    function LoadSOS() {
        SV.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
            for (var i = 0; i < $scope.namesData.length; i++) {
                $scope.namesData[i]["DateRequest"] = new Date(parseInt($scope.namesData[i]["DateRequest"].substr(6)));
            }
            if ($scope.namesData.length <= 0) {
                console.log('helo')
            }

        }, function () {
            alert('Không tìm thấy dữ liệu !!!');
        });

    }

});


myapp.factory('SV', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/Admin/AdSOS/GetListSOS/');
    };
    return fac;
});
