angular
    .module('Admin')
    .controller('inquiryCtrl',inquiryCtrl);
inquiryCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function inquiryCtrl($scope, uikitService, $state,$localStorage) {

    $scope.inquiries = [];
    $scope.isLoadingInquiry = false;
    retrieveAllInquiries();

    $scope.viewInquiries = function(data){
        $scope.inquiry = data;
    };

    $scope.deleteInquiry = function(data){
        $scope.inquiryId = data;
    };

    $scope.deleteInq = function(){
        $scope.isLoadingInquiry = true;
        var Inquiry = Parse.Object.extend("Inquiry");
        var query = new Parse.Query(Inquiry);
        query.get($scope.inquiryId, {
            success: function(yourObj) {
                yourObj.destroy({
                    success: function(){
                        var modal = UIkit.modal("#deleteInq");
                        if ( modal.isActive() ) {
                            modal.hide();
                        } else {
                            modal.show();
                        }
                        uikitService.notification('Inquiry has been removed');
                        $scope.isLoadingInquiry = false;
                        retrieveAllInquiries();
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

    function retrieveAllInquiries(){
        var Inquiry = Parse.Object.extend("Inquiry");
        var query = new Parse.Query(Inquiry);
        query.find({
            success: function(results) {
                $scope.inquiries = [];
                for(var i in results){
                    $scope.inquiries.push({
                        id: results[i].id,
                        name: results[i].get('name'),
                        mobile: results[i].get('mobile'),
                        subject: results[i].get('subject'),
                        message: results[i].get('message')
                    });
                }
                $scope.$apply();
            },
            error: function(error) {
                uikitService.notification('Something went wrong');
            }
        });
    }

}
