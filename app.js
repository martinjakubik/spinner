import { ClockTimerSpinner } from "./clockTimerSpinner.js";
import { SineWaveSpinner } from "./sineWaveSpinner.js";

const drawSpinner = function (oSpinnerController) {
    const oSpinner = document.getElementById('cssspinner');
    if (nNumberOfTicks < nTotalTicks) {
        const sShape = oSpinnerController.getShape(nNumberOfTicks, nTotalTicks, true);
        oSpinner.style.clipPath = sShape;
        nNumberOfTicks = nNumberOfTicks + 1;
    } else {
        const sShape = oSpinnerController.getShape(0, nTotalTicks, true);
        oSpinner.style.clipPath = sShape;
        clearInterval(nIntervalIdSpinner);
    }
}

const drawSvgSpinner = function (oSpinnerController) {
    const oSvgContent = document.getElementById('svgcontent');
    const oSvgSpinner = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    oSvgSpinner.id = 'svgspinner';
    oSvgContent.appendChild(oSvgSpinner);
    for (let nTicks = 0; nTicks <= nTotalTicks; nTicks++) {
        oSpinnerController.drawShapePath(nTicks, nTotalTicks, false);
    }
}

let nIntervalIdSpinner = -1;
const nTotalTicks = 60;
let nNumberOfTicks;

const main = function () {
    const oSpinnerController = new ClockTimerSpinner();
    drawSvgSpinner(oSpinnerController);
    const oButtonRestart = document.getElementById('restart');
    oButtonRestart.onclick = main;
    nNumberOfTicks = 0;
    clearInterval(nIntervalIdSpinner);
    nIntervalIdSpinner = setInterval(drawSpinner, 700, oSpinnerController);
    drawSpinner(oSpinnerController, true);
}

main();