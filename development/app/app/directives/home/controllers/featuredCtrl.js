angular
    .module("App")
    .controller("featuredCtrl", featuredCtrl);
featuredCtrl.$inject = ['$scope','$localStorage'];
function featuredCtrl($scope,$localStorage) {
    $scope.featuredRooms = [];

    var classObject = Parse.Object.extend("Featured");
    var query = new Parse.Query(classObject);
    query.find({
        success: function(results) {
            for(var i in results){
                $scope.featuredRooms.push({
                    name: results[i].get('name'),
                    picture: results[i].get('picture')._url
                });
            }
            $scope.$apply();
        },
        error: function(error) {
            console.log(error);
        }
    });

    UIkit.domObserve('#myId1', function (element) {
        var slideset = UIkit.slideset('#myId2', {
            small: 1,
            medium:3,
            large: 3
        });
    });
}