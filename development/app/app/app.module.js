angular
    .module("App", ['ui.router','ngStorage'])
    .run(myFunction);
myFunction.$inject = ['$localStorage'];
function myFunction($localStorage){
    /**/
}
