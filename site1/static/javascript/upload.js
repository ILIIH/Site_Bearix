const lenght_arr = 1500;
    var freq = '{{ freequency }}'
    var Mag = '{{ Magnitude }}'

    var freq2 = '{{ freequency2 }}'
    var Mag2 = '{{ Magnitude2 }}'

    var freq3 = '{{ freequency3 }}'
    var Mag3 = '{{ Magnitude3 }}'


    ///// Preloader /////
function Start_Load(){
    let prealoader = document.getElementById('page_preloader')
    prealoader.classList.remove('done')
}
window.onload = function Loaded(){
    setTimeout(function(){
        let prealoader = document.getElementById('page_preloader')
        if(!prealoader.classList.contains('done')){
            prealoader.classList.add('done')
        }
    },1000)
}

    if('{{ Need_to_Load }}'==1){
          
    //// Если надо загрузить АЧХ  ////

    console.log(freq);
    f = toArr(freq,lenght_arr);
    m = toArr(Mag,lenght_arr);

    f2 = toArr(freq2,lenght_arr);
    m2 = toArr(Mag2,lenght_arr);

    f3 = toArr(freq3,lenght_arr);
    m3 = toArr(Mag3,lenght_arr);

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 660 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;



    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    var svg2 = d3.select("#my_dataviz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    var svg3 = d3.select("#my_dataviz3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


          
   
    

    paint(f,m,svg,"min1","max1");
    paint(f2,m2,svg2,"min2","max2");
    paint(f3,m3,svg3,"min3","max3");

    function paint (freq,Mag,tempsvg,Min_id,Max_id) {

          var data = Union(freq,Mag)

          let zer =  data[0].freq;
          let zer1 = "<br/> <br/> Значение в нуле : <br/> <br/> Амплитуда = ";
            zer1 += zer;
            zer1+= " <br/> Частота = ";
            zer1 += 0;
            data[0].freq=0; 
            document.getElementById(Min_id).innerHTML =zer1; 


            let max = d3.max(data, function(d) {  return +d.freq; })
            let max1 = "<br/> <br/> <br/> Максимальное значение :<br/> <br/> Амплитуда = ";
            max1 += max;
            max1+= "<br/>Частота = ";
            max1 += data.find(el=>el.freq==max).Mag;
            document.getElementById(Max_id).innerHTML = max1;

          // Set the ranges
          var x = d3.scaleLinear().range([0, width]);
          var y = d3.scaleLinear().range([height, 0]);

         
          // Define the axes
  
          let clip = tempsvg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

          // Define the line
          var valueline = d3.line()
          .x(function(d) { return x(d. Mag); })
          .y(function(d) { return y(d.freq); });

          let area = tempsvg.append('g')
          .attr("clip-path", "url(#clip)")

          let areaGenerator  = d3.area()  
          .x(function(d) { return x(d.Mag); })
          .y0(height)
          .y1(function(d) { return y(d.freq); });


        //// BRUSH /// 
        var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) 

      tempsvg.append("g")
      .attr("class", "brush")
      .call(brush);

      x.domain([0, d3.max(data, function(d) { return d.Mag; })]);
          y.domain([0, d3.max(data, function(d) { return d.freq; })]);

          tempsvg.append("text")
    .attr("x", (width / 2))
    .attr("y", 10 )
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .text("АЧХ  :");
    
     
    tempsvg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 20+width/2)
    .attr("y", height + 28)
    .style("font-size", "10px")
    .text("Частота (Гц)");


          var xAxis = tempsvg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

          area.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", areaGenerator);

          tempsvg.append("g")
          .call(d3.axisLeft(y))
          .attr("stroke", "black");


      var idleTimeout
  function idled() { idleTimeout = null; }

  // A function that update the chart for given boundaries
  function updateChart() {

    extent = d3.event.selection

    if(!extent){
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
      x.domain([ 4,8])
    }else{
      x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      tempsvg.select(".brush").call(brush.move, null) 
    }


    // Update axis and area position
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
      area
          .select('.area')
          .transition()
          .duration(1000)
          .attr("d", areaGenerator)
    }

    tempsvg.on("dblclick",function(){
      
      x.domain([0, d3.max(data, function(d) { return d.Mag; })])
      xAxis.transition().call(d3.axisBottom(x))
      area
        .select('.area')
        .transition()
        .attr("d", areaGenerator)
    });

       


}




    
　
    function Union(arr1,arr2){
      var NewARR = [];
          
     for(let i =0 ;i < lenght_arr;i++){
         var temARR  = {freq: arr2[i], Mag: arr1[i]}
         NewARR[i] = temARR;
      }
      
      console.log(NewARR);
     
      
        return NewARR;
    }
    function Max(Arr){
      var tempMax=0;
      for(var i =0 ; i<lenght_arr;i++){
            if(Arr[i]>tempMax){
            
            tempMax= Arr[i];}
        
      }      return tempMax;
    }
    function toArr (str,lenght){
        var count=0;
        let number = "";
        var Arr= {};
        for(let i =2 ;i<8000000;i++){
          if(count==lenght)break;
          number+=  str[i];
          if(str[i]==','){
            numb = parseFloat(number);
            Arr[count]=numb;
            number="";
            count++; 
          }
        }
        console.log(Arr);
        return Arr;
          
    } 

  }
    ///// После нажатия на загрузку 
    document.getElementById("input").onchange = function() {
      Start_Load();
    document.getElementById("form").submit();};
    //////////////////////