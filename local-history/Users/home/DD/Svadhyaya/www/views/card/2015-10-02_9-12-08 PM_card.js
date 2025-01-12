'use strict';

angular.module('app')

.controller('CardController', function ($rootScope, $scope, $log) {
    var deck = $rootScope.deck;
    this.next = function () {
        $scope.card = deck.remaining.shift();
    };
    $log.debug('Card', deck);
    if (deck) {
        this.next();
    }
})

.controller('CardHelpController', function ($scope, $rootScope) {});
