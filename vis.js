import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log(d3);

async function drawVis1() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#vis1")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("datasets/LeagueTotals.csv").then(data => {
            
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

    drawVis1();
    drawVis2();
    drawVis3();
    drawVis4();
    drawVis5();
    drawVis6();