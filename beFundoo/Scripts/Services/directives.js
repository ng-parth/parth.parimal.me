fundooStockTicker.directive('authenticate', function ($location, appAuth, notify) {
    return {
        restrict: 'A',
        link: function () {
            if (!appAuth.isAuthorised()) {
                notify.error('Unauthorised..');
                //alert('Unauthorised..')
                $location.url('/');
            }
        }
    }
});