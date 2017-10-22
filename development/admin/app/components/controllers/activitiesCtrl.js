angular
    .module('Admin')
    .controller('activitiesCtrl',activitiesCtrl);
activitiesCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function activitiesCtrl($scope, uikitService, $state,$localStorage) {
    $scope.activitiesImages = [];
    $scope.activityImage = null;
    $scope.activityFeature = null;
    $scope.activityTitle = null;
    $scope.isLoadingActivity = {add:false, edit:false, delete:false};

    retrieveAllActivity();
    $scope.addActivity = function(){
        $scope.activityImage = $('#activityPicture')[0].files[0];
        $scope.isLoadingActivity.add = true;
        if($scope.activityFeature == null){
            uikitService.notification('Feature must specified');
            $scope.isLoadingActivity.add = false;
        } else if($scope.activityImage == null){
            uikitService.notification('No Image uploaded');
            $scope.isLoadingActivity.add = false;
        } else if($scope.activityTitle == null){
            uikitService.notification('Title must specified');
            $scope.isLoadingActivity.add = false;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL($scope.activityImage);
            reader.onload = function () {
                var file = new Parse.File($('#activityPicture')[0].files[0].name, { base64: reader.result });
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

    $scope.editActivity = function(data){
        $scope.editActivityItem = data;
    };

    $scope.deleteActivity = function(data, type){
        $scope.deleteActivityItem = data;
    };

    $scope.updateActivity = function(){
        $scope.activityImage = $('#editImageActivity')[0].files[0];
        $scope.isLoadingActivity.edit = true;
        if($scope.editActivityItem.title == ''){
            uikitService.notification('Title must specified');
            $scope.isLoadingActivity.edit = false
        } else if($scope.editActivityItem.feature == ''){
            uikitService.notification('Feature must specified');
            $scope.isLoadingActivity.edit = false;
        } else {
            if($scope.activityImage != null){
                var reader = new FileReader();
                reader.readAsDataURL($scope.activityImage);
                reader.onload = function () {
                    var file = new Parse.File($('#editImageActivity')[0].files[0].name, { base64: reader.result });
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

    $scope.dropActivity = function(){
        $scope.isLoadingActivity.delete = true;
        destroyActivity($scope.deleteActivityItem);
    };

    function add(file){
        var Activity = Parse.Object.extend("Activity");
        var activity = new Activity();
        activity.set('title',$scope.activityTitle);
        activity.set('feature',$scope.activityFeature);
        activity.set('picture',file);
        activity.save({
            success: function() {
                var modal = UIkit.modal("#addModal");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Activity has been saved');
                $scope.isLoadingActivity.add = false;
                retrieveAllActivity();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        });
    }

    function edit(file){
        var Activity = Parse.Object.extend("Activity");
        var activity = new Activity();
        activity.id = $scope.editActivityItem.id;
        activity.set('title',$scope.editActivityItem.title);
        activity.set('feature',$scope.editActivityItem.feature);
        if(file != null){
            activity.set('picture',file);
        }
        activity.save({
            success: function() {
                var modal = UIkit.modal("#editModal");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Activity has been saved');
                $scope.isLoadingActivity.edit = false;
                retrieveAllActivity();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        })
    }

    function destroyActivity(data){
        var Activity = Parse.Object.extend("Activity");
        var query = new Parse.Query(Activity);
        query.get(data.id, {
            success: function(yourObj) {
                yourObj.destroy({
                    success: function(){
                        var modal = UIkit.modal("#deleteModal");
                        if ( modal.isActive() ) {
                            modal.hide();
                        } else {
                            modal.show();
                        }
                        uikitService.notification('Activity has been removed');
                        $scope.isLoadingActivity.delete = false;
                        retrieveAllActivity();
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

    function retrieveAllActivity(){
        var classObject = Parse.Object.extend("Activity");
        var query = new Parse.Query(classObject);
        query.find({
            success: function(results) {
                $scope.activitiesImages = [];
                for(var i in results){
                    $scope.activitiesImages.push({
                        id: results[i].id,
                        picture: results[i].get('picture'),
                        feature: results[i].get('feature'),
                        title: results[i].get('title')
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