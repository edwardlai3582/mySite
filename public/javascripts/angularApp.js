
var app = angular.module('MyApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/yesterday', {
      controller: "yesterdayController",
      templateUrl: "htmls/yesterday.html",
      resolve: {
        coverPromise: ['yFac', function(yFac){
          return yFac.getAll();
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});

