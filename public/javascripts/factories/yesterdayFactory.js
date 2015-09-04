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
  
  o.upload = function(file){//, uploadUrl){
        var fd = new FormData();
        for (var key in file) {
          fd.append(key, file[key]);  
        }
        //fd.append('pic', file);
        $http.post('/covers', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
           o.covers.push(data);    
        })
        .error(function(){
           consolelog("upload error");    
        });
  };    
    
  return o;

}]);