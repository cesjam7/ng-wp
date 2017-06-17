var app = angular.module("ng-wp", []);

app.service('WpApi', function($http) {

    this.listPosts = function(callback) {
        $http.get(wp.url + '/wp-json/wp/v2/posts').then(callback);
    }

})
app.controller('home', function($scope, WpApi) {

    WpApi.listPosts(function(response) {
        console.log('posts', response.data);
        $scope.posts = response.data;
        $scope.name = 'cesar';
    })

})
app.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    }
}])
