angular
    .module("App")
    .controller("facilitiesCtrl", facilitiesCtrl);
facilitiesCtrl.$inject = ['$scope','$localStorage'];
function facilitiesCtrl($scope,$localStorage) {
    $scope.facilities = [];

    var classObject = Parse.Object.extend("Facility");
    var query = new Parse.Query(classObject);
    query.find({
        success: function(results) {
            for(var i in results){
                $scope.facilities.push({
                    title: results[i].get('title'),
                    feature: results[i].get('feature'),
                    description: results[i].get('description'),
                    picture: results[i].get('picture')._url
                });
            }
            $scope.$apply();
        },
        error: function(error) {
            console.log(error);
        }
    });

    $scope.viewModal = function(data){
        $scope.picture = data;
        var modal = UIkit.modal("#room");
        if ( modal.isActive() ) {
            modal.hide();
        } else {
            modal.show();
        }
    }
}