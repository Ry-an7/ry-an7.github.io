import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log(d3);

async function drawVis1() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#vis1")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Average Goals Per Game"]) 
        .map(d => ({
            Season: +d["Season"].split('-')[0], 
            AverageGoalsPerGame: +d["Average Goals Per Game"]
        }))
        .sort((a, b) => a.Season - b.Season);
    console.log(cleanedData);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Season))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(cleanedData, d => d.AverageGoalsPerGame)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Season");

    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("x", -height / 2)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Average Goals Per Game");

    const line = d3.line()
        .x(d => x(d.Season))
        .y(d => y(d.AverageGoalsPerGame));

    svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line);

    // Tooltip functionality
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    // Tooltips interaction
    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    d3.pairs(cleanedData, (a, b) => {
        rects.append("rect")
            .attr("x", x(a.Season))
            .attr("height", height)
            .attr("width", x(b.Season) - x(a.Season))
            .on("mouseover", function(event) {
                
                tooltip.style("visibility", "visible")
                    .text(`Season: ${a.Season}, Avg Goals: ${a.AverageGoalsPerGame}`);

                dot.attr("cx", x(a.Season))
                    .attr("cy", y(a.AverageGoalsPerGame))
                    .style("visibility", "visible");
            })
            .on("mousemove", function(event) {
                tooltip.style("top", (event.pageY + 5) + "px")
                    .style("left", (event.pageX + 5) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("visibility", "hidden");
                dot.style("visibility", "hidden");
            });
    });
}

async function drawVis2() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#vis1-2")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
        const cleanedData = data
            .filter(d => d["Season"] && d["Average Goals Per Game"]) 
            .map(d => ({
                Season: +d["Season"].split('-')[0], 
                AverageGoalsPerGame: +d["Average Goals Per Game"]
            }))
            .filter(d => d.Season >= 1990 && d.Season <= 2024)
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([2.5, d3.max(cleanedData, d => d.AverageGoalsPerGame)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Average Goals Per Game");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.AverageGoalsPerGame));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis3() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#vis1-3")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
        const cleanedData = data
            .filter(d => d["Season"] && d["Average Goals Per Game"]) 
            .map(d => ({
                Season: +d["Season"].split('-')[0], 
                AverageGoalsPerGame: +d["Average Goals Per Game"]
            }))
            .filter(d => d.Season >= 1997 && d.Season <= 2004)
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([2.5, d3.max(cleanedData, d => d.AverageGoalsPerGame)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Average Goals Per Game");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.AverageGoalsPerGame));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis4() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#vis2-1")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
        const cleanedData = data
            .filter(d => d["Season"] && d["Season Goals"]) 
            .map(d => ({
                Season: +d["Season"].split('-')[0], 
                SeasonGoals: +d["Season Goals"]
            }))
            
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(cleanedData, d => d.SeasonGoals)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Goals per Season");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.SeasonGoals));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis5() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#vis2-2")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
        const cleanedData = data
            .filter(d => d["Season"] && d["Season Goals"]) 
            .map(d => ({
                Season: +d["Season"].split('-')[0], 
                SeasonGoals: +d["Season Goals"]
            }))
            .filter(d => d.Season >= 1990 && d.Season <= 2023)
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([2.5, d3.max(cleanedData, d => d.SeasonGoals)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Goals per Season");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.SeasonGoals));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis6() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#vis2-3")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
        const cleanedData = data
            .filter(d => d["Season"] && d["Season Goals"]) 
            .map(d => ({
                Season: +d["Season"].split('-')[0], 
                SeasonGoals: +d["Season Goals"]
            }))
            .filter(d => d.Season >= 1994 && d.Season <= 2005)
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([2.5, d3.max(cleanedData, d => d.SeasonGoals)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Goals per Season");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.SeasonGoals));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis7() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    const tickValues = d3.range(8, 12.9, 0.5).concat(12.9);

        const svg = d3.select("#vis3-1")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
        const cleanedData = data
            .filter(d => d["Season"] && d["Shooting Percentage"]) 
            .map(d => ({
                Season: +d["Season"].split('-')[0], 
                ShootingPercentage: +d["Shooting Percentage"]
            }))
            
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([8, d3.max(cleanedData, d => d.ShootingPercentage)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y).tickValues(tickValues))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Shooting Percentage");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.ShootingPercentage));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis8() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const tickValues = d3.range(8.5, 12.2, 0.5).concat(12.2);

        const svg = d3.select("#vis3-2")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            const cleanedData = data
                .filter(d => d["Season"] && d["Shooting Percentage"]) 
                .map(d => ({
                    Season: +d["Season"].split('-')[0], 
                    ShootingPercentage: +d["Shooting Percentage"]
            }))
            .filter(d => d.Season >= 1989 && d.Season <= 2024)
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([8.5, d3.max(cleanedData, d => d.ShootingPercentage)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y).tickValues(tickValues))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Shooting Percentage");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.ShootingPercentage));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis9() {

    const margin = { top: 20, right: 30, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const tickValues = d3.range(0.865, 0.930, 0.005);

    const svg = d3.select("#vis4-1")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("datasets/LeagueTotals.csv").then(data => {
        const cleanedData = data
            .filter(d => d["Season"] && d["Save Percentage"])
            .map(d => ({
                Season: +d["Season"].split('-')[0],
                SavePercentage: +d["Save Percentage"]
        }))
        .sort((a, b) => a.Season - b.Season);
        console.log(cleanedData);

        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0.865, 0.925])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y).tickValues(tickValues))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Save Percentage");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.SavePercentage));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis10() {

    const margin = { top: 20, right: 30, bottom: 50, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const tickValues = d3.range(0.890, 0.915, 0.001);

    const svg = d3.select("#vis4-2")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("datasets/LeagueTotals.csv").then(data => {
        const cleanedData = data
            .filter(d => d["Season"] && d["Save Percentage"])
            .map(d => ({
                Season: +d["Season"].split('-')[0],
                SavePercentage: +d["Save Percentage"]
            }))
            .filter(d => d.Season >= 1995 && d.Season <= 2005)
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);

        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0.890, 0.915])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y).tickValues(tickValues))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Save Percentage");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.SavePercentage));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}

async function drawVis11() {

    
    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#vis5-1")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
        const cleanedData = data
            .filter(d => d["Season"] && d["Number of Teams"]) 
            .map(d => ({
                Season: +d["Season"].split('-')[0], 
                NumberofTeams: +d["Number of Teams"]
            }))
            .filter(d => d.Season >= 1979 && d.Season <= 2006)
            .sort((a, b) => a.Season - b.Season);
            console.log(cleanedData);
        
        const x = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.Season))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([20, d3.max(cleanedData, d => d.NumberofTeams)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Season");

        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("x", -height / 2)
            .attr("y", -50)
            .attr("transform", "rotate(-90)")
            .attr("fill", "black")
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .text("Number of Teams");

        const line = d3.line()
            .x(d => x(d.Season))
            .y(d => y(d.NumberofTeams));

        svg.append("path")
            .datum(cleanedData)
            .attr("class", "line")
            .attr("d", line);
    });
}



    drawVis1();
    drawVis2();
    drawVis3();
    drawVis4();
    drawVis5();
    drawVis6();
    drawVis7();
    drawVis8();
    drawVis9();
    drawVis10();
    drawVis11();