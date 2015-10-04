'use strict';

angular.module('app')

.controller('DeckController', function ($stateParams, $rootScope, $scope, $state, $log,
  getData, config, _) {
    var deck = { id: $stateParams.deckId };
    $scope.deck = deck;
    getData('flavors/' + config.flavor + '/library/' + deck.id).then(function (promise) {
        var questions = promise.data;
        _.extendOwn($scope.deck, {
            right: 0,
            wrong: 0,
            close: 0,
            hints: 0,
            skipped: 0,
            remaining: questions.length,
            filter: {
                max: 50,
                min: 50,
                required: [],
                exclude: [],
                include: []
            }
        };
        $log.debug('deck questions', JSON.stringify(questions));
    });
})

.controller('DeckHelpController', function ($scope, $rootScope) {});
