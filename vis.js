import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log(d3);

async function drawVis1() {
    const margin = { top: 50, right: 30, bottom: 50, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#vis1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Average Goals Per Game");

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Average Goals Per Game"])
        .map(d => ({
            Season: +d["Season"].split('-')[0],
            FullSeason: d["Season"],
            AverageGoalsPerGame: +d["Average Goals Per Game"]
        }))
        .sort((a, b) => a.Season - b.Season);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Season))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([1.2, d3.max(cleanedData, d => d.AverageGoalsPerGame)])
        .range([height, 0]);

    const xAxisGroup = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Year");

    const yAxisGroup = svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    yAxisGroup.append("text")
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

    const linePath = svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Tooltips
    const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("background-color", "rgba(0, 0, 0, 0.7)")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("border-radius", "4px")
    .style("box-shadow", "0px 0px 5px #aaa")
    .style("visibility", "hidden")
    .style("font-size", "16px")
    .style("color", "white")

    const circles = svg.selectAll(".dot")
        .data(cleanedData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Season))
        .attr("cy", d => y(d.AverageGoalsPerGame))
        .attr("r", 4)
        .attr("fill", "#386890")
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("r", 5)
                .attr("fill", "orange");
            tooltip
                .style("visibility", "visible")
                .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Goals per Game:</strong> ${d.AverageGoalsPerGame.toFixed(2)}`);
        })
        .on("mousemove", function (event) {
            tooltip
                .style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("r", 4)
                .attr("fill", "#386890");
            tooltip.style("visibility", "hidden");
        });

    // Average line
    let avgGoals = d3.mean(cleanedData, d => d.AverageGoalsPerGame);
    const avgLine = svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(avgGoals))
        .attr("x2", width)
        .attr("y2", y(avgGoals))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 4");

    const avgText = svg.append("text")
        .attr("x", 3)
        .attr("y", y(avgGoals) - 5)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("text-anchor", "start")
        .text(`Avg: ${avgGoals.toFixed(2)} Goals/Game`);

    // Button interaction
    d3.selectAll('input[name="season-vis1"]').on("change", function () {
        const value = this.value;
        let filteredData;
        let xDomain;
        let yDomain;

        if (value === "all") {
            filteredData = cleanedData;
            xDomain = d3.extent(cleanedData, d => d.Season);
            yDomain = [1.2, d3.max(cleanedData, d => d.AverageGoalsPerGame)];
        } else if (value === "high") {
            filteredData = cleanedData.filter(d => d.Season >= 1990 && d.Season <= 2023);
            xDomain = [1990, 2023];
            yDomain = [2.5, 3.7];
        } else if (value === "low") {
            filteredData = cleanedData.filter(d => d.Season >= 1997 && d.Season <= 2005);
            xDomain = [1997, 2005];
            yDomain = [2.5, 3.2];
        }

        x.domain(xDomain);
        y.domain(yDomain);

        linePath
            .datum(filteredData)
            .transition()
            .duration(1000)
            .attr("d", line);

        xAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        yAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        svg.selectAll(".dot")
            .data(filteredData)
            .join("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.Season))
            .attr("cy", d => y(d.AverageGoalsPerGame))
            .attr("r", 4)
            .attr("fill", d => {
                if (value === "high" && d.Season >= 1992 && d.Season <= 1999) {
                    return "#DC143C";
                }
                return "#386890";
            })
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("r", 5)
                    .attr("fill", "orange");
                tooltip
                    .style("visibility", "visible")
                    .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Goals per Game:</strong> ${d.AverageGoalsPerGame.toFixed(2)}`);
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("r", 4)
                    .attr("fill", d => {
                        if (value === "high" && d.Season >= 1992 && d.Season <= 1999) {
                            return "#DC143C";
                        }
                        return "#386890";
                    })
                tooltip.style("visibility", "hidden");
            });

        avgGoals = d3.mean(filteredData, d => d.AverageGoalsPerGame);
        avgLine
            .transition()
            .duration(1000)
            .attr("y1", y(avgGoals))
            .attr("y2", y(avgGoals));

        avgText
            .transition()
            .duration(1000)
            .attr("y", y(avgGoals) - 5)
            .text(`Avg: ${avgGoals.toFixed(2)} Goals/Game`);
    });
}

async function drawVis2() { 
    const margin = { top: 50, right: 30, bottom: 50, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#vis2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Goals Scored Per Season");

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Season Goals"])
        .map(d => ({
            Season: +d["Season"].split('-')[0],
            FullSeason: d["Season"],
            SeasonGoals: +d["Season Goals"]
        }))
        .sort((a, b) => a.Season - b.Season);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Season))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(cleanedData, d => d.SeasonGoals)])
        .range([height, 0]);

    const xAxisGroup = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Year");

    const yAxisGroup = svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    yAxisGroup.append("text")
        .attr("x", -height / 2)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Goals Per Season");

    const line = d3.line()
        .x(d => x(d.Season))
        .y(d => y(d.SeasonGoals));

    const linePath = svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Tooltips
    const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("box-shadow", "0px 0px 5px #aaa")
        .style("visibility", "hidden")
        .style("font-size", "16px")
        .style("color", "white")

    const circles = svg.selectAll(".dot")
        .data(cleanedData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Season))
        .attr("cy", d => y(d.SeasonGoals))
        .attr("r", 4)
        .attr("fill", d => (d.Season >= 1966 && d.Season <= 1982 ? "#228B22" : "#386890"))
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("r", 5)
                .attr("fill", "orange");
            tooltip
                .style("visibility", "visible")
                .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Total Goals:</strong> ${d.SeasonGoals}`);
        })
        .on("mousemove", function (event) {
            tooltip
                .style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("r", 4)
                .attr("fill", d => (d.Season >= 1966 && d.Season <= 1982 ? "#228B22" : "#386890"))
            tooltip.style("visibility", "hidden");
        });

    // Average line
    let avgGoals = d3.mean(cleanedData, d => d.SeasonGoals);
    const avgLine = svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(avgGoals))
        .attr("x2", width)
        .attr("y2", y(avgGoals))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 4");

    const avgText = svg.append("text")
        .attr("x", 3)
        .attr("y", y(avgGoals) - 5)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("text-anchor", "start")
        .text(`Avg: ${avgGoals.toFixed(2)} Goals/Season`);

    // Button interaction
    d3.selectAll('input[name="season-vis2"]').on("change", function () {
        const value = this.value;
        let filteredData;
        let xDomain;
        let yDomain;

        if (value === "all") {
            filteredData = cleanedData;
            xDomain = d3.extent(cleanedData, d => d.Season);
            yDomain = [1.2, d3.max(cleanedData, d => d.SeasonGoals)];
        } else if (value === "high") {
            filteredData = cleanedData.filter(d => d.Season >= 1990 && d.Season <= 2023);
            xDomain = [1990, 2023];
            yDomain = [3500, 8300];
        } else if (value === "low") {
            filteredData = cleanedData.filter(d => d.Season >= 1997 && d.Season <= 2005);
            xDomain = [1997, 2005];
            yDomain = [5000, 7600];
        }

        x.domain(xDomain);
        y.domain(yDomain);

        linePath
            .datum(filteredData)
            .transition()
            .duration(1000)
            .attr("d", line);

        xAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        yAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        svg.selectAll(".dot")
            .data(filteredData)
            .join("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.Season))
            .attr("cy", d => y(d.SeasonGoals))
            .attr("r", 4)
            .attr("fill", d => (d.Season >= 1966 && d.Season <= 1982 ? "#228B22" : "#386890"))
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("r", 5)
                    .attr("fill", "orange");
                tooltip
                    .style("visibility", "visible")
                    .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Total Goals:</strong> ${d.SeasonGoals.toFixed(2)}`);
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("r", 4)
                    .attr("fill", d => (d.Season >= 1966 && d.Season <= 1982 ? "#228B22" : "#386890"))
                tooltip.style("visibility", "hidden");
            });

        avgGoals = d3.mean(filteredData, d => d.SeasonGoals);
        avgLine
            .transition()
            .duration(1000)
            .attr("y1", y(avgGoals))
            .attr("y2", y(avgGoals));

        avgText
            .transition()
            .duration(1000)
            .attr("y", y(avgGoals) - 5)
            .text(`Avg: ${avgGoals.toFixed(2)} Goals/Season`);
    });
}

async function drawVis3() { 
    const margin = { top: 50, right: 30, bottom: 50, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#vis3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Shooting Percentage");

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Shooting Percentage"])
        .map(d => ({
            Season: +d["Season"].split('-')[0],
            FullSeason: d["Season"],
            ShootingPercentage: +d["Shooting Percentage"]
        }))
        .filter(d => d.Season >= 1959)
        .sort((a, b) => a.Season - b.Season);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Season))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([8, d3.max(cleanedData, d => d.ShootingPercentage)])
        .range([height, 0]);

    const xAxisGroup = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Year");

    const yAxisGroup = svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    yAxisGroup.append("text")
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

    const linePath = svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Tooltips
    const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("box-shadow", "0px 0px 5px #aaa")
        .style("visibility", "hidden")
        .style("font-size", "16px")
        .style("color", "white")

    const circles = svg.selectAll(".dot")
        .data(cleanedData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Season))
        .attr("cy", d => y(d.ShootingPercentage))
        .attr("r", 4)
        .attr("fill", d => {
            if (d.Season >= 1969 && d.Season <= 1981) return "#228B22"; //green
            if (d.Season >= 1986 && d.Season <= 2000) return "#DC143C"; //red
            return "#386890";                                           //blue
        })
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("r", 5)
                .attr("fill", "orange");
            tooltip
                .style("visibility", "visible")
                .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Shooting Percentage:</strong> ${d.ShootingPercentage}%`);
        })
        .on("mousemove", function (event) {
            tooltip
                .style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("r", 4)
                .attr("fill", d => {
                    if (d.Season >= 1969 && d.Season <= 1981) return "#228B22";
                    if (d.Season >= 1986 && d.Season <= 2000) return "#DC143C";
                    return "#386890";                                          
                })
            tooltip.style("visibility", "hidden");
        });

    // Average line
    let avgGoals = d3.mean(cleanedData, d => d.ShootingPercentage);
    const avgLine = svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(avgGoals))
        .attr("x2", width)
        .attr("y2", y(avgGoals))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 4");

    const avgText = svg.append("text")
        .attr("x", 3)
        .attr("y", y(avgGoals) - 5)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("text-anchor", "start")
        .text(`Average: ${avgGoals.toFixed(2)}%`);

    // Button interaction
    d3.selectAll('input[name="season-vis3"]').on("change", function () {
        const value = this.value;
        let filteredData;
        let xDomain;
        let yDomain;

        if (value === "all") {
            filteredData = cleanedData.filter(d => d.Season >= 1959 && d.Season <= 2025);
            xDomain = [1959, 2025];
            yDomain = [8, d3.max(filteredData, d => d.ShootingPercentage)];
        } else if (value === "low") {
            filteredData = cleanedData.filter(d => d.Season >= 1990 && d.Season <= 2025);
            xDomain = [1990, 2025];
            yDomain = [8, 12.5];
        }

        x.domain(xDomain);
        y.domain(yDomain);

        linePath
            .datum(filteredData)
            .transition()
            .duration(1000)
            .attr("d", line);

        xAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        yAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        svg.selectAll(".dot")
            .data(filteredData)
            .join("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.Season))
            .attr("cy", d => y(d.ShootingPercentage))
            .attr("r", 4)
            .attr("fill", d => {
                if (d.Season >= 1969 && d.Season <= 1981) return "#228B22";
                if (d.Season >= 1986 && d.Season <= 2000) return "#DC143C";
                return "#386890";                                           
            })
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("r", 5)
                    .attr("fill", "orange");
                tooltip
                    .style("visibility", "visible")
                    .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Shooting Percentage:</strong> ${d.ShootingPercentage.toFixed(2)}%`);
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("r", 4)
                    .attr("fill", d => {
                        if (d.Season >= 1969 && d.Season <= 1981) return "#228B22";
                        if (d.Season >= 1986 && d.Season <= 2000) return "#DC143C";
                        return "#386890";                                           
                    })
                tooltip.style("visibility", "hidden");
            });

        avgGoals = d3.mean(filteredData, d => d.ShootingPercentage);
        avgLine
            .transition()
            .duration(1000)
            .attr("y1", y(avgGoals))
            .attr("y2", y(avgGoals));

        avgText
            .transition()
            .duration(1000)
            .attr("y", y(avgGoals) - 5)
            .text(`Average: ${avgGoals.toFixed(2)}%`);
    });
}

async function drawVis4() { 
    const margin = { top: 50, right: 30, bottom: 50, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#vis4")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Save Percentage");

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Save Percentage"])
        .map(d => ({
            Season: +d["Season"].split('-')[0],
            FullSeason: d["Season"],
            SavePercentage: +d["Save Percentage"]
        }))
        .filter(d => d.Season >= 1959)
        .sort((a, b) => a.Season - b.Season);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Season))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0.865, d3.max(cleanedData, d => d.SavePercentage)])
        .range([height, 0]);

    const xAxisGroup = svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Year");

    const yAxisGroup = svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    yAxisGroup.append("text")
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

    const linePath = svg.append("path")
        .datum(cleanedData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Tooltips
    const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("box-shadow", "0px 0px 5px #aaa")
        .style("visibility", "hidden")
        .style("font-size", "16px")
        .style("color", "white")

    const circles = svg.selectAll(".dot")
        .data(cleanedData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Season))
        .attr("cy", d => y(d.SavePercentage))
        .attr("r", 4)
        .attr("fill", d => (d.Season >= 1969 && d.Season <= 1981 ? "#DC143C" : "#386890"))
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("r", 5)
                .attr("fill", "orange");
            tooltip
                .style("visibility", "visible")
                .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Save Percentage:</strong> ${d.SavePercentage}%`);
        })
        .on("mousemove", function (event) {
            tooltip
                .style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("r", 4)
                .attr("fill", d => (d.Season >= 1969 && d.Season <= 1981 ? "#DC143C" : "#386890"))
            tooltip.style("visibility", "hidden");
        });

    // Average line
    let avgGoals = d3.mean(cleanedData, d => d.SavePercentage);
    const avgLine = svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(avgGoals))
        .attr("x2", width)
        .attr("y2", y(avgGoals))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 4");

    const avgText = svg.append("text")
        .attr("x", 3)
        .attr("y", y(avgGoals) - 5)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("text-anchor", "start")
        .text(`Average: ${avgGoals.toFixed(3)}%`);

    // Button interaction
    d3.selectAll('input[name="season-vis4"]').on("change", function () {
        const value = this.value;
        let filteredData;
        let xDomain;
        let yDomain;

        if (value === "all") {
            filteredData = cleanedData.filter(d => d.Season >= 1959 && d.Season <= 2025);
            xDomain = [1959, 2025];
            yDomain = [0.865, d3.max(filteredData, d => d.SavePercentage)];
        } else if (value === "low") {
            filteredData = cleanedData.filter(d => d.Season >= 1995 && d.Season <= 2006);
            xDomain = [1995, 2006];
            yDomain = [0.895, d3.max(filteredData, d => d.SavePercentage)];
        }

        x.domain(xDomain);
        y.domain(yDomain);

        linePath
            .datum(filteredData)
            .transition()
            .duration(1000)
            .attr("d", line);

        xAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        yAxisGroup
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        svg.selectAll(".dot")
            .data(filteredData)
            .join("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.Season))
            .attr("cy", d => y(d.SavePercentage))
            .attr("r", 4)
            .attr("fill", d => (d.Season >= 1969 && d.Season <= 1981 ? "#DC143C" : "#386890"))
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("r", 5)
                    .attr("fill", "orange");
                tooltip
                    .style("visibility", "visible")
                    .html(`<strong>Season:</strong> ${d.FullSeason}<br><strong>Save Percentage:</strong> ${d.SavePercentage.toFixed(3)}%`);
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("r", 4)
                    .attr("fill", d => (d.Season >= 1969 && d.Season <= 1981 ? "#DC143C" : "#386890"))
                tooltip.style("visibility", "hidden");
            });

        avgGoals = d3.mean(filteredData, d => d.SavePercentage);
        avgLine
            .transition()
            .duration(1000)
            .attr("y1", y(avgGoals))
            .attr("y2", y(avgGoals));

        avgText
            .transition()
            .duration(1000)
            .attr("y", y(avgGoals) - 5)
            .text(`Average: ${avgGoals.toFixed(3)}%`);
    });
}

async function drawVis5() {

    const margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#vis5")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

svg.append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Total Number of Teams from 1979-2006");

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
        .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(d3.max(cleanedData, d => d.Year) - d3.min(cleanedData, d => d.Year)))
        .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Year");

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

    svg.selectAll(".dot")
        .data(cleanedData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Year))
        .attr("cy", d => y(d.NumberofTeams))
        .attr("r", 4)
        .attr("fill", "#386890")
        .on("mouseover", function (event, d) {
            d3.select(this)
                .transition().duration(100)
                .attr("r", 5)
                .attr("fill", "orange");

            tooltip.style("visibility", "visible")
                .html(`<strong>Season:</strong> ${d.Season}<br><strong>Teams:</strong> ${d.NumberofTeams}`);
        })
        .on("mousemove", function (event) {
            tooltip.style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition().duration(100)
                .attr("r", 4)
                .attr("fill", "#386890");

            tooltip.style("visibility", "hidden");
        });
}

async function drawVis6() {
    const margin = {top: 50, right: 30, bottom: 50, left: 60},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#vis6")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Powerplay Opportunities from the 1990-2005 Seasons");

    const data = await d3.csv("datasets/LeagueTotals.csv");

    const cleanedData = data
        .filter(d => d["Season"] && d["Power Play Opportunities"])
        .map(d => ({
            Season: d["Season"],
            Year: +d["Season"].split('-')[0],
            PowerPlayOpportunities: +d["Power Play Opportunities"]
        }))
        .filter(d => d.Year >= 1990 && d.Year <= 2023)
        .sort((a, b) => a.Year - b.Year);

    console.log(cleanedData);

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanedData, d => d.Year))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([4500, d3.max(cleanedData, d => d.PowerPlayOpportunities)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(cleanedData.length))
        .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("x", -height / 2)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .attr("fill", "black")
        .style("font-size", "14px")
        .style("text-anchor", "middle")
        .text("Powerplay Opportunities");

    const line = d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.PowerPlayOpportunities));

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

    svg.selectAll(".dot")
        .data(cleanedData)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Year))
        .attr("cy", d => y(d.PowerPlayOpportunities))
        .attr("r", 4)
        .attr("fill", d => {
            if ([1994, 2012, 2019, 2020].includes(d.Year)) {
                return "#DC143C";
            }
            else if (d3.range(1997, 2006).includes(d.Year)) {
                return "#800020";
            }
            return "#386890";
        })
        .on("mouseover", function (event, d) {
            d3.select(this)
                .transition().duration(100)
                .attr("r", 5)
                .attr("fill", "orange");

            tooltip.style("visibility", "visible")
                .html(`<strong>Season:</strong> ${d.Season}<br><strong>Powerplay Opportunities:</strong> ${d.PowerPlayOpportunities}`);
        })
        .on("mousemove", function (event) {
            tooltip.style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
                .transition().duration(100)
                .attr("r", 4)
                .attr("fill", d => {
                    if ([1994, 2012, 2019, 2020].includes(d.Year)) return "#DC143C";
                    if (d3.range(1997, 2006).includes(d.Year)) return "#800020";
                    return "#386890";
                });

            tooltip.style("visibility", "hidden");
        });
}


drawVis1();
drawVis2();
drawVis3();
drawVis4();
drawVis5();
drawVis6();