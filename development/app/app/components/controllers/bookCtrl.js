angular
    .module('App')
    .controller('bookCtrl',bookCtrl);
bookCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function bookCtrl($scope, uikitService, $state,$localStorage) {

    $scope.cottages = [];
    $scope.startdate = '';
    $scope.enddate = '';
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.mobile = '';
    $scope.address = '';
    $scope.email = '';
    $scope.message = '';
    $scope.cottage = '';
    $scope.isLoading = false;

    var monthpicker = new MaterialDatepicker('#startDate', {
        lang: 'en',
        orientation: 'landscape',
        theme: 'light',
        color: '#726277'
    });

    var monthpicker = new MaterialDatepicker('#endDate', {
        lang: 'en',
        orientation: 'landscape',
        theme: 'light',
        color: '#726277'
    });

    var classObject = Parse.Object.extend("Cottage");
    var query = new Parse.Query(classObject);
    query.find({
        success: function(results) {
            for(var i in results){
                $scope.cottages.push({
                    name: results[i].get('name'),
                    id: results[i].id,
                    price: results[i].get('price')
                });
            }
            $scope.$apply();
        },
        error: function(error) {
            console.log(error);
        }
    });



    $scope.submit = function(){
        $scope.isLoading = true;
        $scope.startdate = $('#startDate')[0].value;
        $scope.enddate = $('#endDate')[0].value;
        if($scope.startdate === ''){
            uikitService.notification('Start date must not empty');
            $scope.isLoading = false;
        }else if($scope.enddate === ''){
            uikitService.notification('End date must not empty');
            $scope.isLoading = false;
        }else if(new Date($scope.startdate) > new Date($scope.enddate)){
            uikitService.notification('Invalid Schedule');
            $scope.isLoading = false;
        }else if($scope.firstname === ''){
            uikitService.notification('Firstname must not empty');
            $scope.isLoading = false;
        }else if($scope.lastname === ''){
            uikitService.notification('Lastname must not empty');
            $scope.isLoading = false;
        }else if($scope.mobile === ''){
            uikitService.notification('Mobile number must not empty');
            $scope.isLoading = false;
        }else if($scope.address === ''){
            uikitService.notification('Address must not empty');
            $scope.isLoading = false;
        }else if($scope.email === ''){
            uikitService.notification('Email must not empty');
            $scope.isLoading = false;
        }else if($scope.message === ''){
            uikitService.notification('Message must not empty');
            $scope.isLoading = false;
        }else{
            var Cottage = Parse.Object.extend("Cottage");
            var cottage = new Cottage();
            cottage.id = $scope.cottage;

            var Book = Parse.Object.extend("Book");
            var book = new Book();
            book.set('startDate',new Date($scope.startdate));
            book.set('endDate',new Date($scope.enddate));
            book.set('firstname',$scope.firstname);
            book.set('lastname',$scope.lastname);
            book.set('mobile',$scope.mobile);
            book.set('address',$scope.address);
            book.set('email',$scope.email);
            book.set('message',$scope.message);
            book.set('cottage',cottage);
            book.save({
                success: function() {
                    $scope.isLoading = false;
                    uikitService.notification('Thank you for booking submission, stay tuned for the email updates');
                    $scope.$apply();
                },
                error:function(err){
                    $scope.isLoading = false;
                    uikitService.notification('Something went wrong');
                    $scope.$apply();
                }
            });
        }
    }

}