angular
    .module('Admin')
    .controller('homeFeatureCtrl',homeFeatureCtrl);
homeFeatureCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function homeFeatureCtrl($scope, uikitService, $state,$localStorage) {

    $scope.featureImages = [];
    $scope.featureImage = null;
    $scope.featurename = null;
    $scope.isLoadingFeature = {add: false, edit: false, delete: false};

    retrieveAllFeatures();
    $scope.addFeature = function(){
        $scope.featureImage = $('#imageFeature')[0].files[0];
        $scope.isLoadingFeature.add = true;
        if($scope.featurename == null){
            uikitService.notification('Name must specified');
            $scope.isLoadingFeature.add = false;
        } else if($scope.featureImage == null){
            uikitService.notification('No Image uploaded');
            $scope.isLoadingFeature.add = false;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL($scope.featureImage);
            reader.onload = function () {
                var file = new Parse.File($('#imageFeature')[0].files[0].name, { base64: reader.result });
                file.save({
                    success: function(file) {
                        add(file);
                    },
                    error: function(error) {
                        uikitService.notification('Something went wrong');
                    }
                });
            };
            reader.onerror = function (error) {
                uikitService.notification('Something went wrong');
            };
        }
    };

    $scope.editFeature = function(data){
        $scope.editFeatureItem = data;
    };

    $scope.deleteFeature = function(data, type){
        $scope.deleteFeatureItem = data;
        $scope.type = type;
    };

    $scope.updateFeature = function(){
        $scope.featureImage = $('#editImageFeature')[0].files[0];
        $scope.isLoadingFeature.edit = true;
        if($scope.editFeatureItem.name == ''){
            $scope.isLoadingFeature.edit = false;
            uikitService.notification('Name must specified');
        } else {
            if($scope.featureImage != null){
                var reader = new FileReader();
                reader.readAsDataURL($scope.featureImage);
                reader.onload = function () {
                    var file = new Parse.File($('#editImageFeature')[0].files[0].name, { base64: reader.result });
                    file.save({
                        success: function(file) {
                            edit(file);
                        },
                        error: function(error) {
                            uikitService.notification('Something went wrong');
                        }
                    });
                };
                reader.onerror = function (error) {
                    uikitService.notification('Something went wrong');
                };
            } else {
                edit(null);
            }
        }
    };

    $scope.dropFeature = function(){
        $scope.isLoadingFeature.delete = true;
        if ($scope.type == 'feature'){
            destroyFeature($scope.deleteFeatureItem, $scope.type);
        }
    };

    function add(file){
        var Featured = Parse.Object.extend("Featured");
        var featured = new Featured();
        featured.set('name',$scope.featurename);
        featured.set('picture',file);
        featured.save({
            success: function() {
                $scope.isLoadingFeature.add = false;
                var modal = UIkit.modal("#addfeature");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Feature has been saved');
                retrieveAllFeatures();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        })
    }

    function edit(file){
        var Featured = Parse.Object.extend("Featured");
        var featured = new Featured();
        featured.id = $scope.editFeatureItem.id;
        featured.set('name',$scope.editFeatureItem.name);
        if(file != null){
            featured.set('picture',file);
        }
        featured.save({
            success: function() {
                var modal = UIkit.modal("#editfeature");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Feature has been saved');
                $scope.isLoadingFeature.edit = false;
                retrieveAllFeatures();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        })
    }

    function destroyFeature(data){
        var Featured = Parse.Object.extend("Featured");
        var query = new Parse.Query(Featured);
        query.get(data.id, {
            success: function(yourObj) {
                yourObj.destroy({
                    success: function(){
                        var modal = UIkit.modal("#deleteFeature");
                        if ( modal.isActive() ) {
                            modal.hide();
                        } else {
                            modal.show();
                        }
                        uikitService.notification('Feature has been removed');
                        $scope.isLoadingFeature.delete = false;
                        retrieveAllFeatures();
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
    }

    function retrieveAllFeatures(){
        var classObject = Parse.Object.extend("Featured");
        var query = new Parse.Query(classObject);
        query.find({
            success: function(results) {
                $scope.featureImages = [];
                for(var i in results){
                    $scope.featureImages.push({
                        id: results[i].id,
                        picture: results[i].get('picture'),
                        name: results[i].get('name')
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
