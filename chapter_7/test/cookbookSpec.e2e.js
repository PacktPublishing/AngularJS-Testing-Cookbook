'use strict';

describe('Testing Filters', function() {

    beforeEach(function() {
        browser.get('http://0.0.0.0:8000/');
    });

    describe('Using Protractor to test filter changes based on input', function() {

        it('should display the correct decimal value', function() {
            var button = element(by.buttonText('Filter'));
            var decimalText = element(by.model('decimal'));
            decimalText.clear();
            decimalText.sendKeys('55.55');
            button.click();
            expect(decimalText.getAttribute('value')).toBe('55.6');
        });

    });

    describe('Using Protractor to test filter changes based on events', function() {

        it('should display the correct time format', function() {
            var button = element(by.partialButtonText('St'));
            var timeText = element(by.binding('timer.current'));
            button.click(); // Start the stop watch
            button.click(); // Stop the stop watch
            // Credit: http://www.mkyong.com/regular-expressions/how-to-validate-time-in-24-hours-format-with-regular-expression/
            expect(timeText.getText()).toMatch(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
        });

    });

});
