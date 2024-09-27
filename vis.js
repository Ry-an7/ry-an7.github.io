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