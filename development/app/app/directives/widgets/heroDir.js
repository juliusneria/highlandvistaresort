angular
    .module('App')
    .directive('heroDir', heroDir);
function heroDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/widgets/views/hero.html',
        controller: 'heroCtrl'
    };
}