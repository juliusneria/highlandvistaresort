angular
    .module('Admin')
    .controller('bookingCtrl',bookingCtrl);
bookingCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function bookingCtrl($scope, uikitService, $state,$localStorage) {

    $scope.bookings = [];
    retrieveAllBookings();

    $scope.viewBook = function(data){
        $scope.booking = data
    };

    $scope.deleteBooking = function(data){
        $scope.bookingId = data;
    };

    $scope.delete = function(){
        var Book = Parse.Object.extend("Book");
        var query = new Parse.Query(Book);
        query.get($scope.bookingId, {
            success: function(yourObj) {
                yourObj.destroy({
                    success: function(){
                        var modal = UIkit.modal("#delete");
                        if ( modal.isActive() ) {
                            modal.hide();
                        } else {
                            modal.show();
                        }
                        uikitService.notification('Reservation has been removed');
                        retrieveAllBookings();
                    },
                    error: function(){
                        uikitService.notification('Something went wrong');
                    }
                });
            },
            error: function(object, error) {
                uikitService.notification('Something went wrong');
            }
        });
    };

    function retrieveAllBookings(){
        var Book = Parse.Object.extend("Book");
        var query = new Parse.Query(Book);
        query.include("cottage");
        query.find({
            success: function(results) {
                $scope.bookings = [];
                for(var i in results){
                    $scope.bookings.push({
                        id: results[i].id,
                        startDate: datetime(results[i].get('startDate').toISOString()),
                        endDate: datetime(results[i].get('endDate').toISOString()),
                        firstname: results[i].get('firstname'),
                        lastname: results[i].get('lastname'),
                        mobile: results[i].get('mobile'),
                        address: results[i].get('address'),
                        email: results[i].get('email'),
                        message: results[i].get('message'),
                        cottage: results[i].get('cottage').get("name")
                    });
                }
                $scope.$apply();
            },
            error: function(error) {
                uikitService.notification('Something went wrong');
            }
        });
    }

    function datetime(x){
        var readable = new Date(x);  // When we pass the ISO format to the JS Date constructor, the return is "Fri Jul 04 2014 21:06:08 GMT-0400 (Eastern Daylight Time)"
        var m = readable.getMonth();  // returns 6 (note that this number is one less than the number of the month in isoformat)
        var d = readable.getDate();  // returns 15
        var y = readable.getFullYear();  // returns 2012
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var mlong = months[m];
        return mlong + " " + d + ", " + y;
    }

}
