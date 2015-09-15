app.factory("mFac", ['$http',function($http){
  //var o={};
  var o = {
      //feedback:'';
  };
  
  o.send = function(file){
        o.feedback='';
        $http.post('/mail', file)
        .success(function(data){
           //o.covers.push(data);
           if (data==='thanks'){o.feedback='thanks';}
           else{o.feedback='error'}    
        })
        .error(function(){
           consolelog("send fail");    
        });
  };    
    
  return o;

}]);