angular
    .module('Admin')
    .controller('navCtrl', navCtrl);
navCtrl.$inject = ['$scope','$localStorage','$state'];
function navCtrl($scope,$localStorage,$state) {

    $scope.logout = function(){
        Parse.User.logOut().then(function (result) {
            console.log(result);
            $state.transitionTo('login');
        });
    }
}