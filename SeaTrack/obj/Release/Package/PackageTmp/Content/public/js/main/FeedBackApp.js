
var App = angular.module("App", []);

App.controller('Controller', function ($scope, $http) {

    $scope.ClearSearch = function () {
        $scope.SearchKey = "";
        $scope.Status = null;
    }
    $scope.FeedBack = {
        FeedID: '',
        Name: '',
        Email: '',
        Title: '',
        Comment: '',
        Quality: ''
    };

    $scope.Save = function () {
        if ($scope.FeedBack.Name != "" && $scope.FeedBack.Title != "") {
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



