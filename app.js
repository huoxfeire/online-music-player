// angular改写的music player，在线的
// angular版本 1.5.2
var musicPlayer = {
    version:"3.0.1",
    api:"http://tingapi.ting.baidu.com/v1/restserver/ting",
    volume:0.6,
    rankLists:[1,2,11,21,22,23,24,25]
};

angular.module("musicApp",["ngRoute"])
    .run(["$rootScope",function($rootScope){
        $rootScope.rank_type = {
            "1":"new",
            "2":"hot",
            "11":"rock",
            "21":"en_music",
            "22":"old",
            "23":"each",
            "24":"movie",
            "25":"net_music"
        }
    }])
    .controller("ranksCtrl",["$scope","$http","$window",function($scope,$http,$window){
        //获取排行榜
        $scope.ranklists = [];

        function init_rankLists(){

            for(var i= 0,len=musicPlayer.rankLists.length; i<len; i++){

                $http.jsonp(musicPlayer.api+"?method=baidu.ting.billboard.billList&type="+musicPlayer.rankLists[i]+"&size=3&offset=0&callback='success'");
                $window.success = function(data){

                    $scope.ranklists.push(data);
                }
            }
        }
        init_rankLists();

    }])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when("/",{
            controller:"ranksCtrl",
            templateUrl:"controller/ranks/ranksTmp.html"
        }).when("/:musicList",{
            controller:"musicListCtrl",
            templateUrl:"controller/musicList/musicListTmp.html"
        }).when("/:musicList/:musicID",{
            controller:"playerCtrl"
        }).when("/history",{
            controller:"historyCtrl",
            templateUrl:"controller/history/historyTmp.html"
        });
    }]);