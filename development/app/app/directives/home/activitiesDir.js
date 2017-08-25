angular
    .module('App')
    .directive('activitiesDir',activitiesDir);
function activitiesDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/home/views/activities.html',
        controller: 'activitiesCtrl'
    }
}