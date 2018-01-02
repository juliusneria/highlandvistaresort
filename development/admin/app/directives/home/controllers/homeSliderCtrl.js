angular
    .module('Admin')
    .controller('homeSliderCtrl',homeSliderCtrl);
homeSliderCtrl.$inject = ['$scope','uikitService','$state','$localStorage'];
function homeSliderCtrl($scope, uikitService, $state,$localStorage) {

    $scope.heroImages = [];
    $scope.sliderImage = null;
    $scope.sliderTitle = null;
    $scope.sliderDescription = null;
    $scope.isLoadingSlider = {add: false, edit: false, delete: false};

    retrieveAllSlider();
    $scope.addSlider = function(){
        $scope.sliderImage = $('#imageSlider')[0].files[0];
        $scope.isLoadingSlider.add = true;
        if($scope.sliderTitle == null){
            uikitService.notification('Title must specified');
            $scope.isLoadingSlider.add = false;
        } else if($scope.sliderImage == null){
            uikitService.notification('No Image uploaded');
            $scope.isLoadingSlider.add = false;
        } else if($scope.sliderDescription == null){
            uikitService.notification('Description must specified');
            $scope.isLoadingSlider.add = false;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL($scope.sliderImage);
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

    $scope.editSlider = function(data){
        $scope.editSliderItem = data;
    };

    $scope.deleteSlider = function(data, type){
        $scope.deleteSliderItem = data;
        $scope.type = type;
    };

    $scope.updateSlider = function(){
        $scope.editImageSlider = $('#editImageSlider')[0].files[0];
        $scope.isLoadingSlider.edit = true;
        if($scope.editSliderItem.title == ''){
            uikitService.notification('Title must specified');
            $scope.isLoadingSlider.edit = false;
        } else if($scope.editSliderItem.description == ''){
            uikitService.notification('Description must specified');
            $scope.isLoadingSlider.edit = false;
        } else {
            if($scope.editImageSlider != null){
                var reader = new FileReader();
                reader.readAsDataURL($scope.sliderImage);
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

    $scope.dropSlider = function(){
        $scope.isLoadingSlider.delete = true;
        if($scope.type == 'slider'){
            destroySlider($scope.deleteSliderItem);
        }
    };

    function add(file){
        var Banner = Parse.Object.extend("Banner");
        var banner = new Banner();
        banner.set('title',$scope.sliderTitle);
        banner.set('description',$scope.sliderDescription);
        banner.set('image',file);
        banner.save({
            success: function() {
                var modal = UIkit.modal("#addslider");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Slider has been saved');
                $scope.isLoadingSlider.add = false;
                retrieveAllSlider();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        })
    }

    function edit(file){
        console.log($scope.editSliderItem.id);
        var Banner = Parse.Object.extend("Banner");
        var banner = new Banner();
        banner.id = $scope.editSliderItem.id
        banner.set('title',$scope.editSliderItem.title);
        banner.set('description',$scope.editSliderItem.description);
        if(file != null){
            banner.set('image',file);
        }
        banner.save({
            success: function() {
                var modal = UIkit.modal("#editslider");
                if ( modal.isActive() ) {
                    modal.hide();
                } else {
                    modal.show();
                }
                uikitService.notification('Slider has been saved');
                $scope.isLoadingSlider.edit = false;
                retrieveAllSlider();
            },
            error:function(err){
                uikitService.notification('Something went wrong');
            }
        })
    }

    function destroySlider(data){
        var Banner = Parse.Object.extend("Banner");
        var query = new Parse.Query(Banner);
        query.get(data.id, {
            success: function(yourObj) {
                yourObj.destroy({
                    success: function(){
                        var modal = UIkit.modal("#deleteSlider");
                        if ( modal.isActive() ) {
                            modal.hide();
                        } else {
                            modal.show();
                        }
                        uikitService.notification('Slider has been removed');
                        $scope.isLoadingSlider.delete = false;
                        retrieveAllSlider();
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

    function retrieveAllSlider(){
        var classObject = Parse.Object.extend("Banner");
        var query = new Parse.Query(classObject);
        query.find({
            success: function(results) {
                $scope.heroImages = [];
                for(var i in results){
                    $scope.heroImages.push({
                        id: results[i].id,
                        image: results[i].get('image'),
                        title: results[i].get('title'),
                        description: results[i].get('description')
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
