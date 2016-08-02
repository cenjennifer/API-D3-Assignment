angular.module('app').directive('holdingsTable', function() {
    return {
        restrict: "E",
        scope: {
            holdingsData: '='
        },
        templateUrl: "/browser/templates/table.html"
    };
});