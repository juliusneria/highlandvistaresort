angular
    .module('Admin')
    .controller('navCtrl', navCtrl);
navCtrl.$inject = ['$scope','uikitService','$state'];
function navCtrl($scope,uikitService,$state) {

    $scope.currentState = $state.current.name;
    $scope.isLoadingLogout = false;
    $scope.logout = function(){
        $scope.isLoadingLogout = true;
        Parse.User.logOut().then(function (result) {
            $scope.isLoadingLogout = false;
            uikitService.notification('Successfully logged out');
            $state.transitionTo('login');
        });
    };

    $scope.offCanvas = function(){
        UIkit.offcanvas.show('#offcanvas');
        UIkit.offcanvas.hide([force = false]);
    }
}