angular
    .module('Admin')
    .controller('aboutFaqCtrl',aboutFaqCtrl);
aboutFaqCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function aboutFaqCtrl($scope, uikitService, $state,$localStorage) {

    $scope.isLoadingFaq = {add:false, edit:false, delete:false};
    $scope.FAQLists = [];
    $scope.question = null;
    $scope.answer = null;

    retrieveFAQ();

    $scope.submitFaq = function(){
        $scope.isLoadingFaq.add = true;
        if($scope.question == null){
            uikitService.notification('Question must not empty');
            $scope.isLoadingFaq.add = false;
        } else if($scope.answer == null) {
            uikitService.notification('Answer must not empty');
            $scope.isLoadingFaq.add = false;
        } else {
            var FAQ = Parse.Object.extend("FAQ");
            var faq = new FAQ();
            faq.set('question',$scope.question);
            faq.set('answer',$scope.answer);
            faq.save({
                success: function() {
                    var modal = UIkit.modal("#addfaq");
                    if ( modal.isActive() ) {
                        modal.hide();
                    } else {
                        modal.show();
                    }
                    uikitService.notification('FAQ has been saved');
                    $scope.isLoadingFaq.add = false;
                    retrieveFAQ();
                },
                error:function(err){
                    uikitService.notification('Something went wrong');
                }
            })
        }
    };

    $scope.editFaq = function(data){
        $scope.FAQselected = data;
    };

    $scope.deleteFaq = function(data){
        $scope.FAQdeletion = data;
    };

    $scope.dropFaq = function(){
        $scope.isLoadingFaq.delete = true;
        var FAQ = Parse.Object.extend("FAQ");
        var query = new Parse.Query(FAQ);
        query.get($scope.FAQdeletion.id, {
            success: function(yourObj) {
                yourObj.destroy({
                    success: function(){
                        var modal = UIkit.modal("#delete");
                        if ( modal.isActive() ) {
                            modal.hide();
                        } else {
                            modal.show();
                        }
                        uikitService.notification('FAQ has been removed');
                        $scope.isLoadingFaq.delete = false;
                        retrieveFAQ();
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

    $scope.updateFaq = function(){
        $scope.isLoadingFaq.edit = true;
        if($scope.FAQselected.question == ''){
            uikitService.notification('Question must not empty');
            $scope.isLoadingFaq.edit = false;
        } else if($scope.FAQselected.answer == '') {
            uikitService.notification('Answer must not empty');
            $scope.isLoadingFaq.edit = false;
        } else {
            var FAQ = Parse.Object.extend("FAQ");
            var faq = new FAQ();
            faq.id = $scope.FAQselected.id;
            faq.set('question',$scope.FAQselected.question);
            faq.set('answer',$scope.FAQselected.answer);
            faq.save({
                success: function() {
                    var modal = UIkit.modal("#edit");
                    if (modal.isActive()) {
                        modal.hide();
                    } else {
                        modal.show();
                    }
                    uikitService.notification('FAQ has been saved');
                    $scope.isLoadingFaq.edit = false;
                    retrieveFAQ();
                },
                error:function(err){
                    uikitService.notification('Something went wrong');
                }
            });
        }
    };

    function retrieveFAQ(){
        var classObject = Parse.Object.extend("FAQ");
        var query = new Parse.Query(classObject);
        query.find({
            success: function(results) {
                $scope.FAQLists = [];
                for(var i in results){
                    $scope.FAQLists.push({
                        id: results[i].id,
                        question: results[i].get('question'),
                        answer: results[i].get('answer')
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