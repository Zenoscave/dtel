var router = angular.module('skeleton.router', []);

router
    .config(['$urlRouterProvider', '$locationProvider',
        function($urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/");
        }
    ]);

router
    .config(['$stateProvider',
        function($stateProvider) {

            $stateProvider

                .state('home', {
                    url :'/',
                    views :  {
                        '': {
                            templateUrl: 'partials/main.html',
                            controller: 'skeleton.controller.home'
                        }
                    }
                });
        }
    ]);