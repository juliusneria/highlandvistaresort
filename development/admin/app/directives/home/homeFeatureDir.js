angular
    .module('Admin')
    .directive('homeFeatureDir', homeFeatureDir);
function homeFeatureDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/home/views/homefeature.html',
        controller: 'homeFeatureCtrl'
    };
}