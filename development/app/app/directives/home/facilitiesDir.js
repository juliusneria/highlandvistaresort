angular
    .module('App')
    .directive('facilitiesDir',facilitiesDir);
function facilitiesDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/home/views/facilities.html',
        controller: 'facilitiesCtrl'
    }
}