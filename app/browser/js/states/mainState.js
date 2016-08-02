angular.module('app').config(function($stateProvider) {
    $stateProvider.state('main', {
        url: '/main/:cid',
        templateUrl: 'browser/templates/main.html',
        controller: 'MainCtrl',
        resolve: {
            getAllHoldings: function(apiService, $stateParams) {
                var id = $stateParams.cid;
                return apiService.getAllClientHoldingsAndPerformance(id);
            },
            getHoldingsByAccountType: function(apiService, $stateParams) {
                var id = $stateParams.cid;
                return apiService.getHoldingsByAccountType(id);
            }
        }
    });
});