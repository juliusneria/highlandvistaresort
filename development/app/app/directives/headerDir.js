angular
    .module('App')
    .directive('headerDir', headerDir);
function headerDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/header.html',
        controller: 'headerCtrl'
    };
}