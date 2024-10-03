document.getElementById("musicBar").addEventListener("click", displayMusic);

document.getElementById("videoBar").addEventListener("click", displayVideo);

document.getElementById("gameBar").addEventListener("click", displayGame);

document.getElementById("homeworkBar").addEventListener("click", displayHomework);


function displayMusic() {
    alert('4 hours and 30 minutes spent listening to music.');
}

function displayVideo() {
    alert('7 hours (and sometimes more) spent watching videos.');
}

function displayGame() {
    alert('5 hours spent playing games.');
}

function displayHomework() {
    alert('6 hours and 30 minutes spend doing homework.');
}

function randomColour() {
    var colour ='#' + (Math.random().toString(16) + "000000").substring(2,8);
    return colour;
}

// Get the SVG element
const svg = document.getElementById('leWittArt');
const triangle = document.getElementById("triangle");

svg.addEventListener("mousemove", (event) => {
const svgRect = svg.getBoundingClientRect();
const mouseX = event.clientX - svgRect.left;
const mouseY = event.clientY - svgRect.top;

// Adjust the X and Y value of the top point (triangle's tip) based on mouse position
const newPoints = `250,200 ${mouseX},${mouseY} 250,225`;

triangle.setAttribute("points", newPoints);
});

// Assignment 3 Visulizations

//Question 1
async function renderBar() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
        vl.x().fieldN("platform").title("Platform"),
        vl.y().fieldQ("global_sales").aggregate("sum").title("Global Sales (in millions of units)"),
        vl.color().fieldN("genre").title("Genre").scale({scheme : "category20"}) 
    )

    .width(700)
    .height(600)
    .toSpec();

    vegaEmbed("#viewQ1", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 2 Genre
async function renderLineG() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markLine()
    .data(data)
    .encode(
        vl.x().fieldN("year").title(null),
        vl.y().fieldQ("global_sales").aggregate("sum").title("Global Sales (in millions of units)"),
        vl.color().fieldN("genre").title("Genre").scale({scheme : "category20"})
)
    .width(1000)
    .height(600)
    .toSpec();

    vegaEmbed("#viewQ2G", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 2 Platform
async function renderLineP() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markLine()
    .data(data)
    .encode(
        vl.x().fieldN("year").title(null),
        vl.y().fieldQ("global_sales").aggregate("sum").title("Global Sales (in millions of units)"),
        vl.color().fieldN("platform").title("Platform").scale({ range: [
            "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
            "#8c564b", "#e377c2", "#bcbd22", "#17becf", "#393b79",
            "#637939", "#e6550d", "#fdae6b", "#d6616b", "#756bb1",
            "#9c9ede", "#e7ba52", "#843c39", "#7b4173", "#1f78b4",
            "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#cab2d6",
            "#6a3d9a", "#b15928", "#ff9896", "#5c4d7d", "#a55194"
        ]}) 
)
    .width(1000)
    .height(600)
    .toSpec();

    vegaEmbed("#viewQ2P", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 3
async function renderBarRS() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markBar().width({step: 6.5})
    .data(data)
    .encode(
        vl.x().fieldN("platform").title("Platform"),
        vl.y().fieldQ("sales_amount").aggregate("sum").title("Sales Amount (in millions of units)"),
        vl.xOffset().field("sales_region"),
        vl.color().field("sales_region").title("Region")
)
    .height(500)
    .toSpec();

    vegaEmbed("#viewQ3", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 4
// async function renderBarRS() {
//     const data = await d3.csv("./datasets/videogames_long.csv");

//     const vlSpec = vl
//     .markLine()
//     .data(data)
//     .encode(
        
// )
//     .height(500)
//     .toSpec();

//     vegaEmbed("#viewQ4", vlSpec).then((result) => {
//         const view = result.view;
//         view.run();
//     });
// }

renderBar();
renderLineG();
renderLineP();
renderBarRS();

//used https://stackoverflow.com/questions/48343436/how-to-convert-svg-element-coordinates-to-screen-coordinates to help learn to do this javascript part

// svg.addEventListener("click", function(event) {
//     const point = svg.createSVGPoint();
//     point.x = event.clientX;
//     point.y = event.clientY;
    
//     // Transform the coordinates to SVG space
//     const svgCoords = point.matrixTransform(svg.getScreenCTM().inverse());
    
//     // Create a new circle at the click position
//     const newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     newCircle.setAttribute("cx", svgCoords.x);
//     newCircle.setAttribute("cy", svgCoords.y);
//     newCircle.setAttribute("r", 20);
//     newCircle.setAttribute("fill", randomColour());
    
    
//     svg.appendChild(newCircle);
// });