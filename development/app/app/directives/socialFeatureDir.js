angular
    .module('App')
    .directive('socialFeatureDir', socialFeatureDir);
function socialFeatureDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/views/social-features.html',
        controller: 'socialFeaturesCtrl'
    };
}