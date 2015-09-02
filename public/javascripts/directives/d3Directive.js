app.directive("d3chart", function($window, $compile) {
  return{
    restrict: "E",
    template: "<svg></svg>",
    scope: {
      height:   '@',
      width:    '@',
      chartData:  '=',
      //videoLength: '=',
      youtubeid:'@'    
    },  
    link: function(scope, elem, attrs){
      
           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);
           var videolength=0;
        ////////////////////////
        /*
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+ scope.youtubeid +'?v=2&alt=jsonc', function(data,status,xhr){
      var yt_response = data.data, // If you need more video informations, take a look on this response: data.data
          
          videolength = yt_response.duration;
        });
        */
        
        
                videolength= 331;//scope.videoLength;
     
                //Width and height
                var w = scope.width;
                var h = scope.height;
                var padding = 20;

                 //Create the SVG Viewport
                 var svgContainer = svg.attr("width", w).attr("height", h);

                  
        
        var config = {"avatar_size" : 40}
     
 //Create the Scale we will use for the Axis
 var axisScale = d3.scale.linear()
                          .domain([0, videolength])
                          .range([padding, w - padding ]);
        
 var backbar; 
       

//Create the Axis
var xAxis = d3.svg.axis().scale(axisScale).ticks(videolength-2);
        
        
scope.render = function(albumdata) {
    if (albumdata === undefined) {
                return ;
    }    
//Clear All
svg.selectAll("*").remove();  

  backbar= svgContainer.append("rect")
  .attr("x",padding)
  .attr("y",h/2)
  .attr("width",0)
  .attr("height",6)
  .style("fill", "#F5F6CE"); 
   
    
 
//Create an SVG group Element for the Axis elements and call the xAxis function
var xAxisGroup = svgContainer.append("g").attr("class", "axis").attr("transform", "translate(0,"+h/2+")")                             .call(xAxis);
     
/////////////
      
var defs = svgContainer.append('svg:defs');
var pattern = defs.selectAll("pattern").data(albumdata).enter().append("svg:pattern")
    .attr("id", function (d,i) { return i;})
    .attr("width", config.avatar_size)
    .attr("height", config.avatar_size)
    .append("svg:image")
    .attr("xlink:href", function (d) { return d.pic;})
    .attr("width", config.avatar_size)
    .attr("height", config.avatar_size)
    .attr("x", 0)
    .attr("y", 0);
     
var circle=  svgContainer.selectAll("circle").data(albumdata).enter().append("circle")
.attr("cx", function (d) { return (d.starttime*(w - padding * 2)/videolength)+padding; })
.attr("cy", function (d,i) {
    var gap=0;
    if(i>0&&d.starttime===albumdata[i-1].starttime){
      
        gap= parseInt(d3.selectAll("circle")[0][i-1].attributes.cy.value);
    }
    if(gap===0) return h/2;
    else return gap+config.avatar_size;
})
.attr("r", config.avatar_size/2)
.on("click", function(d){
  console.log("circle JUMP");
  scope.$emit("fromd3",d.starttime) ;
})
.style("fill", function (d,i) { return "url(#"+i+")";});  
    
};

       
      scope.$on("changelength", function (event, data) { 
        //.transition().duration(3000).ease("linear")
           backbar.transition().ease("linear").attr("width",data*(w - padding*2)/(videolength-1)); 
          console.log("changin width");
      });   
       
/*        
scope.$watch('chartData', function(){
      scope.render(scope.chartData);
});
*/
scope.$watchCollection('chartData', function(newNames, oldNames) {
  scope.render(scope.chartData);
});
        
   
    }
  };
});