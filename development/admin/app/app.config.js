angular
    .module('Admin')
    .config(configure);

configure.$inject = ['$stateProvider', '$urlRouterProvider'];
function configure ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('aboutAdmin', {
            url: '/admin/about',
            templateUrl: 'app/components/views/cmsabout.html',
            controller: 'aboutCtrl'
        })
        .state('activitiesAdmin', {
            url: '/admin/activities',
            templateUrl: 'app/components/views/cmsactivities.html',
            controller: 'activitiesCtrl'
        })
        .state('bookingsAdmin', {
            url: '/admin/bookings',
            templateUrl: 'app/components/views/cmsbookings.html',
            controller: 'bookCtrl'
        })
        .state('facilitiesAdmin', {
            url: '/admin/facilities',
            templateUrl: 'app/components/views/cmsfacilities.html',
            controller: 'facilitiesCtrl'
        })
        .state('homeAdmin', {
            url: '/admin/home',
            templateUrl: 'app/components/views/home.html',
            controller: 'homeCtrl'
        })
        .state('login', {
            url: '/admin/login',
            templateUrl: 'app/components/views/login.html',
            controller: 'loginCtrl'
        });

    $urlRouterProvider.otherwise("/admin/login");
}