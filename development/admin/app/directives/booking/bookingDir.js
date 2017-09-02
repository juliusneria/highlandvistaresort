angular
    .module('Admin')
    .directive('bookingDir', bookingDir);
function bookingDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/booking/views/booking.html',
        controller: 'bookingCtrl'
    };
}