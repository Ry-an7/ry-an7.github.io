import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log(d3);

async function drawVis() {

    const dataset = await d3.csv("./datasets/LeagueTotals.csv", d3.autoType);
    console.log(dataset);

    const width = 800;
    const height = 500;

    const margin = {top: 20, right: 30, bottom: 50, left: 60};




        const svg = d3
            .select(".image")
            .select("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black");

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

            x.domain(d3.extent(dataset, d => d.Season));
            y.domain(d3.extent(dataset, d => d.AverageGoalsPerGame));

            svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))



        }

        drawVis();