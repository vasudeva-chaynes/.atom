'use strict';

// Jasmine unit tests

describe('getData', function ($log) {
    var $rootScope;

    beforeEach(module('utils'), function () {
        inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        });
    });

    xit('should return object represented in local json file',
        inject(function (getData) {
            var data;
            getData('test/test.json', function (data_) {
                data = data_;
            });
            $rootScope.$digest();
            expect(JSON.stringify(data))
                .toEqual('["data", "for unit test"]');
            // CHECK this error
        }));

    it('should return object represented in local json file',
        inject(function (getData) {
            var handler = jasmine.createSpy('success');
            getData('test/test.json', handler);
            $rootScope.$digest();
            expect(handler).toHaveBeenCalledWith(['data', 'for unit test']);
            // CHECK this error
        }));

    xit('should do something if indicated local json file does not exist',
        // TODO xit
        inject(function ($log, getData) {
            getData('bogus.json', undefined, function (error) {
                $log.error(error);
                expect('Error: ' + error)
                    .toEqual(''); // FIXME this reported error
            });
        }));
});

describe('localStorage', function () {
    beforeEach(module('utils'));
    it('should store and retrieve the same thing',
        inject(function (localStorage) {
            localStorage.set('test key', 'test value');
            expect(localStorage.get('test key')).toEqual('test value');
            expect(localStorage.get('bogus key')).not.toBeDefined();
        }));
});
