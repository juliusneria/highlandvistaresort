angular
    .module('App')
    .controller('aboutCtrl',aboutCtrl);
aboutCtrl.$inject = ['$scope','$timeout','$state','$localStorage'];
function aboutCtrl($scope, $timeout, $state,$localStorage) {
    $scope.TITLE = 'hell here';
    $scope.CONTENT = 'this is hell';

    Parse.Config.get().then(function (config) {
        $scope.TITLE = config.get("TITLE");
        $scope.CONTENT = config.get("CONTENT");
        $scope.$apply();
    }, function (error) {
        console.log(error);
    });

}