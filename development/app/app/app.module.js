angular
    .module("App", ['ui.router','ngStorage'])
    .run(myFunction);
myFunction.$inject = ['$localStorage','$rootScope'];
function myFunction($localStorage,$rootScope){
}
