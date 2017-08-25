angular
    .module('App')
    .directive('headerDir', headerDir);
function headerDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/widgets/views/header.html',
        controller: 'headerCtrl'
    };
}