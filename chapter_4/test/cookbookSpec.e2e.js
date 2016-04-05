'use strict';

describe('How To Test Navigation And Routing', function() {

  beforeEach(function() {
    browser.get('http://0.0.0.0:8000/');
  });

  it('should initialize scope parameter id to expected value', function() {
    var el = element.all(by.binding('id')).first();
    expect(el.getText()).toEqual('foo');
  });

  it('should update scope parameter id to expected value', function() {
    $('.btn').click();
    var el = element.all(by.binding('id')).first();
    expect(el.getText()).toEqual('1');
  });

  it('should update scope parameter id to expected value on navigation', function() {
    $('.btn').click();
    var el = element.all(by.binding('id')).first();
    expect(el.getText()).toEqual('1');
  });

});
