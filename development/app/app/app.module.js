angular
    .module("App", ['ui.router','ngStorage'])
    .run(myFunction);
myFunction.$inject = ['$localStorage','$rootScope'];
function myFunction($localStorage,$rootScope){

    Parse.initialize($rootScope.parserServer.appId, $rootScope.parserServer.javascriptKey);
    Parse.serverURL = $rootScope.parserServer.url;
}
