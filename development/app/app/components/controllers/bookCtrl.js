angular
    .module('App')
    .controller('bookCtrl',bookCtrl);
bookCtrl.$inject = ['$scope','$timeout','$state','$localStorage'];
function bookCtrl($scope, $timeout, $state,$localStorage) {

    $scope.startdate = null;
    $scope.enddate = null;

    var monthpicker = new MaterialDatepicker('#startDate', {
        lang: 'en',
        orientation: 'landscape',
        theme: 'light',
        color: '#726277'
    });

    var monthpicker = new MaterialDatepicker('#endDate', {
        lang: 'en',
        orientation: 'landscape',
        theme: 'light',
        color: '#726277'
    });

    $scope.submit = function(){
        console.log($scope.startdate, $scope.enddate);
    }

}