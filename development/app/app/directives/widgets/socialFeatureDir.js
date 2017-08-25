angular
    .module('App')
    .directive('socialFeatureDir', socialFeatureDir);
function socialFeatureDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/widgets/views/social-features.html',
        controller: 'socialFeaturesCtrl'
    };
}