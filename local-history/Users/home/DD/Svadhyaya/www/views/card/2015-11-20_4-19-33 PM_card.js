'use strict';

angular.module('app')

.controller('CardController', function ($scope, $log, _, Deck, $ionicGesture) {

    var done = false;

    var skip = function () {
        done = false;
        Deck.next();
    };
    var element = angular.element(document.querySelector('#content'));
    $ionicGesture.on('swipeleft', skip, element);

    var isRight = function (response) {
        return response[0];
    };
    $scope.response = function (index) {
        var card = Deck.card;
        var items = card.responseItems;
        if (_.contains(card.tags, '.ma')) {
            $log.debug('multiple answer');
            if (card.responses[index][0]) {
                items[index].style = 'right-response';
            } else {
                items[index].style = 'wrong-response';
            }
        } else {
            var rightIndex = _.findIndex(card.responses, isRight);
            items[rightIndex].style = 'right-response';
            if (index !== rightIndex) {
                items[index].style = 'wrong-response';
                Deck.outcome('wrong');
            } else {
                Deck.outcome('right');
            }
            done = true;
        }
        $log.debug('response items', JSON.stringify(items));
    };

    $scope.maDone = function () {
        _.forEach(Deck.card.responseItems, function (item) {
            
        };
        done = true;
        // TODO score and nextcard
    };
})

.controller('CardHelpController', function () {})
;
