'use strict';

angular.module('app')

.controller('ResetController', function ($log, $scope, $state, Deck,
  restoreSettings, saveSettings, LocalStorage) {
    $scope.hideConfirm = true;
    $scope.hideWarning = true;
    $scope.selection = undefined;
    $scope.options = [
        { text: 'Reset current deck', value: 'deck', warning: 'deck'},
        { text: 'Reset all decks', value: 'all decks', warning: 'deck' },
        { text: 'Reset settings to defaults', value: 'settings' },
        { text: 'Reset all user data', value: 'all data', warning: 'deck' }
    ];
    $scope.selected = function(item) {
        $scope.selection = item.value;
        $scope.hideWarning = item.warning !== 'deck';
        $scope.hideConfirm = false;
    };
    $scope.confirmed = function () {
        if ($scope.selection === 'settings') {
            restoreSettings(true);
        } else if ($scope.selection === 'deck') {
            LocalStorage.remove(Deck.data.deckName.full);
        } else if ($scope.selection === 'all decks') {
            // FIXME iterate over decks
            LocalStorage.remove(Deck.data.deckName.full);
        } else if ($scope.selection === 'all data') {
            LocalStorage.clear();
            restoreSettings();
        }
        $state.go('tabs.settings');
    };
});
