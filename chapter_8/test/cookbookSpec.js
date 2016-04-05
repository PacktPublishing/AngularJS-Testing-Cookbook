'use strict';

describe('Service & Factory Testing With Mocks and Spies - ', function() {

    var emcees;
    var url;

    describe('Getting started testing a service', function() {

        beforeEach(module('cookbook'));

        beforeEach(inject(function($injector) {
            emcees = $injector.get('emcees');
        }));

        it('should have a method defined', function() {
            expect(emcees.getUKEmcees).toBeDefined();
        });

    });

    describe(' [$httpBackend] ', function() {

        var $httpBackend;

        beforeEach(module('cookbook'));

        beforeEach(inject(function($injector) {
            emcees = $injector.get('emcees');
            $httpBackend = $injector.get('$httpBackend');
            url = '/emcees/uk';
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('Testing HTTP GET requests using $httpBackend', function() {

            beforeEach(function() {
                $httpBackend.when('GET', url).respond({
                    data: ['kamanchi-sly', 'el-eye', 'rola']
                });
            });

            it('should make a GET request', function() {
                $httpBackend.expectGET(url);
                emcees.getUKEmcees();
                $httpBackend.flush();
            });

        });

        describe('Testing HTTP POST requests using $httpBackend', function() {

            it('should make a POST request', function() {
                var emcee = {
                    'name': 'ids'
                };
                $httpBackend.expectPOST(url, emcee).respond(201, '');
                emcees.addUKEmcee(emcee);
                $httpBackend.flush();
            });

        });

    });

    describe(' [spies] ', function() {

        var httpMock;

        beforeEach(module('cookbook', function($provide) {
            httpMock = jasmine.createSpyObj('$http', ['get', 'post']);
            $provide.value('$http', httpMock);
        }));

        beforeEach(inject(function($injector) {
            emcees = $injector.get('emcees');
            url = '/emcees/uk';
        }));

        describe('Using spies to test HTTP GET requests', function() {

            it('should make a GET request (spy)', function() {
                emcees.getUKEmcees();
                expect(httpMock.get).toHaveBeenCalled();
            });

        });

        describe('Using spies to test HTTP POST requests', function() {

            it('should make a POST request (spy)', function() {
                var emcee = {
                    'name': 'alkaline'
                };
                emcees.addUKEmcee(emcee);
                expect(httpMock.post).toHaveBeenCalled();
            });

            it('should make a POST request with correct data (spy)', function() {
                var emcee = {
                    'name': 'tlp'
                };
                emcees.addUKEmcee(emcee);
                expect(httpMock.post).toHaveBeenCalledWith(url, emcee);
            });

        });

        describe(' [promises] ', function() {

            var $q;
            var $scope;

            describe('Test rejected $http promises', function() {

                beforeEach(inject(function($injector) {
                    $q = $injector.get('$q');
                    $scope = $injector.get('$rootScope').$new();
                }));

                it('should throw an error', function() {
                    var errorMsg = 'Unauthorized';
                    var defer = $q.defer();

                    defer.reject(errorMsg);
                    httpMock.get.and.returnValue(defer.promise);

                    expect(function() {
                        emcees.getUKEmcee('1');
                        $scope.$digest();
                    }).toThrowError(errorMsg);
                });

            });

            describe('Testing service data using mock helpers', function() {

                beforeEach(inject(function($injector) {
                    $q = $injector.get('$q');
                    $scope = $injector.get('$rootScope').$new();
                }));

                it('should store the response from the HTTP GET request', function() {
                    var defer = $q.defer();
                    var emcee = jasmine.mockData.emcee();

                    defer.resolve(emcee);
                    httpMock.get.and.returnValue(defer.promise);
                    emcees.getUKEmcee('1');
                    $scope.$digest();
                    expect(emcees.emcee.name).toBe(emcee.name);
                });

            });

        });

    });

    describe('Testing constants', function() {

        beforeEach(module('cookbook'));

        var MESSAGES;

        beforeEach(inject(function($injector) {
            MESSAGES = $injector.get('MESSAGES');
        }));

        it('should have correct errors.http.ukemcees constant', function() {
            var msg = 'There was an error loading emcees based in good old blighty.';
            expect(MESSAGES.errors.ukemcees).toBe(msg);
        });

    });

});
