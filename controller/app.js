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
    .when('/insert', {
        controller: 'insert',
        templateUrl :  wp.template_url + '/view/insert.html',
    })
    .otherwise({
        redirectTo: '/'
    })

}]);

app.service('WpApi', function($http) {

    this.listPosts = function(callback) {
        $http.get(wp.json + 'wp/v2/posts').then(callback);
    }

    this.detailPost = function(slug, callback) {
        $http.get(wp.json + 'wp/v2/posts?slug=' + slug).then(callback);
    }

    this.insertPost = function(titulo, contenido, callback) {
        $http({
            method: 'POST',
            data: {
                title : titulo,
                content : contenido,
                status : 'publish'
            },
            headers : {
                'X-WP-Nonce': wp.nonce
            },
            url: wp.json + 'wp/v2/posts'
        }).then(callback);
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
app.controller('insert', function($scope, WpApi) {

    $scope.mensaje = false;
    $scope.insert = function() {
        $scope.mensaje = false;
        let titulo = $('#titulo').val();
        let contenido = $('#contenido').val();

        WpApi.insertPost(titulo, contenido, function(response) {
            console.log('response', response);
            $('#titulo').val('');
            $('#contenido').val('');
            $scope.mensaje = 'El post <a href="#!/blog/'+response.data.slug+'">'+response.data.title.rendered+'</a> se registró correctamente';
        })
    }

})
app.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    }
}])
