
var App = angular.module("App", []);

App.controller('Controller', function ($scope, $http) {


    $scope.FeedBack = {
        Name: '',
        Email: '',
        Title: '',
        Commnet: '',
        Quality: ''
    };

    $scope.Save = function () {
        if ($scope.FeedBack.name != "" && $scope.FeedBack.Title != "") {
            console.log('i am inside save func' + JSON.stringify($scope.FeedBack));
            $http({
                method: 'POST',
                url: '/Feedback/Save',
                data: JSON.stringify($scope.FeedBack)
            }).then(function successCallback(response) {
                $scope.Clear();
                alert(" Cảm ơn bạn !");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Đảm bảo đã nhập đầy đủ thông tin !!');
        }
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
        console.log('i am inside cancel func' + JSON.stringify($scope.FeedBack));
    }; 
});



