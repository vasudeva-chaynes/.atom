'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope, $log, _, nextCard) {
    var isRight = function (response) {
        return response[0];
    };
    $log.debug('CardController');
    $scope.nextCard = function () { // XXX simplify
        $log.debug('scope nextCard');
        nextCard();
    };
    $scope.response = function (index) {
        var card = $rootScope.card;
        var items = card.responseItems
        if (_.contains(card.tags, '.ma')) {
            $log.debug('nothing'); // XXX do something
        } else {
            var rightIndex = _.findIndex(card.responses, isRight);
            items[rightIndex].style = 'right-response';
            if (item.index === rightIndex) {
                items[rightIndex].style = 'wrong-response';
            }
        }
        $log.debug('style', JSON.stringify(style));
    };
})

.controller('CardHelpController', function () {})

.service('nextCard', function ($log, $rootScope, $state, _) {
    var makeItem = function (name) {
        return { text: name, style: 'no-response' };
    }
    return function () {
        var remaining = $rootScope.deck.remaining;
        if (remaining.length === 0) { $state.go('tabs.deck'); }
        var card = $rootScope.questions[remaining.shift()];
        if (card.type === 'multiple-choice') {
            card.responseItems = _.map(card.responses, makeItem);
        }
        $rootScope.card = card;
        $log.debug('nextCard', JSON.stringify($rootScope.card));
    };
});
