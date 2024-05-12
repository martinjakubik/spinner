import { ClockTimerSpinner } from "./clockTimerSpinner.js";
import { SineWaveSpinner } from "./sineWaveSpinner.js";
import { DotClockSpinner } from "./dotClockSpinner.js";

const aShapes = [ClockTimerSpinner, SineWaveSpinner, DotClockSpinner];

const isValidShape = function (sRequestedShape) {
    let bIsValidShape = false;
    aShapes.forEach(oShape => {
        if (oShape.sName === sRequestedShape) {
            bIsValidShape = true;
        }
    });
    return bIsValidShape;
}

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

const clearSvgSpinner = function (oSpinnerController) {
    oSpinnerController.clearShapePath(false);
}

const drawSvgSpinnerPolygon = function (oSpinnerController) {
    const oSvgContent = document.getElementById('svgcontent');
    const oSvgSpinner = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    oSvgSpinner.id = 'svgspinner';
    oSvgContent.appendChild(oSvgSpinner);
    for (let nTicks = 0; nTicks <= nTotalTicks; nTicks++) {
        oSpinnerController.drawShapePath(nTicks, nTotalTicks, false);
    }
}

const drawSvgSpinnerPath = function (oSpinnerController) {
    const oSvgContent = document.getElementById('svgcontent');
    const oSvgSpinner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    oSvgSpinner.id = 'svgspinner';
    oSvgContent.appendChild(oSvgSpinner);
    for (let nTicks = 0; nTicks <= nTotalTicks; nTicks++) {
        const sPathD = oSpinnerController.drawShapePath(nTicks, nTotalTicks, false);
        if (sPathD && sPathD.length > 5) {
            oSvgSpinner.setAttribute('d', sPathD);
        }
    }
}

const drawSvgSpinner = function (oSpinnerController) {
    if (oSpinnerController.constructor.svgShapeType && oSpinnerController.constructor.svgShapeType === 'path') {
        drawSvgSpinnerPath(oSpinnerController);
    } else {
        drawSvgSpinnerPolygon(oSpinnerController);
    }
}

let nIntervalIdSpinner = -1;
const nTotalTicks = 60;
let nNumberOfTicks;

const handleRestartClick = function () {
    const oShapeSelect = document.getElementById('shapeSelect');
    const sSelectedShape = oShapeSelect.value;
    restart(sSelectedShape);
}

const handleShapeSelectChange = function (oEvent) {
    const oTarget = oEvent ? oEvent.target : null;
    const sSelectedShape = oTarget ? oTarget.value : null;
    let sCurrentShape = isValidShape(sSelectedShape) ? sSelectedShape : null;
    let oSearchParams = new URL(document.location).searchParams;
    if (sCurrentShape) {
        oSearchParams.set('shape', sCurrentShape);
        document.location.search = oSearchParams.toString();
    }
    restart(sCurrentShape);
}

const createShapeSelect = function (sCurrentShape) {
    const oShapeSelect = document.getElementById('shapeSelect');
    const nShapeCount = aShapes.length;
    for (let i = 0; i < nShapeCount; i++) {
        const oShapeSelectOption = document.createElement('option');
        oShapeSelectOption.id = aShapes[i].sName;
        oShapeSelectOption.value = aShapes[i].sName;
        oShapeSelectOption.innerText = aShapes[i].sName;
        oShapeSelect.appendChild(oShapeSelectOption);
    }
    if (sCurrentShape) {
        oShapeSelect.value = sCurrentShape;
    }
    oShapeSelect.addEventListener('change', handleShapeSelectChange)
}

const restart = function (sSelectedShape = 'ClockTimer') {
    nNumberOfTicks = 0;
    let oSpinnerController;
    switch (sSelectedShape) {
        case 'ClockTimer':
            oSpinnerController = new ClockTimerSpinner();
            break;
        case 'SineWave':
            oSpinnerController = new SineWaveSpinner();
            break;
        case 'DotClock':
            oSpinnerController = new DotClockSpinner();
            break;
        default:
            oSpinnerController = new ClockTimerSpinner();
            break;
    }
    clearSvgSpinner(oSpinnerController);
    drawSvgSpinner(oSpinnerController);
    clearInterval(nIntervalIdSpinner);
    nIntervalIdSpinner = setInterval(drawSpinner, 700, oSpinnerController);
    drawSpinner(oSpinnerController, true);
}

const main = function () {
    let oSearchParams = new URL(document.location).searchParams;
    let sShapeParam = oSearchParams.get('shape');
    let sCurrentShape = isValidShape(sShapeParam) ? sShapeParam : null;
    createShapeSelect(sCurrentShape);
    const oButtonRestart = document.getElementById('restart');
    oButtonRestart.onclick = handleRestartClick;
    restart(sCurrentShape);
}

main();