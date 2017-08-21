angular
    .module('Admin')
    .controller('canvasCtrl',canvasCtrl);
canvasCtrl.$inject = ['$scope','$localStorage','$state'];
function canvasCtrl($scope,$localStorage,$state) {
    $scope.currentState = $state.current.name;
}