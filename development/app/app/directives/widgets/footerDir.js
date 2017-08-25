angular
    .module('App')
    .directive('footerDir',footerDir);
function footerDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/widgets/views/footer.html',
        controller: 'footerCtrl'
    }
}