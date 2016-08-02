angular.module('app').controller('MainCtrl', function($scope, apiService, getAllHoldings, getHoldingsByAccountType) {

    $scope.apiService = apiService;

    var allData = getAllHoldings.data.response;
    $scope.holdingsData = allData.holdings;

    $scope.returnsData = allData.returns;

    var accountDate = getHoldingsByAccountType;

    $scope.account = function(i) {
        if (i === 0) {
            $scope.holdingsData = allData.holdings;
            $scope.returnsData = allData.returns;
        } else {
            $scope.holdingsData = accountDate[i - 1].data.response;
            var id = apiService.apiGeneralData.accounts[i].accountId;
            apiService.getPerformanceByAccountType(id).then(function(res) {
                $scope.returnsData = res.data.response.returns;
            });
        }
    };
});