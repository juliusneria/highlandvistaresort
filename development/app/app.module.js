angular
    .module("App", ['ui.router','ngStorage'])
    .run(myFunction);
myFunction.$inject = ['$localStorage'];
function myFunction($localStorage){

    Parse.initialize('nOcEVSAkAxjbcU8iP5l7Uuj8XRkc8PLaxvedRckv', 'ZYty0XFEUtptfZt0TvvB31KT1vgD4DClsc2Q9x9l');
    Parse.serverURL = 'https://parseapi.back4app.com/';
}
