var app = angular.module('app', []);

app.controller('PeopleCtrl', function($scope,$http,$sce) {
  $scope.type='area';
  $scope.streetData = {};
  // $scope.mapchange = function(){
  //   $scope.type='map';
  //   setTimeout(function(){ google.maps.event.trigger(map, 'resize'); }, 1000);
  // };
  $scope.kaohsiungArea=['楠梓區','左營區','鼓山區','三民區','鹽埕區','前金區','新興區','苓雅區','前鎮區','旗津區','小港區','鳳山區','大寮區','鳥松區','林園區','仁武區','大樹區','大社區','岡山區','路竹區','橋頭區','梓官區','彌陀區','永安區','燕巢區','田寮區','阿蓮區','茄萣區','湖內區','旗山區','美濃區','內門區','杉林區','甲仙區','六龜區','茂林區','桃源區','那瑪夏區'];
  $http.get('/output/data.json').
  success(function(data, status, headers, config) {
    $scope.streetData = data;
    });
  });
