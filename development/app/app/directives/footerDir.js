angular
    .module('App')
    .directive('footerDir',footerDir);
function footerDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/nav.html',
        controller: 'footerCtrl'
    }
}