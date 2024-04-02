app.factory('Service', ['$http', function ($http) {
    var _date = new Date();
    var _time = _date.getTime();
    var Service = {};
    var BASE_URL = "/controller/ProductController";
    
    Service.GetProducts = function (data) {
        return $http.post(BASE_URL + "/GetProducts",
            { "data": JSON.stringify(data) });
    };
    Service.GetResources = function () {
        return $http.post(BASE_URL + "/GetResources", { data: {} });
    };

    return Service;
}]);