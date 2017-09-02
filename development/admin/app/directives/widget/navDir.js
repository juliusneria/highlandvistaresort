angular
    .module('Admin')
    .directive('navDir',navDir);
function navDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/widget/views/nav.html',
        controller: 'navCtrl'
    }
}