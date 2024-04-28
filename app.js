const SHAPES = {
    CLOCK_TIMER: 0,
    DOT_SPINNER: 1
}

const getFormattedPointForClockTimer = function (aPoint, index, nNumberOfPoints) {
    const nScale = 40;
    const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
    const nCosine = Math.cos(nIncrement);
    const nSine = Math.sin(nIncrement);
    return Math.floor(aPoint[0] + nCosine * nScale) + 'px ' + Math.floor(aPoint[1] + nSine * nScale) + 'px';
}

const getFormattedPointForDotSpinner = function (aPoint, index, nNumberOfPoints) {
    const nScale = 40;
    const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
    const nCosine = Math.cos(nIncrement);
    const nSine = Math.sin(nIncrement);
    return Math.floor(aPoint[0] + nCosine * nScale) + 'px ' + Math.floor(aPoint[1] + nSine * nScale) + 'px';
}

const getFormattedPoint = function (eShape = SHAPES.CLOCK_TIMER, aPoint, index, nNumberOfPoints) {
    switch (eShape) {
        case SHAPES.CLOCK_TIMER:
            return getFormattedPointForClockTimer(aPoint, index, nNumberOfPoints)
        default:
            return getFormattedPointForClockTimer(aPoint, index, nNumberOfPoints)
    }
}

const getShape = function (eShape = SHAPES.CLOCK_TIMER, nTicks) {
    const nNumberOfPoints = 30;
    const aStartPoint = [80, 80];
    let aFormattedPoints = [];
    const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
    aFormattedPoints.push(getFormattedPoint(eShape, aStartPoint, 0, nNumberOfPoints));
    aFormattedPoints.push(Math.floor(aStartPoint[0]) + 'px ' + Math.floor(aStartPoint[1]) + 'px');
    if (nTicks > 0) {
        for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
            if (nTicks < nPoint * nTicksByPoints) {
                aFormattedPoints.push(getFormattedPoint(eShape, aStartPoint, nPoint, nNumberOfPoints))
            }
        }
    }
    const sShapePoints = aFormattedPoints.join(',');
    return 'polygon(' + sShapePoints + ')';
}

const drawSpinner = function (eShape = SHAPES.CLOCK_TIMER) {
    const oSpinner = document.getElementById('spinner');
    if (nNumberOfTicks < nTotalTicks) {
        const sShape = getShape(eShape, nNumberOfTicks);
        oSpinner.style.clipPath = sShape;
        nNumberOfTicks = nNumberOfTicks + 1;
    } else {
        const sShape = getShape(eShape, 0);
        oSpinner.style.clipPath = sShape;
        clearInterval(nIntervalIdSpinner);
    }
}

let nIntervalIdSpinner = -1;
const nTotalTicks = 60;
let nNumberOfTicks;

const main = function () {
    oButtonRestart = document.getElementById('restart');
    oButtonRestart.onclick = main;
    nNumberOfTicks = 0;
    clearInterval(nIntervalIdSpinner);
    nIntervalIdSpinner = setInterval(drawSpinner, 700, SHAPES.CLOCK_TIMER);
    drawSpinner(SHAPES.CLOCK_TIMER);
}

main();