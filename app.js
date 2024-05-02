import { ClockTimerSpinner } from "./clockTimerSpinner.js";
import { SineWaveSpinner } from "./sineWaveSpinner.js";

const aShapes = [ClockTimerSpinner, SineWaveSpinner];

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

const handleShapeSelectChange = function (oEvent) {
    restart();
}

const createShapeSelect = function () {
    const oShapeSelect = document.getElementById('shapeSelect');
    const nShapeCount = aShapes.length;
    for (let i = 0; i < nShapeCount; i++) {
        const oShapeSelectOption = document.createElement('option');
        oShapeSelectOption.id = aShapes[i].sName;
        oShapeSelectOption.value = aShapes[i].sName;
        oShapeSelectOption.innerText = aShapes[i].sName;
        oShapeSelect.appendChild(oShapeSelectOption);
    }
    oShapeSelect.addEventListener('change', handleShapeSelectChange)
}

const restart = function () {
    nNumberOfTicks = 0;
    const oSpinnerController = new ClockTimerSpinner();
    drawSvgSpinner(oSpinnerController);
    clearInterval(nIntervalIdSpinner);
    nIntervalIdSpinner = setInterval(drawSpinner, 700, oSpinnerController);
    drawSpinner(oSpinnerController, true);
}

const main = function () {
    createShapeSelect();
    const oButtonRestart = document.getElementById('restart');
    oButtonRestart.onclick = restart;
    restart();
}

main();