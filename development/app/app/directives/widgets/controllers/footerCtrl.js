angular
    .module("App")
    .controller("footerCtrl", footerCtrl);
footerCtrl.$inject = ['$scope','uikitService'];
function footerCtrl($scope,uikitService) {

    $scope.isLoadingInquiry = false;
    $scope.inqName = '';
    $scope.inqMobile = '';
    $scope.inqSubject = '';
    $scope.inqMessage = '';

    $scope.submitInq = function(){
        $scope.isLoadingInquiry = true;
        if($scope.inqName === ''){
            uikitService.notification('Name must be require');
            $scope.isLoadingInquiry = false;
        }else if($scope.inqMobile === ''){
            uikitService.notification('Mobile number must be require');
            $scope.isLoadingInquiry = false;
        }else if($scope.inqSubject === ''){
            uikitService.notification('Subject must be require');
            $scope.isLoadingInquiry = false;
        }else if($scope.inqMessage === ''){
            uikitService.notification('Message is require');
            $scope.isLoadingInquiry = false;
        }else{
            var Inquiry = Parse.Object.extend("Inquiry");
            var inquiry = new Inquiry();
            inquiry.set('name',$scope.inqName);
            inquiry.set('mobile',$scope.inqMobile);
            inquiry.set('subject',$scope.inqSubject);
            inquiry.set('message',$scope.inqMessage);
            inquiry.save({
                success: function() {
                    $scope.isLoadingInquiry = false;
                    uikitService.notification('Thank you for submitting your inquiry, we\'re keep update you soon');
                    $scope.$apply();
                },
                error:function(err){
                    $scope.isLoadingInquiry = false;
                    uikitService.notification('Something went wrong');
                    $scope.$apply();
                }
            });
        }
    }
}