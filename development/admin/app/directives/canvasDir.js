angular
    .module('Admin')
    .directive('canvasDir', canvasDir);
function canvasDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/canvas.html',
        controller: 'canvasCtrl'
    };
}