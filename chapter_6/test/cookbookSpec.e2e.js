'use strict';

describe('Using Spies To Test Events', function() {

    beforeEach(function() {
        browser.get('http://0.0.0.0:8000/');
    });

    describe('Testing events using Protractor', function() {

        it('should update the wu logp background color following click events', function() {
            var logo = $('#logo');
            expect(logo.getCssValue('fill')).toBe('rgb(0, 0, 0)');
            element(by.css('input[value=red]')).click();
            expect(logo.getCssValue('fill')).toBe('rgb(255, 0, 0)');
            element(by.css('input[value=blue]')).click();
            expect(logo.getCssValue('fill')).toBe('rgb(0, 0, 255)');
        });

    });
});
