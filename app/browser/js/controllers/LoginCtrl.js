app.controller('LoginCtrl', function($scope, $state, apiService) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function(loginInfo) {
        $scope.error = null;

        apiService.login(loginInfo).then(function(res) {
            $state.go('main', {"cid": res.data.response.id});
        }).catch(function(err) {
            $scope.error = 'Invalid login credentials.';
        });

    };

});