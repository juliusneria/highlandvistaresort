function facilitiesCtrl(a,b){a.facilities=[];var c=Parse.Object.extend("Facility");new Parse.Query(c).find({success:function(b){for(var c in b)a.facilities.push({title:b[c].get("title"),feature:b[c].get("feature"),description:b[c].get("description"),picture:b[c].get("picture")._url});a.$apply()},error:function(a){console.log(a)}}),a.viewModal=function(b){a.picture=b;var c=UIkit.modal("#room");c.isActive()?c.hide():c.show()}}angular.module("App").controller("facilitiesCtrl",facilitiesCtrl),facilitiesCtrl.$inject=["$scope","$localStorage"];