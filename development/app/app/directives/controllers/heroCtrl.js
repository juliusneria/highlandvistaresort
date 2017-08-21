angular
    .module('App')
    .controller('heroCtrl', heroCtrl);
heroCtrl.$inject = ['$scope','$localStorage'];
function heroCtrl($scope,$localStorage) {

    $scope.heroImages = [];

    var classObject = Parse.Object.extend("Banner");
    var query = new Parse.Query(classObject);
    query.find({
        success: function(results) {
            for(var i in results){
                $scope.heroImages.push({
                    image: results[i].get('image'),
                    title: results[i].get('title'),
                    description: results[i].get('description')
                });
            }
            $scope.$apply();
        },
        error: function(error) {
            console.log(error);
        }
    });

    UIkit.domObserve('#myId1Medium', function (element) {
        var slideshow = UIkit.slideshow('#myId2Medium', {
            autoplay:true,
            height:447,
            autoplayInterval:4000,
            animation:'fade'
        });
    });

    UIkit.domObserve('#myId1Small', function (element) {
        var slideshow = UIkit.slideshow('#myId2Small', {
            autoplay:true,
            height:447,
            autoplayInterval:4000,
            animation:'fade'
        });
    });
}
