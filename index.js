console.log ("Ya estamos otra vez en D3")

d3.csv ("ev_mig.csv").then (function (datos){
    
    
    console.log (datos)
 
/*    console.log (+(datos[0].Emigración))
    console.log (+(datos[1].Inmigración))
    console.log(new Date(datos[1].Año, datos[1].Periodo=="Semestre 1" ? 5 :  11, 30))*/
    
    const linea = d3.line()
        .x(d => x(new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30)))
        .y(d => y(d.Emigración));
    
    const linea2 = d3.line()
        .x(d => x(new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30)))
        .y(d => y(d.Inmigración));
    
 
    var margin = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 60
    }
    
    var width = 460 - margin.left - margin.right
    var height = 400 - margin.top - margin.bottom
    
    
    var elementoSVG = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
        
        //EJE X
        var x = d3.scaleTime()
            .domain(d3.extent(datos,function(d) {return new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30);}))
            .range([0,width]);
        elementoSVG.append("g")
            .attr("transform","translate(0," + height +")" )
            .call(d3.axisBottom(x));
        
        //EJE Y
        var y = d3.scaleLinear()
            .domain([0,d3.max(datos, function(d) {return +d.Inmigración;})])
            .range([height, 0]);
        elementoSVG.append("g")
            .call(d3.axisLeft(y));
        
        //Líneas
        
        elementoSVG.append("path")
            .datum(datos)
            .attr("fill","none")
            .attr("stroke", "steelblue")
            .attr("stroke-width",1.5)
            .attr("d",linea)
    
        elementoSVG.append("path")
            .datum(datos)
            .attr("fill","none")
            .attr("stroke", "red")
            .attr("stroke-width",1.5)
            .attr("d",linea2)
    })
    
    
    
