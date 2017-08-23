angular
    .module('Admin')
    .controller('facilitiesCtrl',facilitiesCtrl);
facilitiesCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function facilitiesCtrl($scope, uikitService, $state,$localStorage) {

    $scope.facilitiesImages = [];
    $scope.facilityImage = null;
    $scope.facilityFeature = null;
    $scope.facilityTitle = null;
    $scope.facilityDescription = null;

    retrieveAllFacility();
    $scope.addFacility = function(){
        $scope.facilityImage = $('#facilityPicture')[0].files[0];

        if($scope.facilityFeature == null){
            uikitService.notification('Feature must specified');
        } else if($scope.facilityImage == null){
            uikitService.notification('No Image uploaded');
        } else if($scope.facilityTitle == null){
            uikitService.notification('Title must specified');
        } else if($scope.facilityDescription == null){
            uikitService.notification('Description must specified');
        } else {
            var reader = new FileReader();
            reader.readAsDataURL($scope.facilityImage);
            reader.onload = function () {
                var file = new Parse.File($('#facilityPicture')[0].files[0].name, { base64: reader.result });
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

    $scope.editFacility = function(data){
        $scope.editFacilityItem = data;
    };

    $scope.deleteFacility = function(data, type){
        $scope.deleteFacilityItem = data;
    };

    $scope.updateFacility = function(){
        $scope.facilityImage = $('#editImageFacility')[0].files[0];

        if($scope.editFacilityItem.title == ''){
            uikitService.notification('Title must specified');
        } else if($scope.editFacilityItem.feature == ''){
            uikitService.notification('Feature must specified');
        } else if($scope.editFacilityItem.description == ''){
            uikitService.notification('Description must specified');
        } else {
            if($scope.facilityImage != null){
                var reader = new FileReader();
                reader.readAsDataURL($scope.facilityImage);
                reader.onload = function () {
                    var file = new Parse.File($('#editImageFacility')[0].files[0].name, { base64: reader.result });
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

    $scope.dropFacility = function(){
        destroyFacility($scope.deleteFacilityItem);
    };

    function add(file){
        var Facility = Parse.Object.extend("Facility");
        var facility = new Facility();
        facility.set('title',$scope.facilityTitle);
        facility.set('feature',$scope.facilityFeature);
        facility.set('description',$scope.facilityDescription);
        facility.set('picture',file);
        facility.save({
            success: function() {
                var modal = UIkit.modal("#add");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Facility has been saved');
                retrieveAllFacility();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        })
    }

    function edit(file){
        var Facility = Parse.Object.extend("Facility");
        var facility = new Facility();
        facility.id = $scope.editFacilityItem.id;
        facility.set('title',$scope.editFacilityItem.title);
        facility.set('feature',$scope.editFacilityItem.feature);
        facility.set('description',$scope.editFacilityItem.description);
        if(file != null){
            facility.set('picture',file);
        }
        facility.save({
            success: function() {
                var modal = UIkit.modal("#edit");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Facility has been saved');
                retrieveAllFacility();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        })
    }

    function destroyFacility(data){
        var Facility = Parse.Object.extend("Facility");
        var query = new Parse.Query(Facility);
        query.get(data.id, {
            success: function(yourObj) {
                yourObj.destroy({
                    success: function(){
                        var modal = UIkit.modal("#delete");
                        if ( modal.isActive() ) {
                            modal.hide();
                        } else {
                            modal.show();
                        }
                        uikitService.notification('Facility has been removed');
                        retrieveAllFacility();
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

    function retrieveAllFacility(){
        var classObject = Parse.Object.extend("Facility");
        var query = new Parse.Query(classObject);
        query.find({
            success: function(results) {
                $scope.facilitiesImages = [];
                for(var i in results){
                    $scope.facilitiesImages.push({
                        id: results[i].id,
                        picture: results[i].get('picture'),
                        feature: results[i].get('feature'),
                        description: results[i].get('description'),
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