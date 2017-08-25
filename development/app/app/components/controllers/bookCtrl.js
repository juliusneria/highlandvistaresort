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
        $scope.startdate = $('#startDate')[0].value;
        $scope.enddate = $('#endDate')[0].value;
        console.log();
        if($scope.startdate === ''){
            uikitService.notification('Start date must not empty');
        }else if($scope.enddate === ''){
            uikitService.notification('End date must not empty');
        }else if(new Date($scope.startdate) > new Date($scope.enddate)){
            uikitService.notification('Invalid Schedule');
        }else if($scope.firstname === ''){
            uikitService.notification('Firstname must not empty');
        }else if($scope.lastname === ''){
            uikitService.notification('Lastname must not empty');
        }else if($scope.mobile === ''){
            uikitService.notification('Mobile number must not empty');
        }else if($scope.address === ''){
            uikitService.notification('Address must not empty');
        }else if($scope.email === ''){
            uikitService.notification('Email must not empty');
        }else if($scope.message === ''){
            uikitService.notification('Message must not empty');
        }else{
            uikitService.notification('Message must not empty');
        }
    }

}