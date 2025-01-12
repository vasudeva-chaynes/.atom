'use strict';

angular.module('utils', ['ionic'])

// based on http://learn.ionicframework.com/formulas/localstorage/
.service('localStorage', ['$window', function ($window) {
    this.set = function (key, value) {
        $window.localStorage[key] = value;
    };
    this.get = function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
    };
    this.setObject = function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
    };
    this.getObject = function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
    };
}])

.constant('_', window._) // underscore.js access

.service('getData', function ($rootScope, $http, $log) {
    return function (path, success, failure) { // path is relative to www/data
        $http.get('/data/' + path).then(
            function (response) {
                $log.debug('getData', '/data/' + path,
                           JSON.stringify(response));
                success(response.data);
            },
            function (error) {
                if (failure) {
                    return failure(error);
                } else {
                    $log.error('getData', JSON.stringify(error));
                }
            });
    };
})

// TODO test media service: Adapted from
// http://forum.ionicframework.com/t/how-to-play-local-audio-files/7479/5
// for media plugin :
// http://plugins.cordova.io/#/package/org.apache.cordova.media
// Usage:
//   MediaSrv.loadMedia('sounds/mysound.mp3').then(function (media) {
//    media.play();
//   });
.factory('MediaSrv', function ($q, $ionicPlatform, $window, $log) {
    function loadMedia(src, onError, onStatus, onStop) {
        var defer = $q.defer();
        $ionicPlatform.ready(function () {
            var mediaSuccess = function () {
                if (onStop) {
                    onStop();
                }
            };
            var mediaError = function (err) {
                _logError(src, err);
                if (onError) {
                    onError(err);
                }
            };
            var mediaStatus = function (status) {
                if (onStatus) {
                    onStatus(status);
                }
            };

            if ($ionicPlatform.is('android')) {
                src = '/android_asset/www/' + src;
            }
            defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
        });
        return defer.promise;
    }

    function _logError(src, err) {
        $log.error('media error', {
            code: err.code,
            message: getErrorMessage(err.code)
        });
    }

    function getStatusMessage(status) {
        if (status === 0) {
            return 'Media.MEDIA_NONE';
        } else if (status === 1) {
            return 'Media.MEDIA_STARTING';
        } else if (status === 2) {
            return 'Media.MEDIA_RUNNING';
        } else if (status === 3) {
            return 'Media.MEDIA_PAUSED';
        } else if (status === 4) {
            return 'Media.MEDIA_STOPPED';
        } else {
            return 'Unknown status <' + status + '>';
        }
    }

    function getErrorMessage(code) {
        if (code === 1) {
            return 'MediaError.MEDIA_ERR_ABORTED';
        } else if (code === 2) {
            return 'MediaError.MEDIA_ERR_NETWORK';
        } else if (code === 3) {
            return 'MediaError.MEDIA_ERR_DECODE';
        } else if (code === 4) {
            return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';
        } else {
            return 'Unknown code <' + code + '>';
        }
    }

    var service = {
        loadMedia: loadMedia,
        getStatusMessage: getStatusMessage,
        getErrorMessage: getErrorMessage
    };

    return service;
});
