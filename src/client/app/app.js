var app = angular.module('skeleton', [
    'hljs',
    'ui.router',
    'ui.bootstrap',
    'skeleton.router',
    'skeleton.controller'
]);

app.run(['$state', '$rootScope',
    function ($state, $rootScope) {
        $state.go('home');
        $rootScope.logout = function() {
            $state.go('logout');
        }
    }
]);