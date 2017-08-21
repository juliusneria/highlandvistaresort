angular
    .module('App')
    .config(configure);

configure.$inject = ['$stateProvider', '$urlRouterProvider'];
function configure ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/views/home.html',
            controller: 'homeCtrl'
        })
        .state('book', {
            url: '/book',
            templateUrl: 'app/components/views/book.html',
            controller: 'bookCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'app/components/views/about.html',
            controller: 'aboutCtrl'
        });

    $urlRouterProvider.otherwise("/home");
}