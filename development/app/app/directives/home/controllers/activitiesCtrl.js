angular
    .module("App")
    .controller("activitiesCtrl", activitiesCtrl);
activitiesCtrl.$inject = ['$scope','$localStorage'];
function activitiesCtrl($scope,$localStorage) {
    $scope.activities = [];

    var classObject = Parse.Object.extend("Activity");
    var query = new Parse.Query(classObject);
    query.find({
        success: function(results) {
            for(var i in results){
                $scope.activities.push({
                    title: results[i].get('title'),
                    feature: results[i].get('feature'),
                    picture: results[i].get('picture')._url
                });
            }
            $scope.$apply();
        },
        error: function(error) {
            console.log(error);
        }
    });

    $scope.viewPicture = function(data){
        $scope.picture = data;
        var modal = UIkit.modal("#activity");
        if ( modal.isActive() ) {
            modal.hide();
        } else {
            modal.show();
        }
    }
}