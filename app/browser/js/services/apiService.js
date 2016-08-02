function ApiService($http) {
    this.$http = $http;
    this.apiGeneralData = {
        name: "demo",
        //created default for dropdown
        accounts: [{ accountName: "All" }]
    };
    this.date = {
        "startdate": "2015-07-24",
        "enddate": "2016-07-24"
    };
}

angular.module('app').service('apiService', ApiService);

ApiService.prototype.login = function(data) {
    return this.$http.post('/client/login', { "email": data.email, "password": data.password });
};

ApiService.prototype.getAllClientHoldingsAndPerformance = function(id) {
    this.id = id;
    return this.$http({
        url: '/client/' + id + '/performance',
        method: 'GET',
        params: this.date
    });
};

ApiService.prototype.getHoldingsByAccountType = function(id) {
    var self = this;
    return this.$http.get('/client/' + id + '/account/')
        .then(function(res) {
            var holdings = [];
            console.log(res);
            res.data.response.map(function(account, index) {
                self.apiGeneralData.accounts.push({
                    accountId: account.id,
                    accountName: account.name
                });
                holdings.push(self.$http.get('/client/' + id + '/account/' + account.id + '/holdings'));
            });
            return Promise.all(holdings);
        });
};

ApiService.prototype.getPerformanceByAccountType = function(accountId) {
    console.log(this.id);
    return this.$http({
        url: '/client/' + this.id + '/account/' + accountId + '/performance',
        method: 'GET',
        params: this.date
    });
};