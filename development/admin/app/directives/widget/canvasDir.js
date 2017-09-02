angular
    .module('Admin')
    .directive('canvasDir', canvasDir);
function canvasDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/widget/views/canvas.html',
        controller: 'canvasCtrl'
    };
}