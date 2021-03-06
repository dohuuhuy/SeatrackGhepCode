﻿myapp.service('AdminService', function ($http, $filter) {
    this.ListUser = function (roleID) {
        return $http.get('/Admin/HomeAdmin/ListUser/' + roleID)
    }

    this.save = function (User, roleID) {
        var us = { user: User, roleID: roleID }
        var request = $http({
            method: 'post',
            url: '/Admin/HomeAdmin/CreateUser',
            data: us
        });
        return request;
    }
    this.LockUser = function (UserID) {
        return $http.get('/Admin/HomeAdmin/LockUser/' + UserID);
    }
    this.UnLockUser = function (UserID) {
        return $http.get('/Admin/HomeAdmin/UnLockUser/' + UserID);
    }
    this.DeleteUser = function (UserID) {
        return $http.get('/Admin/HomeAdmin/DeleteUser/' + UserID);
    }
    this.CheckUsername = function (Username) {
        var User = { Username: Username };
        var request = $http({
            method: 'POST',
            url: '/Admin/HomeAdmin/CheckUsername',
            data: User
        });
        return request;
    }
})