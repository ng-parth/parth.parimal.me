fundooStockTicker.controller('listCtrl', function ($scope, $location, $routeParams, $filter, stockService, appAuth, notify) {
    $scope.isAuth = appAuth.isAuthorised() ? true : false;
    if ($scope.isAuth) {
        $scope.loggedInUser = appAuth.getAuthUser();
    }

    $scope.signOut = function () {
        appAuth.signOut();
        $scope.isAuth = false;
        notify.success('Successfully signed out.');
    };

    $scope.initStockList = function () {
        $scope.stocks = stockService.stockMaster;
    };

    $scope.setGain = function (stock) {
        var gain = ((stock.price - stock.previous) / stock.previous) * 100;
        if (gain > 0)
            return 'text-success';
        else
            if (gain < 0)
                return 'text-error';
    };
});