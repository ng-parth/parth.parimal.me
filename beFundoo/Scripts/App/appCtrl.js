fundooStockTicker.controller('appCtrl', function ($scope, $location, stockService,appAuth) {
    $scope.title = 'fundooStockTicker';
    
    $scope.setLoginBar = function (isAuth) {
        if (isAuth) {
            $scope.showLogin = false;
            $scope.loggedInUser = appAuth.getAuthUser();
        }
        else {
            $scope.showLogin = true;
        }
    };
    $scope.signOut = function () {
        appAuth.signOut();
        $scope.setLoginBar(false);

    };

    if (appAuth.isAuthorised) {
        $scope.setLoginBar(false);
    }
    else {
        $scope.setLoginBar(true);
    }
 //   $scope.$on(window.close(), appAuth.signOut());

    //$scope.setPageTitle = function (title) {
    //    $scope.title = title;
    //}
});