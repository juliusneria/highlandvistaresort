angular
    .module('Admin')
    .controller('aboutCtrl',aboutCtrl);
aboutCtrl.$inject = ['$scope','uikitService','$rootScope','$http'];
function aboutCtrl($scope, uikitService, $rootScope,$http) {
    $scope.isLoadingAbout = {title:false, facebook:false, content:false};

    Parse.Config.get().then(function (config) {
        $scope.TITLE = config.get("TITLE");
        $scope.FACEBOOK = config.get("FACEBOOK");
        $scope.CONTENT = config.get("CONTENT");
        $scope.$apply();
    }, function (error) {

    });

    $scope.update = function(type){
        if(type == 'title'){
            $scope.isLoadingAbout.title = true;
            $scope.param = {
                TITLE: $scope.TITLE
            };
        } else if(type == 'facebook'){
            $scope.isLoadingAbout.facebook = true;
            $scope.param = {
                FACEBOOK: $scope.FACEBOOK
            };
        } else if(type == 'content'){
            $scope.isLoadingAbout.content = true;
            $scope.param = {
                CONTENT: $scope.CONTENT
            };
        }
        console.log($scope.param);
        var config = {
            method: 'PUT',
            url: $rootScope.parserServer.url + "/config",
            headers: {
                'X-Parse-Master-Key': $rootScope.parserServer.masterKey,
                'X-Parse-Application-Id': $rootScope.parserServer.appId
            },
            data: {
                params: $scope.param
            }
        };

        $http(config).then(function (success) {
            uikitService.notification(jsUcfirst(type)+" has been updated");
            if(type == 'title'){
                $scope.isLoadingAbout.title = false;
            } else if(type == 'facebook'){
                $scope.isLoadingAbout.facebook = false;
            } else {
                $scope.isLoadingAbout.content = false;
            }
        }, function (error) {

        });
    };

    function jsUcfirst(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}