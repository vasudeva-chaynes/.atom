'use strict';

angular.module('app')

.controller('DeckController', function ($stateParams, $scope, $log, getData, config) {
    var id = $stateParams.deckId;
    $log.debug('deck id', id);
    if (!id) { return; }
    $scope.deckEnabled = true;
    getData(config.flavor + '/library/' + id).then(function (promise) {
        var questions = promise.data;
        $scope.info = {
            right: questions.length
        };
        $log.debug(JSON.stringify(questions));
    });
});
