angular
    .module('Admin')
    .directive('inquiryDir', inquiryDir);
function inquiryDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/booking/views/inquiry.html',
        controller: 'inquiryCtrl'
    };
}