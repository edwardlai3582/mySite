
var app = angular.module('MyApp', ['ngRoute','ngMessages']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/firstpage', {
      controller: "firstpageController",
      templateUrl: "htmls/firstpage.html"
    })
    .when('/yesterday', {
      controller: "yesterdayController",
      templateUrl: "htmls/yesterday.html",
      resolve: {
        coverPromise: ['yFac', function(yFac){
          return yFac.getAll();
        }]
      }
    })
    .when('/projects', {
      controller: "projectsController",
      templateUrl: "htmls/projects.html"
    })
    .when('/aboutme', {
      controller: "aboutmeController",
      templateUrl: "htmls/aboutme.html"
    })
    .otherwise({
      redirectTo: '/firstpage'
    });
});

