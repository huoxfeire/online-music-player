angular.module("musicApp")
    .controller("musicListCtrl",["$scope","$http","$rootScope","$routeParams",function($scope,$http,$rootScope,$routeParams){
        var musicList = $routeParams.musicList;
        var rankID = "";
        angular.forEach($rootScope.rank_type, function(value,key){
            if(value === musicList){
                rankID = key;
            }
        });
        if(rankID){
            $http.jsonp(musicPlayer.api+"?method=baidu.ting.billboard.billList&type="+rankID+"&size=200&offset=0&callback='success2'")
        }
        window.success2 = function(data){
            console.log(data);
            $scope.song_list = data.song_list;
        }
    }]);