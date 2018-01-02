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
    $scope.isLoadingFacilities = {add:false, edit:false, delete:false};

    retrieveAllFacility();
    $scope.addFacility = function(){
        $scope.facilityImage = $('#facilityPicture')[0].files[0];
        $scope.isLoadingFacilities.add = true;
        if($scope.facilityFeature == null){
            uikitService.notification('Feature must specified');
            $scope.isLoadingFacilities.add = false;
        } else if($scope.facilityImage == null){
            uikitService.notification('No Image uploaded');
            $scope.isLoadingFacilities.add = false;
        } else if($scope.facilityTitle == null){
            uikitService.notification('Title must specified');
            $scope.isLoadingFacilities.add = false;
        } else if($scope.facilityDescription == null){
            uikitService.notification('Description must specified');
            $scope.isLoadingFacilities.add = false;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL($scope.facilityImage);
            reader.onload = function () {
                var file = new Parse.File(makeid() + '_' + makeid() + '_' + makeid(), { base64: reader.result });
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
        $scope.isLoadingFacilities.edit = true;
        if($scope.editFacilityItem.title == ''){
            uikitService.notification('Title must specified');
            $scope.isLoadingFacilities.edit = false;
        } else if($scope.editFacilityItem.feature == ''){
            uikitService.notification('Feature must specified');
            $scope.isLoadingFacilities.edit = false;
        } else if($scope.editFacilityItem.description == ''){
            uikitService.notification('Description must specified');
            $scope.isLoadingFacilities.edit = false;
        } else {
            if($scope.facilityImage != null){
                var reader = new FileReader();
                reader.readAsDataURL($scope.facilityImage);
                reader.onload = function () {
                    var file = new Parse.File(makeid() + '_' + makeid() + '_' + makeid(), { base64: reader.result });
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
        $scope.isLoadingFacilities.delete = true;
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
                $scope.isLoadingFacilities.add = false;
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
                $scope.isLoadingFacilities.edit = false;
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
                        $scope.isLoadingFacilities.delete = false;
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

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}