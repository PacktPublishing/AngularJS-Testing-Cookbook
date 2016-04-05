'use strict';

describe('Testing Filters - ', function() {

    beforeEach(module('cookbook'));

    describe('Testing a filter that formats a number as text', function() {

        var decimalAdjustFilter;

        beforeEach(inject(function($filter) {
            decimalAdjustFilter = $filter('decimalAdjust');
        }));

        it('should adjust decimal correctly using round', function() {
            expect(decimalAdjustFilter('round', 55.55, -1)).toBe(55.6);
        });

        it('should adjust decimal correctly using floor', function() {
            expect(decimalAdjustFilter('floor', 59, 1)).toBe(50);
        });

        it('should adjust decimal correctly using ceil', function() {
            expect(decimalAdjustFilter('ceil', 55.51, -1)).toBe(55.6);
        });

    });

    describe('Testing a filter that formats seconds to a time string', function() {

        var secondsToTimeFilter;

        beforeEach(inject(function($filter) {
            secondsToTimeFilter = $filter('secondsToTime');
        }));

        it('should return a time formatted string (seconds)', function() {
            expect(secondsToTimeFilter(1)).toBe('00:01');
        });

        it('should return a time formatted string (minutes)', function() {
            expect(secondsToTimeFilter(103)).toBe('01:43');
        });

        it('should return a time formatted string (hours)', function() {
            expect(secondsToTimeFilter(9504)).toBe('2:38:24');
        });

    });

});
