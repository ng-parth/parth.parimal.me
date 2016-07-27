fundooStockTicker.controller('loginCtrl', function ($scope, $location, $filter, userService, appAuth, notify, arrayExt) {
    if (appAuth.isAuthorised()) {
        $location.url('/');
    }
    $scope.postLogin = function (userCredential) {
        var user = arrayExt.find(userService.users, 'username', userCredential.username);
        if (user.exist) {
            if (user.object.password == userCredential.password) {
                appAuth.setAuthorise(userCredential.username);
                notify.info('Welcome ' + userCredential.username);
            }
            else {
                notify.error('Incorrect credentials, Try again..');
            }
        }
        else {
            notify.error('Incorrect credentials, Try again..');
            // alert('Incorrect Password, Try again later..');
        }
        $location.url('/');
    };

});