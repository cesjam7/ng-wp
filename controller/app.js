var app = angular.module("ng-wp", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
        controller: 'home',
		templateUrl :  wp.template_url + '/view/home.html',
	})
	.when('/blog/:slug', {
        controller: 'single',
		templateUrl :  wp.template_url + '/view/single.html',
	})
	.otherwise({
		redirectTo: '/'
	})

}]);

app.service('WpApi', function($http) {

    this.listPosts = function(callback) {
        $http.get(wp.url + '/wp-json/wp/v2/posts').then(callback);
    }

    this.detailPost = function(slug, callback) {
        $http.get(wp.url + '/wp-json/wp/v2/posts?slug=' + slug).then(callback);
    }

})
app.controller('home', function($scope, WpApi) {

    WpApi.listPosts(function(response) {
        $scope.posts = response.data;
    })

})
app.controller('single', function($scope, $routeParams, WpApi) {

    let slug = $routeParams.slug;
    WpApi.detailPost(slug, function(response) {
        $scope.post = response.data[0];
    })

})
app.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    }
}])
