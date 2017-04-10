angular.module("musicApp")
    .controller("musicListCtrl",["$scope","$http","$rootScope","$routeParams","$window",function($scope,$http,$rootScope,$routeParams,$window){
        var musicList = $routeParams.musicList;
        var rankID = "";
        angular.forEach($rootScope.rank_type, function(value,key){
            if(value === musicList){
                rankID = key;
            }
        });
        if(rankID){
            $http.jsonp(musicPlayer.api+"?method=baidu.ting.billboard.billList&type="+rankID+"&size=100&offset=0&callback='success2'")
        }
        $window.success2 = function(data){
            console.log(data);
            $scope.song_list = data.song_list;
        }
        $scope.play = function($event){
            if(!$event.target.parentNode.getAttribute("data-no")){
                console.log("song id 获取失败");
            }
            console.log(111);
            var song_id = $event.target.parentNode.getAttribute("data-no");
            $http.jsonp(musicPlayer.api+"?method=baidu.ting.song.play&songid="+song_id+"&callback=success3")

        }
        $window.success3 = function(data){
            console.log(data);
            var audio = angular.element("<audio><source src='"+data.bitrate.file_link+"'></audio>");
            audio.attr('crossOrigin','anonymous');
            angular.element("body").append(audio);
        }
    }]);
