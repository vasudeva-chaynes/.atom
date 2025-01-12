'use strict';

angular.module('app', ['ionic', 'utils'])

/**
 * @name getData
 * @param {string} path to file
 * @param {function} callback accepts data object
 * @param {function} optional callback accepts error object
 * @returns {object} value corresponding to json file contents
 */
.provider('getData', function ($logProvider) {
    // TODO configure as provider instead of service and use in tabs state resolve
    var $http = angular.injector(['ng']).get('$http');
    this.$get = function () {
        return function (path, success, failure) { // path is relative to www/data
            $http.get('/data/' + path).then(
                function (response) {
                    success(response.data);
                },
                function (error) {
                    if (failure) {
                        return failure(error);
                    } else {
                        $logProvider.get().error('getData', JSON.stringify(error));
                    }
                });
            };
    };
})

.config(function ($stateProvider, $urlRouterProvider, $logProvider) {
    $logProvider.debugEnabled(true); // PUBLISH .debugEnabled(false)

    $stateProvider
    .state('tabs', {
        url: '/tabs',
        abstract: true,
        templateUrl: 'views/tabs.html',
        resolve: {
            configPromise: function ($http) {
                return $http.get('/data/config.json');
            }},
        controller: function ($rootScope, configPromise, $log, $filter) {
            // configPromise is resolved: https://github.com/angular-ui/ui-router/wiki
            $rootScope.config = configPromise.data;
            $log.debug($filter('json')($rootScope.config)); // PUBLISH remove
        }
    })
    .state('tabs.decks', {
        url: '/decks',
        views: {
            'decks-tab': {
                templateUrl: 'views/decks/decks.html',
                controller: 'DecksController'
            }
        }
    })
    .state('tabs.card', {
        url: '/card',
        views: {
            'card-tab': {
                templateUrl: 'views/card/card.html',
                controller: 'CardController'
            }
        }
    })
    .state('tabs.settings', {
        url: '/settings',
        views: {
            'settings-tab': {
                templateUrl: 'views/settings/settings.html',
                controller: 'SettingsController'
            }
        }
    })
    .state('tabs.filter', {
        url: '/filter',
        views: {
            'filter-tab': {
                templateUrl: 'views/filter/filter.html',
                controller: 'FilterController'
            }
        }
    });
    $urlRouterProvider.otherwise('/tabs/decks');
})

// .state('tabs.deck', {
//     url: '/deck', // XXX /:deckId',
//     views: {
//         'deck-tab': {
//             templateUrl: 'views/deck/deck.html',
//             controller: 'DeckController'
//         }
//     }
// })
// .state('tabs.answer', {
//     url: '/answer',
//     views: {
//         'card-tab': {
//             templateUrl: 'views/answer/answer.html',
//             controller: 'AnswerController'
//         }
//     }
// })
// .state('tabs.about', {
//     url: '/about',
//     views: {
//         'settings-tab': {
//             templateUrl: 'views/about/about.html',
//             controller: 'AboutController'
//         }
//     }
// })
// .state('tabs.help', {
//     url: '/help',
//     views: {
//         'settings-tab': {
//             templateUrl: 'views/help/help.html',
//             controller: 'HelpController'
//         }
//     }
// })
// .state('tabs.reset', {
//     url: '/about',
//     views: {
//         'settings-tab': {
//             templateUrl: 'views/reset/reset.html',
//             controller: 'ResetController'
//         }
//     }
// })

/**
 * Use x name as tag, attribute, class name, or after directive in comment.
 * The associated element is removed.
 */
.directive('x', function () {
    return {
        restrict: 'AE',
        compile: function (el) {
            el.remove();
        }
    };
})

.run(function ($ionicPlatform, $rootScope, restoreSettings) {
    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions\
    // #issue-im-getting-a-blank-screen-and-there-are-no-errors
    // REVIEW $log.log instead of console?
    $rootScope.$on('$stateChangeError', console.log.bind(console));

    $ionicPlatform.ready(function () {
        // From ionic starter
        // Hide the accessory bar by default (remove this to show the
        // accessory bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    restoreSettings();
});
