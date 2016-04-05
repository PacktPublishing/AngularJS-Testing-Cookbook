'use strict';

describe('Service & Factory Testing With Mocks and Spies', function() {

    beforeEach(function() {
        browser.get('http://0.0.0.0:8000/');
    });

    describe('Using protractor to test HTTP requests', function() {

        it('should do display users and hide the load users button on success', function() {
            var button = element(by.buttonText('Load Users'));
            button.click();
            var firstUsername = element(by.repeater('user in users')
                .row(0).column('{{user.name}}'));
            expect(firstUsername).toBeDefined();
            expect(button.isDisplayed()).toBeFalsy();
        });

    });
});
