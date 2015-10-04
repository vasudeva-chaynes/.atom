'use strict';

angular.module('app')

.controller('DeckController', function ($stateParams, $state, $log, getData, config) {
    var id = $stateParams.deckId;
    if (! id) { return; }
    $state.deckEnabled = true;
    getData(config.flavor + '/library/' + id).then(function (promise) {
        var questions = promise.data;
        $state.info = {
            right: questions.length
        };
        $log.debug(JSON.stringify(questions));
    });
});
