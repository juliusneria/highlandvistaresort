angular
    .module('Admin')
    .controller('loginCtrl',loginCtrl);
loginCtrl.$inject = ['$scope','$timeout','$state','$localStorage'];
function loginCtrl($scope, $timeout, $state,$localStorage) {

    $scope.username = '';
    $scope.password = '';

    $scope.login = function(){
        Parse.User.logIn($scope.username, $scope.password, {
            success:function(user){
                $state.transitionTo('homeAdmin');
            },
            error:function(user, error){
                $scope.$apply();
            }
        });
    }
}