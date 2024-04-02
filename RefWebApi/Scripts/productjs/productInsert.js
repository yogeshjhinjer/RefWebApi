
app.controller("productInsert", function ($scope, Service) {

    console.log("dataService", Service);

    $scope.todayDate = new Date();
    var d_t = $scope.todayDate.toLocaleDateString("en-US");
    if (d_t) {
        var split = d_t.split('/');
        var month = split[0].length == 1 ? '0' + split[0] : split[0];
        var day = split[1].length == 1 ? '0' + split[1] : split[1];
        $scope.todayDate = split[2]+ "-" +month + "-" + day;
    }

    console.log("todayDate ", $scope.todayDate);

    $scope.productName = "";
    $scope.productType = "1";
    $scope.productQuantity = "";
    $scope.showAddProductDiv = false;
    $scope.productList = [];
    $scope.productList = [
        { id: 1, productName: 'Apple', productType: 1, productQuantity: 3, purchaseDate: '2024-03-30', expiryDate: '2024-04-03' },
        { id: 2, productName: 'Orange', productType: 2, productQuantity: 5, purchaseDate: '2024-03-30', expiryDate: '2024-04-01' },
        { id: 3, productName: 'Milk', productType: 3, productQuantity: 7, purchaseDate: '2024-03-30', expiryDate: '2024-04-01' },
        { id: 4, productName: 'Tommato', productType: 1, productQuantity: 9, purchaseDate: '2024-03-30', expiryDate: '2024-04-05' },
        { id: 5, productName: 'Banana', productType: 2, productQuantity: 11, purchaseDate: '2024-03-30', expiryDate: '2024-04-03' }];

    $scope.productHistoryList = [];
    $scope.productHistoryList = [
        { id: 1, productName: 'Apple', productType: 1, productQuantity: 1, purchaseDate: '2024-03-30', expiryDate: '2024-04-03' },
        { id: 2, productName: 'Orange', productType: 2, productQuantity: 3, purchaseDate: '2024-03-30', expiryDate: '2024-04-03' },
        { id: 3, productName: 'Milk', productType: 3, productQuantity: 5, purchaseDate: '2024-03-30', expiryDate: '2024-04-01' },
        { id: 4, productName: 'Tommato', productType: 1, productQuantity: 7, purchaseDate: '2024-03-30', expiryDate: '2024-04-05' },
        { id: 5, productName: 'Banana', productType: 2, productQuantity: 9, purchaseDate: '2024-03-30', expiryDate: '2024-04-03' }];

    $scope.productTypeList = [{ ptId: 1, name: "Fruits" }, { ptId: 2, name: "Vegitables" }, { ptId: 3, name: "Others" }];

    $scope.expProductList = [];
    $scope.expProductList = $scope.productList;
    $scope.GetProducts = function () {

        $scope.productList = [];
        var url = "http://localhost/RefWebApi/api/Products";
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "Get",
            success: function (result) {

                if (result != null) {
                    $scope.productList = result;
                }

                console.log("$scope.productList", $scope.productList);

                console.log("result", result);
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    $scope.GetProductType = function () {

        var url = "http://localhost/RefWebApi/api/ProductType";
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "Get",
            success: function (result) {

                $scope.productTypeList = [];
                if (result != null) {
                    $scope.productTypeList = result;
                }

                console.log("$scope.productTypeList", $scope.productTypeList);
                console.log("result", result);
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    $scope.GetProductType();
    setTimeout(function () {
        $scope.GetProducts();
    }, 500);

    $scope.GetProductsHistory = function () {
        setTimeout(function () {

            var url = "http://localhost/RefWebApi/api/ProductHistory";
            $.ajax({
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "Get",
                success: function (result) {
                    $scope.productHistoryList = result;
                    console.log("$scope.productHistoryList", $scope.productHistoryList);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }, 500);
    }

    //ExpiredProduct
    $scope.GetExpiredProducts = function () {
        
        var url = "http://localhost/RefWebApi/api/ExpiredProduct";
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "Get",
            success: function (result) {

                $scope.expProductList = result;

                console.log("$scope.expProductList", $scope.expProductList);

                console.log("result", result);
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    //ProductHistory
    //ProductType
    $scope.getProductTypeText = function (val) {

        var txt = $scope.productTypeList.filter(x => x.ptId == val)[0].name;
        return txt;
    }

    $scope.addProduct = function () {
        $scope.showAddProductDiv = true;
    }

    $scope.updateProduct = false;
    $scope.selectedProductId = 0;
    $scope.updateProduct = function (id) {

        $scope.selectedProductId = id;
        $scope.showAddProductDiv = true;
        var data = $scope.productList.filter(x => x.id == id)[0];

        $scope.productName = data.productName;
        $scope.productType = data.productType;
        $scope.productQuantity = data.productQuantity;
        $scope.purchaseDate = data.purchaseDate;
        $scope.updateProduct = true;

    }

    $scope.saveProduct = function () {

        if ($scope.updateProduct) {
            var data = $scope.productList.filter(x => x.id == $scope.selectedProductId)[0];

            data.productName = $scope.productName;
            data.productType = $scope.productType;
            data.productQuantity = $scope.productQuantity;
            data.purchaseDate = $scope.purchaseDate;
            $scope.updateProduct = false;
            $scope.selectedProductId = 0;

        } else {
            var today = new Date();
            var prd = {};
            prd["productName"] = $scope.productName;
            prd["productType"] = $scope.productType;
            prd["productQuantity"] = $scope.productQuantity;
            prd["purchaseDate"] = today.toLocaleDateString("en-US");

            var maxId = $scope.productList[$scope.productList.length - 1].id;
            maxId = maxId + 1;
            prd["id"] = maxId;

            $scope.productList.push(prd);
            $scope.showAddProductDiv = false;
            $scope.updateProduct = false;
            $scope.selectedProductId = 0;
        }
    }

});
