fundooStockTicker.controller('editCtrl', function ($scope, $location, $routeParams, $filter, stockService, appAuth, notify, arrayExt) {
    $scope.isAuth = appAuth.isAuthorised() ? true : false;
    if ($scope.isAuth) { $scope.loggedInUser = appAuth.getAuthUser(); }
    localStorage['stocks'] = JSON.stringify(stockService.stockMaster);
    $scope.initEditStock = function () {
        var stockId = $routeParams['id'];
        //var stockDetail = $filter('filter')(JSON.parse(localStorage['stocks']), { 'id': stockId });
        var stockDetail = arrayExt.find(JSON.parse(localStorage['stocks']), 'id', stockId);
        if (stockDetail.exist == false) {
            notify.warning('Incorrect Stock!');
            //alert('Incorrect Stock!')
            $location.url('/');
        }
        else {
            //localStorage.removeItem('oldStock');
            localStorage['oldStock'] = stockId;//JSON.stringify(stockDetail[0]);
            $scope.updStock = stockDetail.object;
        }
    };

    $scope.putStock = function (updStock) {
        var oldStock = localStorage['oldStock'];
        //localStorage.removeItem('oldStock');
        if (updStock.id != oldStock) {
            var stockExist = arrayExt.find(JSON.parse(localStorage['stocks']), 'id', updStock.id);
            if (stockExist.exist == true) {
                notify.warning('This Id Exist! Plz enter other id.');
                //alert('This Id Exist! Plz enter other id.');
                return;
            }
        }
        for (var i = 0; i < stockService.stockMaster.length; i++) {
            if (stockService.stockMaster[i].id == oldStock) {
                stockService.stockMaster[i] = updStock;
                notify.success('Stock updated!');
                //alert('Stock updated!');
                $location.url('/');
                break;
            }
        }
    };

    $scope.signOut = function () {
        appAuth.signOut();
        notify.success('Successfully signed out.');
        $location.url('/');
    };
});