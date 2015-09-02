app.factory("yFac", ['$http',function($http){
  //var o={};
  var o = {
    covers: []
  };
    
  o.getAll = function() {
    return $http.get('/covers').success(function(data){
      angular.copy(data, o.covers);
    });
  }; 
  
  return o;

}]);