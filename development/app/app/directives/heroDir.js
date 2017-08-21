angular
    .module('App')
    .directive('heroDir', heroDir);
function heroDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/hero.html',
        controller: 'heroCtrl'
    };
}