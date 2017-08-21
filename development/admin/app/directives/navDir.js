angular
    .module('Admin')
    .directive('navDir',navDir);
function navDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/nav.html',
        controller: 'navCtrl'
    }
}