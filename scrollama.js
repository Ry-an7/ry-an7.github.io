import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('.chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');

var scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {
    var stepHeight = Math.floor(window.innerHeight * 0.9); // was * .75
			step.style('height', stepHeight + 'px');
			// 2. update width/height of graphic element
			var bodyWidth = d3.select('body').node().offsetWidth;
			graphic
				.style('width', bodyWidth + 'px')
				.style('height', window.innerHeight + 'px');
			var chartMargin = bodyWidth > 350 ? 32 : 10;
			var textWidth = text.node().offsetWidth;
			var chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;
			console.log('chartwidth:', chartWidth)
			chart
				.style('width', chartWidth + 'px')
				.style('height', Math.floor(window.innerHeight / 1.2) + 'px');
			// 3. tell scrollama to update new element dimensions
			scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
// response = { element, direction, index }

	// fade in current step
	step.classed('is-active', function (d, i) {
		return i === response.index;
	})

	// console.log('response index:' + response.index)

	if (response.index == 0 & response.direction == 'down') {
		console.log('0 down')
		drawVis2()
	} else if (response.index == 0 & response.direction == 'up') {
		console.log('0 up')
		drawVis1()
	}else if (response.index == 1 & response.direction == 'down') {
		console.log('1 down')
		drawVis3()
	} else if (response.index == 1 & response.direction == 'up') {
		console.log('1 up')
		drawVis2()
	} else if (response.index == 2 & response.direction == 'up') {
		console.log('2 up')
		transitionTwoUp()
   } else if (response.index == 2 & response.direction == 'down') {
		   console.log('2 down')
		transitionTwoDown()
   } else if (response.index == 3 & response.direction == 'up'){
		   console.log('3 up')
		   transitionThreeUp()
		   moveNodes()
   } else if (response.index == 3 & response.direction == 'down'){
		   console.log('3 down')
		   transitionThreeDown()
   } else if (response.index == 4 & response.direction == 'up'){
		   console.log('4 up')
		   transitionFourUp()
   } else if (response.index == 4 & response.direction == 'down'){
		   console.log('4 down')
		   transitionFourDown()
   } else if (response.index == 5 & response.direction == 'up'){
		   console.log('5 up')
		   transitionFiveUp()
   } else if (response.index == 5 & response.direction == 'down'){
		   console.log('5 down')
		   transitionFiveDown()
   } else if (response.index == 6 & response.direction == 'up'){
		   console.log('6 up')
		   transitionSixUp()
   } else if (response.index == 6 & response.direction == 'down'){
		   console.log('6 down')
		   transitionSixDown()
   } else if (response.index == 7 & response.direction == 'up'){
		   console.log('7 up')
		   transitionSevenUp()
   } else if (response.index == 7 & response.direction == 'down'){
		   console.log('7 down')
		   transitionSevenDown()
   } else if (response.index == 8 & response.direction == 'up'){
		   console.log('8 up')
		   transitionEightUp()
   } else if (response.index == 8 & response.direction == 'down'){
		   console.log('8 down')
		   transitionEightDown()
   } else {
	   console.log('else case, response index: ', response.index)
   }
 } 
	


function handleContainerEnter(response) {
	// response = { direction }

	// sticky the graphic
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

// kick-off code to run once on load
function init() {
    handleResize();
    scroller
		.setup({
			container: '#scroll', // our outermost scrollytelling element
			graphic: '.scroll__graphic', // the graphic
			text: '.scroll__text', // the step container
			step: '.scroll__text .step', // the step elements
			offset: 0.5, // set the trigger to be 1/2 way down screen
			debug: true, // display the trigger offset for testing
		})
		.onStepEnter(handleStepEnter)
		.onContainerEnter(handleContainerEnter)
		.onContainerExit(handleContainerExit);

	// setup resize event
	window.addEventListener('resize', handleResize);
}

// start it up
init();