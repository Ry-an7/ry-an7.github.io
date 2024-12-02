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

    // Average line
    const avgGoals = d3.mean(cleanedData, d => d.AverageGoalsPerGame);
    
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(avgGoals))
        .attr("x2", width)
        .attr("y2", y(avgGoals))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 4");

    svg.append("text")
        .attr("x", 3)
        .attr("y", y(avgGoals) - 5)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("font-weight", "bold") 
        .style("text-anchor", "start")
        .text(`Avg: ${avgGoals.toFixed(2)} Goals/Game`);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

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
                const seasonRange = `${a.Season}-${a.Season + 1}`;

                tooltip.style("visibility", "visible")
                .html(`<strong>Season:</strong> ${seasonRange}<br><strong>Avg. Goals:</strong> ${a.AverageGoalsPerGame.toFixed(2)}`);

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

    const data = await d3.csv("datasets/LeagueTotals.csv");

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

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    d3.pairs(cleanedData, (a, b) => {
        rects.append("rect")
            .attr("x", x(a.Season))
            .attr("height", height)
            .attr("width", x(b.Season) - x(a.Season))
            .on("mouseover", function(event) {
                const seasonRange = `${a.Season}-${a.Season + 1}`;

                tooltip.style("visibility", "visible")
                    .html(`<strong>Season:</strong> ${seasonRange}<br><strong>Avg. Goals:</strong> ${a.AverageGoalsPerGame.toFixed(2)}`);

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

async function drawVis3() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#vis1-3")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Average Goals Per Game"]) 
        .map(d => ({
            Season: d["Season"],
            AverageGoalsPerGame: +d["Average Goals Per Game"]
        }))
        .filter(d => d.Season >= "1997-1998" && d.Season <= "2004-2005")
        .sort((a, b) => a.Season.localeCompare(b.Season));

    console.log(cleanedData);

    const x = d3.scaleBand()
        .domain(cleanedData.map(d => d.Season))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([2.5, d3.max(cleanedData, d => d.AverageGoalsPerGame)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
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
        .x(d => x(d.Season) + x.bandwidth() / 2)
        .y(d => y(d.AverageGoalsPerGame));

    svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    cleanedData.forEach(d => {
        rects.append("rect")
            .attr("x", x(d.Season))
            .attr("height", height)
            .attr("width", x.bandwidth())
            .on("mouseover", function(event) {
                tooltip.style("visibility", "visible")
                    .text(`Season: ${d.Season}, Avg Goals: ${d.AverageGoalsPerGame}`);

                dot.attr("cx", x(d.Season) + x.bandwidth() / 2)
                    .attr("cy", y(d.AverageGoalsPerGame))
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

async function drawVis4() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#vis2-1")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Season Goals"]) 
        .map(d => ({
            Season: d["Season"],
            Year: +d["Season"].split('-')[0],
            SeasonGoals: +d["Season Goals"]
        }))
        .sort((a, b) => a.Year - b.Year);

    console.log(cleanedData);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Year))
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
        .x(d => x(d.Year))
        .y(d => y(d.SeasonGoals));

    svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    cleanedData.forEach(d => {
        rects.append("rect")
            .attr("x", x(d.Year))
            .attr("height", height)
            .attr("width", 5)
            .on("mouseover", function(event) {
                tooltip.style("visibility", "visible")
                    .text(`Season: ${d.Season}, Goals: ${d.SeasonGoals}`);
                dot.attr("cx", x(d.Year))
                    .attr("cy", y(d.SeasonGoals))
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

async function drawVis5() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#vis2-2")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Season Goals"]) 
        .map(d => ({
            Season: d["Season"],
            Year: +d["Season"].split('-')[0],
            SeasonGoals: +d["Season Goals"]
        }))
        .filter(d => d.Year >= 1990 && d.Year <= 2023)
        .sort((a, b) => a.Year - b.Year);

    console.log(cleanedData);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Year))
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
        .x(d => x(d.Year))
        .y(d => y(d.SeasonGoals));

    svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    cleanedData.forEach(d => {
        rects.append("rect")
            .attr("x", x(d.Year))
            .attr("height", height)
            .attr("width", 5)
            .on("mouseover", function(event) {
                tooltip.style("visibility", "visible")
                    .text(`Season: ${d.Season}, Goals: ${d.SeasonGoals}`);

                dot.attr("cx", x(d.Year))
                    .attr("cy", y(d.SeasonGoals))
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

async function drawVis6() {
    
    const margin = {top: 20, right: 30, bottom: 50, left: 60},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#vis2-3")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Season Goals"]) 
        .map(d => ({
            Season: d["Season"],
            Year: +d["Season"].split('-')[0],
            SeasonGoals: +d["Season Goals"]
        }))
        .filter(d => d.Year >= 1994 && d.Year <= 2005)
        .sort((a, b) => a.Year - b.Year);

    console.log(cleanedData);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Year))
        .range([0, width]);

        const y = d3.scaleLinear()
        .domain([3000, 7500]) // Set the lower bound to 3000
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => {
            const year = d;
            return `${year}-${year + 1}`;
        }))
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
        .x(d => x(d.Year))
        .y(d => y(d.SeasonGoals));

    svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    cleanedData.forEach(d => {
        rects.append("rect")
            .attr("x", x(d.Year))
            .attr("height", height)
            .attr("width", 5)
            .on("mouseover", function(event) {
                tooltip.style("visibility", "visible")
                    .text(`Season: ${d.Season}, Goals: ${d.SeasonGoals}`);

                dot.attr("cx", x(d.Year))
                    .attr("cy", y(d.SeasonGoals))
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


async function drawVis7() {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    const tickValues = d3.range(8, 12.9, 0.5).concat(12.9);

    const svg = d3.select("#vis3-1")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Shooting Percentage"])
        .map(d => ({
            Season: +d["Season"].split('-')[0],
            ShootingPercentage: +d["Shooting Percentage"]
        }))
        .sort((a, b) => a.Season - b.Season);

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

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    d3.pairs(cleanedData, (a, b) => {
        rects.append("rect")
            .attr("x", x(a.Season))
            .attr("height", height)
            .attr("width", x(b.Season) - x(a.Season))
            .on("mouseover", function () {
                const seasonRange = `${a.Season}-${a.Season + 1}`;
                tooltip.style("visibility", "visible")
                    .text(`Season: ${seasonRange}, Shooting %: ${a.ShootingPercentage.toFixed(2)}`);
                dot.attr("cx", x(a.Season))
                    .attr("cy", y(a.ShootingPercentage))
                    .style("visibility", "visible");
            })
            .on("mousemove", function (event) {
                tooltip.style("top", (event.pageY + 5) + "px")
                    .style("left", (event.pageX + 5) + "px");
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
                dot.style("visibility", "hidden");
            });
    });

    const lastPoint = cleanedData[cleanedData.length - 1];
    rects.append("rect")
        .attr("x", x(lastPoint.Season))
        .attr("height", height)
        .attr("width", 10)
        .on("mouseover", function () {
            const seasonRange = `${lastPoint.Season}-${lastPoint.Season + 1}`;
            tooltip.style("visibility", "visible")
                .text(`Season: ${seasonRange}, Shooting %: ${lastPoint.ShootingPercentage.toFixed(2)}`);
            dot.attr("cx", x(lastPoint.Season))
                .attr("cy", y(lastPoint.ShootingPercentage))
                .style("visibility", "visible");
        })
        .on("mousemove", function (event) {
            tooltip.style("top", (event.pageY + 5) + "px")
                .style("left", (event.pageX + 5) + "px");
        })
        .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
            dot.style("visibility", "hidden");
        });
}

async function drawVis8() {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const tickValues = d3.range(8.5, 12.2, 0.5).concat(12.2);

    const svg = d3.select("#vis3-2")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Shooting Percentage"])
        .map(d => ({
            Season: +d["Season"].split('-')[0],
            ShootingPercentage: +d["Shooting Percentage"]
        }))
        .filter(d => d.Season >= 1989 && d.Season <= 2024)
        .sort((a, b) => a.Season - b.Season);

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

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    d3.pairs(cleanedData, (a, b) => {
        rects.append("rect")
            .attr("x", x(a.Season))
            .attr("height", height)
            .attr("width", x(b.Season) - x(a.Season))
            .on("mouseover", function () {
                const seasonRange = `${a.Season}-${a.Season + 1}`;
                tooltip.style("visibility", "visible")
                    .text(`Season: ${seasonRange}, Shooting %: ${a.ShootingPercentage.toFixed(2)}`);
                dot.attr("cx", x(a.Season))
                    .attr("cy", y(a.ShootingPercentage))
                    .style("visibility", "visible");
            })
            .on("mousemove", function (event) {
                tooltip.style("top", (event.pageY + 5) + "px")
                    .style("left", (event.pageX + 5) + "px");
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
                dot.style("visibility", "hidden");
            });
    });

    const lastPoint = cleanedData[cleanedData.length - 1];
    rects.append("rect")
        .attr("x", x(lastPoint.Season))
        .attr("height", height)
        .attr("width", 10)
        .on("mouseover", function () {
            const seasonRange = `${lastPoint.Season}-${lastPoint.Season + 1}`;
            tooltip.style("visibility", "visible")
                .text(`Season: ${seasonRange}, Shooting %: ${lastPoint.ShootingPercentage.toFixed(2)}`);
            dot.attr("cx", x(lastPoint.Season))
                .attr("cy", y(lastPoint.ShootingPercentage))
                .style("visibility", "visible");
        })
        .on("mousemove", function (event) {
            tooltip.style("top", (event.pageY + 5) + "px")
                .style("left", (event.pageX + 5) + "px");
        })
        .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
            dot.style("visibility", "hidden");
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

    const data = await d3.csv("datasets/LeagueTotals.csv");

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
    
    // Tooltips
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    d3.pairs(cleanedData, (a, b) => {
        rects.append("rect")
            .attr("x", x(a.Season))
            .attr("height", height)
            .attr("width", x(b.Season) - x(a.Season))
            .on("mouseover", function () {
                const seasonRange = `${a.Season}-${a.Season + 1}`;
                tooltip.style("visibility", "visible")
                    .text(`Season: ${seasonRange}, Save %: ${(a.SavePercentage)}%`);
                dot.attr("cx", x(a.Season))
                    .attr("cy", y(a.SavePercentage))
                    .style("visibility", "visible");
            })
            .on("mousemove", function (event) {
                tooltip.style("top", (event.pageY + 5) + "px")
                    .style("left", (event.pageX + 5) + "px");
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
                dot.style("visibility", "hidden");
            });
    });

    const lastPoint = cleanedData[cleanedData.length - 1];
    rects.append("rect")
        .attr("x", x(lastPoint.Season))
        .attr("height", height)
        .attr("width", 10)
        .on("mouseover", function () {
            const seasonRange = `${lastPoint.Season}-${lastPoint.Season + 1}`;
            tooltip.style("visibility", "visible")
                .text(`Season: ${seasonRange}, Save %: ${(lastPoint.SavePercentage).toFixed(3)}%`);
            dot.attr("cx", x(lastPoint.Season))
                .attr("cy", y(lastPoint.SavePercentage))
                .style("visibility", "visible");
        })
        .on("mousemove", function (event) {
            tooltip.style("top", (event.pageY + 5) + "px")
                .style("left", (event.pageX + 5) + "px");
        })
        .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
            dot.style("visibility", "hidden");
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

        // Tooltips
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background-color", "rgba(0, 0, 0, 0.7)")
            .style("color", "white")
            .style("padding", "5px")
            .style("border-radius", "4px");

        const dot = svg.append("circle")
            .attr("r", 5)
            .attr("fill", "black")
            .style("visibility", "hidden");

        const rects = svg.append("g")
            .attr("fill", "none")
            .attr("pointer-events", "all");

        d3.pairs(cleanedData, (a, b) => {
            rects.append("rect")
                .attr("x", x(a.Season))
                .attr("height", height)
                .attr("width", x(b.Season) - x(a.Season))
                .on("mouseover", function(event) {
                    const seasonRange = `${a.Season}-${a.Season + 1}`;

                    tooltip.style("visibility", "visible")
                        .text(`Season: ${seasonRange}, Save %: ${(a.SavePercentage * 100).toFixed(2)}%`);

                    dot.attr("cx", x(a.Season))
                        .attr("cy", y(a.SavePercentage))
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
    });
}


async function drawVis11() {

    const margin = {top: 20, right: 30, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#vis5-1")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Number of Teams"]) 
        .map(d => ({
            Season: d["Season"],
            Year: +d["Season"].split('-')[0],
            NumberofTeams: +d["Number of Teams"]
        }))
        .filter(d => d.Year >= 1979 && d.Year <= 2006)
        .sort((a, b) => a.Year - b.Year);

    console.log(cleanedData);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Year))
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
        .x(d => x(d.Year))
        .y(d => y(d.NumberofTeams));

    svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line);

    // Tooltips
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px");

    const dot = svg.append("circle")
        .attr("r", 5)
        .attr("fill", "black")
        .style("visibility", "hidden");

    const rects = svg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all");

    cleanedData.forEach(d => {
        rects.append("rect")
            .attr("x", x(d.Year))
            .attr("height", height)
            .attr("width", 5)
            .on("mouseover", function(event) {
                tooltip.style("visibility", "visible")
                    .text(`Season: ${d.Season}, Teams: ${d.NumberofTeams}`);

                dot.attr("cx", x(d.Year))
                    .attr("cy", y(d.NumberofTeams))
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