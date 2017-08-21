angular
    .module('App')
    .directive('socialFeatureDir', socialFeatureDir);
function socialFeatureDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/canvas.html',
        controller: 'socialFeaturesCtrl'
    };
}