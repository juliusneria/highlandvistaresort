angular
    .module('Admin')
    .controller('loginCtrl',loginCtrl);
loginCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function loginCtrl($scope, uikitService, $state,$localStorage) {

    $scope.username = '';
    $scope.password = '';
    $scope.isLoadingLogin = false;

    $scope.login = function(){
        $scope.isLoadingLogin = true;
        Parse.User.logIn($scope.username, $scope.password, {
            success:function(user){
                uikitService.notification('Welcome');
                $scope.isLoadingLogin = false;
                $state.transitionTo('homeAdmin');
            },
            error:function(user, error){
                uikitService.notification('Something went wrong');
                $scope.$apply();
            }
        });
    };
}