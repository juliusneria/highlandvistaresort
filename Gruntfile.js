'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        uglify: {
            options: {
                manage: false,
                beautify: false
            },
            my_target: {
                files: {
                    /*ADMIN*/
                    'public/admin/app/components/controllers/aboutCtrl.js': ['development/admin/app/components/controllers/aboutCtrl.js'],
                    'public/admin/app/components/controllers/activitiesCtrl.js': ['development/admin/app/components/controllers/activitiesCtrl.js'],
                    'public/admin/app/components/controllers/bookCtrl.js': ['development/admin/app/components/controllers/bookCtrl.js'],
                    'public/admin/app/components/controllers/facilitiesCtrl.js': ['development/admin/app/components/controllers/facilitiesCtrl.js'],
                    'public/admin/app/components/controllers/homeCtrl.js': ['development/admin/app/components/controllers/homeCtrl.js'],
                    'public/admin/app/components/controllers/loginCtrl.js': ['development/admin/app/components/controllers/loginCtrl.js'],

                    'public/admin/app/directives/booking/controllers/bookingCtrl.js': ['development/admin/app/directives/booking/controllers/bookingCtrl.js'],
                    'public/admin/app/directives/booking/controllers/inquiryCtrl.js': ['development/admin/app/directives/booking/controllers/inquiryCtrl.js'],
                    'public/admin/app/directives/booking/bookingDir.js': ['development/admin/app/directives/booking/bookingDir.js'],
                    'public/admin/app/directives/booking/inquiryDir.js': ['development/admin/app/directives/booking/inquiryDir.js'],
                    'public/admin/app/directives/home/controllers/homeFeatureCtrl.js': ['development/admin/app/directives/home/controllers/homeFeatureCtrl.js'],
                    'public/admin/app/directives/home/controllers/homeSliderCtrl.js': ['development/admin/app/directives/home/controllers/homeSliderCtrl.js'],
                    'public/admin/app/directives/home/homeFeatureDir.js': ['development/admin/app/directives/home/homeFeatureDir.js'],
                    'public/admin/app/directives/home/homeSliderDir.js': ['development/admin/app/directives/home/homeSliderDir.js'],
                    'public/admin/app/directives/widget/controllers/aboutFaqCtrl.js': ['development/admin/app/directives/widget/controllers/aboutFaqCtrl.js'],
                    'public/admin/app/directives/widget/controllers/canvasCtrl.js': ['development/admin/app/directives/widget/controllers/canvasCtrl.js'],
                    'public/admin/app/directives/widget/controllers/navCtrl.js': ['development/admin/app/directives/widget/controllers/navCtrl.js'],
                    'public/admin/app/directives/widget/aboutFaqDir.js': ['development/admin/app/directives/widget/aboutFaqDir.js'],
                    'public/admin/app/directives/widget/canvasDir.js': ['development/admin/app/directives/widget/canvasDir.js'],
                    'public/admin/app/directives/widget/navDir.js': ['development/admin/app/directives/widget/navDir.js'],

                    'public/admin/app/services/uikitServices.js': ['development/admin/app/services/uikitServices.js'],
                    'public/admin/app/app.config.js': ['development/admin/app/app.config.js'],
                    'public/admin/app/app.module.js': ['development/admin/app/app.module.js'],

                    /*APP*/
                    'public/app/components/controllers/aboutCtrl.js': ['development/app/app/components/controllers/aboutCtrl.js'],
                    'public/app/components/controllers/bookCtrl.js': ['development/app/app/components/controllers/bookCtrl.js'],
                    'public/app/components/controllers/homeCtrl.js': ['development/app/app/components/controllers/homeCtrl.js'],
                    'public/app/directives/about/controllers/faqCtrl.js': ['development/app/app/directives/about/controllers/faqCtrl.js'],
                    'public/app/directives/about/faqDir.js': ['development/app/app/directives/about/faqDir.js'],
                    'public/app/directives/home/controllers/activitiesCtrl.js': ['development/app/app/directives/home/controllers/activitiesCtrl.js'],
                    'public/app/directives/home/controllers/facilitiesCtrl.js': ['development/app/app/directives/home/controllers/facilitiesCtrl.js'],
                    'public/app/directives/home/controllers/featuredCtrl.js': ['development/app/app/directives/home/controllers/featuredCtrl.js'],
                    'public/app/directives/home/activitiesDir.js': ['development/app/app/directives/home/activitiesDir.js'],
                    'public/app/directives/home/facilitiesDir.js': ['development/app/app/directives/home/facilitiesDir.js'],
                    'public/app/directives/home/featuredDir.js': ['development/app/app/directives/home/featuredDir.js'],
                    'public/app/directives/widgets/controllers/footerCtrl.js': ['development/app/app/directives/widgets/controllers/footerCtrl.js'],
                    'public/app/directives/widgets/controllers/headerCtrl.js': ['development/app/app/directives/widgets/controllers/headerCtrl.js'],
                    'public/app/directives/widgets/controllers/heroCtrl.js': ['development/app/app/directives/widgets/controllers/heroCtrl.js'],
                    'public/app/directives/widgets/controllers/socialFeaturesCtrl.js': ['development/app/app/directives/widgets/controllers/socialFeaturesCtrl.js'],
                    'public/app/directives/widgets/footerDir.js': ['development/app/app/directives/widgets/footerDir.js'],
                    'public/app/directives/widgets/headerDir.js': ['development/app/app/directives/widgets/headerDir.js'],
                    'public/app/directives/widgets/heroDir.js': ['development/app/app/directives/widgets/heroDir.js'],
                    'public/app/directives/widgets/socialFeatureDir.js': ['development/app/app/directives/widgets/socialFeatureDir.js'],
                    'public/app/services/uikitServices.js': ['development/app/app/services/uikitServices.js'],
                    'public/app/app.config.js': ['development/app/app/app.config.js'],
                    'public/app/app.module.js': ['development/app/app/app.module.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['uglify']);

};
