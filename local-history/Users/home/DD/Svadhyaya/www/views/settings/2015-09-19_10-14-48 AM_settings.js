'use strict';

angular.module('app')

.controller('SettingsController', function ($log, $scope, settings) {
    $scope.settings = settings;
    $log.debug('controller settings', JSON.stringify(settings));
})

.value('settings', {
    randomQuestions: true,
    randomResponses: false,
    devanagari: false,
    hintPercent: 10
})

.service('restoreSettings', function ($log, settings, localStorage, _) {
    return function () {
        var s = localStorage.getObject('settings');
        if (s !== undefined) {
            $log.debug('restored settings', JSON.stringify(s));
            _.extendOwn(settings, s);
        }
    };
});
