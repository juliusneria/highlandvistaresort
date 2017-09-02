angular
    .module('Admin', ['ui.router','ngStorage'])
    .run(myFunction);
myFunction.$inject = ['$window','$rootScope','$location'];
function myFunction($window,$rootScope,$location){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if(Parse.User.current() === null && toState.name !== 'login'){
            $location.path('/admin/login');
            $window.location.reload();
        } else {
            if(toState.name === 'login'){
                $location.path('/admin/home');
            } else {
                $location.path(toState.url);
            }
        }
    });
}
