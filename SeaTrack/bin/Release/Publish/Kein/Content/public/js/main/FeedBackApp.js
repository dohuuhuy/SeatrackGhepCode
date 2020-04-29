
var App = angular.module('FBApp', []);

App.controller('FBController', function ($scope, $http) {

    $scope.FeedBack = {
        FeedID: '',
        Name: '',
        Email: '',
        Title: '',
        Comment: '',
        Quality: ''
    };
    $scope.Test = function () {
        console.log("OK");
    }
    $scope.Save = function () {
        console.log("OK");
        if ($scope.FeedBack.Name != '' && $scope.FeedBack.Title != '') {
            console.log('i am inside save func' + JSON.stringify($scope.FeedBack));
            $http({
                method: 'POST',
                url: '/Feedback/Save',
                data: JSON.stringify($scope.FeedBack)
            }).then(function successCallback(response) {
                $scope.Clear();
                alert(" Cảm ơn bạn ! Chúng tôi sẽ phản hồi lại sớm nhất có thể !");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Đảm bảo đã nhập đầy đủ thông tin !!');
        }
    };
   
    $scope.Clear = function () {
            $scope.FeedBack.FeedID = '',
            $scope.FeedBack.Name = '',
            $scope.FeedBack.Email = '',
            $scope.FeedBack.Title = '',
            $scope.FeedBack.Comment = '',
            $scope.FeedBack.Quality = ''
           
    };
   
});



