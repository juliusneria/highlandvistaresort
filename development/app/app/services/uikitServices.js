angular
    .module('App')
    .service('uikitService', uikitService);

function uikitService() {
    this.notification = function(msg, time, pos) {
        UIkit.notify({
            message : '<i class=""></i><h3 class="uk-text-center uk-margin-remove text-white">' + msg +'</h3>',
            timeout : time || 2000,
            pos     : pos || 'top-center'
        });
    };
}