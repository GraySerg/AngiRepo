var toDoApp = angular.module("ToDoApp", []);
var model = { name: "Adam" };

toDoApp.filter("checkedItems", function () {
    return function (items, showComplete) {
        if (showComplete)
            return items;
        else
        {
            var resultArr = [];
            angular.forEach(items, function (item) {
                if (!item.done) {
                    resultArr.push(item);
                }
            });
            return resultArr;
        }
    }
});

var controler = toDoApp.controller("ToDoController", function ($scope, $http) {
    $http.get("data.json").success(function (res) {
        model.items = res;
    });
    $scope.model = model;
    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.model.items, function (item) {
            if (!item.done) count++;
        });
        return count;
    };
    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-warning" : "label-success";
    };
    $scope.addNewItem = function (actionText, checkValue) {
        $scope.model.items.push({ action: actionText, done: checkValue });
    };
}
);

