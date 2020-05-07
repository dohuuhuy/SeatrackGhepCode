var FeedApp = angular.module("FeedApp", ['angularUtils.directives.dirPagination']);

FeedApp.controller('FeedController', function ($scope, $http, FService, $timeout) {
    $scope.loaded = false;
    $timeout(function () { $scope.loaded = true; }, 100);

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.namesData = [];
    LoadFeed();

   
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

    $scope.Feed = {
        FeedID: '',
        Name: '',
        Email: '',
        Title: '',
        Comment: '',
        Quality: '',
        CreateDate: ''
   

    };

    $scope.View = function (data) {
        console.log('i am inside view() + ');
        $scope.Feed = {
            FeedID: data.FeedID,
            Name: data.Name,
            Email: data.Email,
            Title: data.Title,
            Comment: data.Comment,
            Quality: data.Quality,
            CreateDate: data.CreateDate
          

        };
        update($scope.Feed.FeedID);
    };
  
    function update(id) {
       
        console.log('i am inside update funcr ' +
            JSON.stringify($scope.Customer));
        $http({
            method: 'POST',
            url: '/Admin/FeedBack/ChangeStatusFeed/' + id,
            data: JSON.stringify($scope.Feed)
        }).then(function successCallback(response) {
            $scope.namesData = null;
            LoadFeed();
 
         
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });


    };
   
 
    $scope.Cancel = function () {
        $scope.clear();

        console.log('i am inside cancel func' + JSON.stringify($scope.Device));
    };

   

    function LoadFeed() {
        FService.GetAllRecords().then(function (d) {
            $scope.namesData = d.data;
            for (var i = 0; i < $scope.namesData.length; i++) {
                $scope.namesData[i]["CreateDate"] = new Date(parseInt($scope.namesData[i]["CreateDate"].substr(6)))
              
            }
        }, function () {
            alert('Không tìm thấy dữ liệu !!!');
        });

    }
});



FeedApp.factory('FService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('/Admin/FeedBack/GetListFeed');
    };
    return fac;
});
