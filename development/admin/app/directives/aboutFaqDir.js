angular
    .module('Admin')
    .directive('aboutFaqDir',aboutFaqDir);
function aboutFaqDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/aboutfaq.html',
        controller: 'aboutFaqCtrl'
    }
}