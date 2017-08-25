angular
    .module('App')
    .directive('featuredDir',featuredDir);
function featuredDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/home/views/featured.html',
        controller: 'featuredCtrl'
    }
}