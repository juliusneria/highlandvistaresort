function aboutCtrl(a,b,c,d){function e(a){return a.charAt(0).toUpperCase()+a.slice(1)}Parse.Config.get().then(function(b){a.TITLE=b.get("TITLE"),a.FACEBOOK=b.get("FACEBOOK"),a.CONTENT=b.get("CONTENT"),a.$apply()},function(a){}),a.update=function(f){"title"==f?a.param={TITLE:a.TITLE}:"facebook"==f?a.param={FACEBOOK:a.FACEBOOK}:"content"==f&&(a.param={CONTENT:a.CONTENT}),console.log(a.param);var g={method:"PUT",url:c.parserServer.url+"/config",headers:{"X-Parse-Master-Key":c.parserServer.masterKey,"X-Parse-Application-Id":c.parserServer.appId},data:{params:a.param}};d(g).then(function(a){console.log(a),b.notification(e(f)+" has been updated")},function(a){})}}angular.module("Admin").controller("aboutCtrl",aboutCtrl),aboutCtrl.$inject=["$scope","uikitService","$rootScope","$http"];