'use strict';

angular.module('app')

.controller('DeckController', function ($stateParams, $log, getData, config) {
    var id = $stateParams.deckId;
    getData(config.flavor + '/library/' + id).then(function (data) {
        $log.debug(data);
    });
});
