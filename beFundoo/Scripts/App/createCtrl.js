fundooStockTicker.controller('createCtrl', function ($scope, $filter, $location, stockService, appAuth, notify, arrayExt) {
    $scope.isAuth = appAuth.isAuthorised() ? true : false;
    if ($scope.isAuth) { $scope.loggedInUser = appAuth.getAuthUser(); }
    localStorage['stocks'] = JSON.stringify(stockService.stockMaster);
    $scope.postStock = function (stock) {
        //'var stockExist = $filter('filter')(JSON.parse(localStorage['stocks']), { id: stock.id });
        var stockExist = arrayExt.find(JSON.parse(localStorage['stocks']), 'id', stock.id);
        if (stockExist.exist == true) {
            notify.warning('This Id Exist! Plz enter other id.');
            //alert('This Id Exist! Plz enter other id.');
            return;
        }
        else {
            stockService.stockMaster.push(stock);
            notify.success('New Stock Added');
        }
        //alert('New Stock Added');
        $location.url('/');
    };

    $scope.signOut = function () {
        appAuth.signOut();
        notify.success('Successfully signed out.');
        $location.url('/');
    };
});