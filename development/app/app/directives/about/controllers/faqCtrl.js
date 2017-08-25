angular
    .module("App")
    .controller("faqCtrl", faqCtrl);
faqCtrl.$inject = ['$scope','$localStorage'];
function faqCtrl($scope,$localStorage) {
    $scope.faq = [];

    var classObject = Parse.Object.extend("FAQ");
    var query = new Parse.Query(classObject);
    query.find({
        success: function(results) {
            for(var i in results){
                $scope.faq.push({
                    question: results[i].get('question'),
                    answer: results[i].get('answer')
                });
            }
            $scope.$apply();
        },
        error: function(error) {
            console.log(error);
        }
    });
}