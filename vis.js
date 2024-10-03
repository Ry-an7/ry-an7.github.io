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
        vl.x().fieldN("platform")
            .title("Platform"),
        vl.y().fieldQ("global_sales").aggregate("sum")
            .title("Global Sales"),
        vl.color().fieldN("genre")
            .title("Genre")
            .scale({scheme : "category20"}) 
    )

    .width(700)
    .height(600)
    .toSpec();

    vegaEmbed("#viewQ1", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

//Question 2
async function renderLine() {
    const data = await d3.csv("./datasets/videogames_long.csv");

    const vlSpec = vl
    .markLine()
    .data(data)
    .encode(
        vl.x().fieldN("year")
            .title(null),
        vl.y().fieldQ("global_sales").aggregate("sum")
            .title("Global Sales"),
        vl.color().fieldN("platform")
            .scale({scheme: "viridis"}),
        vl.facet(vl.fieldN("genre"), {columns: 3})
    )

    .width(550)
    .height(550)
    .resolve({ axis: {x: {scale : "independent"}, y: {scale : "independent"}}})
    .toSpec();

    vegaEmbed("#viewQ2", vlSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

renderBar();
renderLine();

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