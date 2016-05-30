//testing controller
//testing is allowed only for public methods

describe('Unit: testing app', function() {
	beforeEach(module('app'));
	
	var MainCtrl,
	scope;
	
	beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    MainCtrl = $controller('AppCtrl', {
      $scope: scope
    });
  }));

	it("should fill with sample data", function() {
		expect(scope.dlugoscSekwencji).toBeUndefined();
		expect(scope.sekwencje).toBeUndefined();
		scope.fillSampleData();
		expect(scope.dlugoscSekwencji).toBeDefined();
		expect(scope.dlugoscSekwencji).toBeGreaterThan(0);
		expect(scope.sekwencje).toBeDefined();
	});
	
	it("should search mediana", function() {
		scope.fillSampleData();
		expect(scope.hamming).toBeUndefined();
		expect(scope.result).toBeUndefined();
		expect(scope.log).toBeUndefined();
		scope.medianSearchAlgorithm();
		expect(scope.hamming).toBeDefined();
		expect(scope.hamming).toBeGreaterThan(0);
		expect(scope.result).toBeDefined();
		expect(scope.log).toBeDefined();
		
		
	});


});