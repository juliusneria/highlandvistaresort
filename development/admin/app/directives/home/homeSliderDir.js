angular
    .module('Admin')
    .directive('homeSliderDir', homeSliderDir);
function homeSliderDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/home/views/homeslider.html',
        controller: 'homeSliderCtrl'
    };
}