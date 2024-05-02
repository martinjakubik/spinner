import { ClockTimerSpinner } from "./clockTimerSpinner.js";

const drawSpinner = function (eShape = ClockTimerSpinner.SHAPES.CLOCK_TIMER) {
    const oSpinner = document.getElementById('cssspinner');
    if (nNumberOfTicks < nTotalTicks) {
        const sShape = ClockTimerSpinner.getShape(eShape, nNumberOfTicks, nTotalTicks, true);
        oSpinner.style.clipPath = sShape;
        nNumberOfTicks = nNumberOfTicks + 1;
    } else {
        const sShape = ClockTimerSpinner.getShape(eShape, 0, nTotalTicks, true);
        oSpinner.style.clipPath = sShape;
        clearInterval(nIntervalIdSpinner);
    }
}

const drawSvgSpinner = function (eShape = ClockTimerSpinner.SHAPES.CLOCK_TIMER) {
    const oSvgContent = document.getElementById('svgcontent');
    const oSvgSpinner = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    oSvgSpinner.id = 'svgspinner';
    oSvgContent.appendChild(oSvgSpinner);
    for (let nTicks = 0; nTicks <= nTotalTicks; nTicks++) {
        ClockTimerSpinner.drawShapePath(eShape, nTicks, nTotalTicks, false);
    }
}

let nIntervalIdSpinner = -1;
const nTotalTicks = 60;
let nNumberOfTicks;

const main = function () {
    drawSvgSpinner(ClockTimerSpinner.SHAPES.CLOCK_TIMER);
    const oButtonRestart = document.getElementById('restart');
    oButtonRestart.onclick = main;
    nNumberOfTicks = 0;
    clearInterval(nIntervalIdSpinner);
    nIntervalIdSpinner = setInterval(drawSpinner, 700, ClockTimerSpinner.SHAPES.CLOCK_TIMER);
    drawSpinner(ClockTimerSpinner.SHAPES.CLOCK_TIMER, true);
}

main();