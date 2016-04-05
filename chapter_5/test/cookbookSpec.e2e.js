'use strict';

describe('Testing User Interaction and Directives', function() {

    beforeEach(function() {
        browser.get('http://0.0.0.0:8000/');
    });

    describe('Directive changes on interaction', function() {

        it('should show content on page load', function() {
            expect($('[ng-show=showBooth].deejay-booth').isDisplayed()).toBeTruthy();
        });

        it('should hide content on button click', function() {
            $('.hide-btn').click();
            expect($('[ng-show=showBooth].deejay-booth').isDisplayed()).toBeFalsy();
        });

    });

});
