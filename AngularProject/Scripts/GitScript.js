(function () {
    var gitApp = angular.module("GitApp", []);
    var MainController =  function ($scope, $http, $interval, $log, $anchorScroll, $location) {
        $scope.repoSortOrder = "-stargazers_count";
        
        $scope.username = "angular";
        $scope.search = function (username) {
            $log.info("Searching for " + username);
            
            $http.get("https://api.github.com/users/" + username).success(function (res) {
                $scope.user = res;
                $http.get($scope.user.repos_url).success(function (repoList) {
                    $scope.user.repoList = repoList;
                    $location.hash("userDetails");
                    $anchorScroll();//.scroll("userDetails");
                });
                if (countDownInterval)
                {
                    $interval.cancel(countDownInterval);
                    $scope.countdown = null;
                }
            });
        };
        
        $scope.countdown = 5;
        var countDownInterval;
        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown<1)
                $scope.search($scope.username);

        };
        var startCountdown = function()
        {
            countDownInterval= $interval(decrementCountdown,1000,$scope.countdown);
        };
        startCountdown();
        

    };
    
    gitApp.controller("GitController",MainController);
}());

