console.log ("Ya estamos otra vez en D3")

d3.csv ("ev_mig.csv").then (function (datosCompletos){
    
    window.variabletemporal = datosCompletos
    datos = datosCompletos

    
    console.log (datos)

    
 
/*    console.log (+(datos[0].Emigración))
    console.log (+(datos[1].Inmigración))
    console.log(new Date(datos[1].Año, datos[1].Periodo=="Semestre 1" ? 5 :  11, 30))*/
    
    const linea_Emigracion = d3.line()
        .x(d => x(new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30)))
        .y(d => y(d.Emigración));
    
    const linea_Inmigracion = d3.line()
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
    
              //Tooltip

    
    var Tooltip = d3.select ("body")
        .append("div")
        .attr("class", "tooltip")
        
     var Tooltip2 = d3.select ("body")
        .append("div")
        .attr("class", "tooltip")
        
    
    
    //Función para el primer tooltip cuando el cursor se posiciona sobre un punto del gráfico dejándolo demarcado
    var mouseover = function(d) {
        Tooltip.style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
       var mouseover2 = function(d) {
        Tooltip2.style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    
   //Función para el  tootltip cuando el cursor se posiciona sobre un punto del gráfico mostrando la información 
    var mousemove = function(d){
        Tooltip.html("<p style='color:#022920;'>Año: " + d.Año + "<br/> <b>" + d.Periodo + "</b>" + d.Emigración + "</p>")
            .style("top", d3.event.pageY + 20 + "px")
            .style("left", d3.event.pageX + 20 + "px")
            .transition()
            .style("opacity", 1)
    }
    
     //  2  Función para el  tootltip cuando el cursor se posiciona sobre un punto del gráfico mostrando la información 
    var mousemove2 = function(d){
        Tooltip2.html("<p style='color:#022920;'>Año: " + d.Año + "<br/> <b>" + d.Periodo + "</b>" + d.Inmigración + "</p>")
            .style("top", d3.event.pageY + 20 + "px")
            .style("left", d3.event.pageX + 20 + "px")
            .transition()
            .style("opacity", 1)
    }
    
    //Función para borrar el tooltip cuando el cursor se aleja
    var mouseleave = function(d) {
        Tooltip.style("opacity", 0)
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }
      var mouseleave2 = function(d) {
        Tooltip2.style("opacity", 0)
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }
      
        //EJE X
        var x = d3.scaleTime()
            .domain(d3.extent(datos,function(d) {return new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30);}))
            .range([0,width]);
    
        elementoSVG.append("g")
            .attr("transform","translate(0," + height +")" )
            .call(d3.axisBottom(x));
        
        //EJE Y
        var y = d3.scaleLinear()
            .domain([0,d3.max(datos, function(d) {return Math.max(+d.Emigración, +d.Inmigración);})])
            .range([height, 0]);
        elementoSVG.append("g")
            .call(d3.axisLeft(y));
    
        elementoSVG.append("text")
            .attr("x",10)
            .attr("y",10)
            .text("Inmig.(rojo) - Emig.(azul). En miles")
        elementoSVG.append("text")
            .attr("x",200)
            .attr("y",350)
            .text("Evolución semestral")
    

        
        //Líneas
        
        elementoSVG.append("path")
            .datum(datos)
            .attr("fill","none")
            .attr("stroke", "steelblue")
            .attr("stroke-width",1.5)
            .attr("d",linea_Emigracion)
            
    
        elementoSVG.append("path")
            .datum(datos)
            .attr("fill","none")
            .attr("stroke", "red")
            .attr("stroke-width",1.5)
            .attr("d",linea_Inmigracion)
    
    
    //pintar círculos en los valores de la linea 
        elementoSVG.append("g")
            .selectAll("dot")
            .data(datos)
            .enter()
            .append("circle")
            .transition()
            .duration(4000)
            .ease(d3.easeBounce)
            .delay(500)
            .attr ("r",4)
            .attr("cx", d=> x(new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30)))
            .attr("cy", d=> y(+d.Emigración))
            .attr("fill","black")
           /* .on("mouseover", mouseover)
            .on("mousemove", d => { mousemove(d) })
            .on("mouseleave", mouseleave)*/
         
        elementoSVG.append("g")
            .selectAll("dot")
            .data(datos)
            .enter()
            .append("circle")
            .transition()
            .duration(4000)
            .ease(d3.easeBounce)
            .delay(500)
            .attr ("r",4)
            .attr("cx", d=> x(new Date(d.Año, d.Periodo=="Semestre 1" ? 5 :  11, 30)))
            .attr("cy", d=> y(+d.Inmigración))
            .attr("fill","brown")
  /*          .on("mouseover", mouseover2)
            .on("mousemove", d => { mousemove2(d) })
            .on("mouseleave", mouseleave2)*/
          
    
    })
    
    
