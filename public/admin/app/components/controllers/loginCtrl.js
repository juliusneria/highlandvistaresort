function loginCtrl(a,b,c,d){a.username="",a.password="",a.login=function(){Parse.User.logIn(a.username,a.password,{success:function(a){c.transitionTo("homeAdmin")},error:function(b,c){a.$apply()}})}}angular.module("Admin").controller("loginCtrl",loginCtrl),loginCtrl.$inject=["$scope","$timeout","$state","$localStorage"];