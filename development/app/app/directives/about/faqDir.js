angular
    .module('App')
    .directive('faqDir',faqDir);
function faqDir(){
    return {
        restrict: 'E',
        templateUrl: 'app/directives/about/views/faq.html',
        controller: 'faqCtrl'
    }
}