
fundooStockTicker.factory('appAuth', function () {
    var isAuthorised = function () {
        var user = localStorage['username'];
        if (!angular.isUndefined(user) && user != null)
            return true;
        else
            return false;
    }

    signOut = function () {
        localStorage.removeItem('username');
        return;
    },

    setAuthorise = function (user) {
        localStorage['username'] = user;
        return;
    },
    getAuthUser = function () {
        return localStorage['username']
    };

    return {
        isAuthorised: isAuthorised,
        signOut: signOut,
        setAuthorise: setAuthorise,
        getAuthUser: getAuthUser
    }
});

fundooStockTicker.factory('notify', function () {
    toastr.options = {
        "positionClass": "toast-top-right",
    };
    return window.toastr;
});



fundooStockTicker.factory('arrayExt', function () {
    var find = function (array, key, value) {
        for (var i = 0; i < array.length ; i++) {
            if (array[i][key] == value) {
                return { exist: true, object: array[i] };
                break;
            }
        }
        return { exist: false, object: {} };
    }


    return {
        find: find
    };
});