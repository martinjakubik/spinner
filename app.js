const SHAPES = {
    CLOCK_TIMER: 0,
    SINE_WAVE: 1
}

const getSvgPointFromXY = function (sFormattedXValue, sFormattedYValue) {
    const oSvgContent = document.getElementById('svgcontent');
    const oSvgPoint = oSvgContent.createSVGPoint();
    oSvgPoint.x = sFormattedXValue;
    oSvgPoint.y = sFormattedYValue;
    return oSvgPoint;
}

const getCssFormattedPointFromXY = function (sFormattedXValue, sFormattedYValue) {
    return `${sFormattedXValue}px ${sFormattedYValue}px`;
}

const getFormattedPointForClockTimer = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
    const nScale = 40;
    const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
    const nCosine = Math.cos(nIncrement);
    const nSine = Math.sin(nIncrement);
    const sFormattedXValue = Math.floor(aPoint[0] + nCosine * nScale);
    const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
    return bIsCssFormat ? getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
}

const getFormattedPointForSineWave = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
    const nScale = 40;
    const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
    const nSine = Math.sin(nIncrement);
    const sFormattedXValue = Math.floor(aPoint[0] + nNumberOfPoints - index);
    const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
    return bIsCssFormat ? getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
}

const getFormattedPoint = function (eShape = SHAPES.CLOCK_TIMER, aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
    switch (eShape) {
        case SHAPES.CLOCK_TIMER:
            return getFormattedPointForClockTimer(aPoint, index, nNumberOfPoints, bIsCssFormat)
        case SHAPES.SINE_WAVE:
            return getFormattedPointForSineWave(aPoint, index, nNumberOfPoints, bIsCssFormat)
        default:
            return getFormattedPointForClockTimer(aPoint, index, nNumberOfPoints, bIsCssFormat)
    }
}

const getShapePathCss = function (eShape = SHAPES.CLOCK_TIMER, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
    let aFormattedPoints = [];
    let oFormattedPoint = getFormattedPoint(eShape, aStartPoint, 0, nNumberOfPoints, true);
    aFormattedPoints.push(oFormattedPoint);
    const oFormattedStartPoint = getCssFormattedPointFromXY(aStartPoint[0], aStartPoint[1], true);
    aFormattedPoints.push(oFormattedStartPoint);
    if (nTicks > 0) {
        for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
            if (nTicks < nPoint * nTicksByPoints) {
                oFormattedPoint = getFormattedPoint(eShape, aStartPoint, nPoint, nNumberOfPoints, true);
                aFormattedPoints.push(oFormattedPoint);
            }
        }
    }
    return aFormattedPoints.join(',');
}

const getShapePathSvg = function (eShape = SHAPES.CLOCK_TIMER, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
    const oSvgSpinner = document.getElementById('svgspinner');
    const oSvgPointList = oSvgSpinner.points;
    let oFormattedPoint = getFormattedPoint(eShape, aStartPoint, 0, nNumberOfPoints, false);
    oSvgPointList.appendItem(oFormattedPoint);
    const oFormattedStartPoint = getSvgPointFromXY(aStartPoint[0], aStartPoint[1], false);
    oSvgPointList.appendItem(oFormattedStartPoint);
    if (nTicks > 0) {
        for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
            if (nTicks < nPoint * nTicksByPoints) {
                oFormattedPoint = getFormattedPoint(eShape, aStartPoint, nPoint, nNumberOfPoints, false);
                oSvgPointList.appendItem(oFormattedPoint);
            }
        }
        return oSvgPointList;
    }
}

const getShapePath = function (eShape = SHAPES.CLOCK_TIMER, nTicks, bIsCssFormat = true) {
    const nNumberOfPoints = 30;
    const aStartPoint = [80, 80];
    const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
    if (bIsCssFormat) {
        return getShapePathCss(eShape, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
    }
    return getShapePathSvg(eShape, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
}

const getShape = function (eShape = SHAPES.CLOCK_TIMER, nTicks, bIsCssFormat) {
    return `polygon(${getShapePath(eShape, nTicks, bIsCssFormat)})`;
}

const drawSpinner = function (eShape = SHAPES.CLOCK_TIMER) {
    const oSpinner = document.getElementById('cssspinner');
    if (nNumberOfTicks < nTotalTicks) {
        const sShape = getShape(eShape, nNumberOfTicks, true);
        oSpinner.style.clipPath = sShape;
        nNumberOfTicks = nNumberOfTicks + 1;
    } else {
        const sShape = getShape(eShape, 0, true);
        oSpinner.style.clipPath = sShape;
        clearInterval(nIntervalIdSpinner);
    }
}

const drawSvgSpinner = function (eShape = SHAPES.CLOCK_TIMER) {
    const oSvgContent = document.getElementById('svgcontent');
    const oSvgSpinner = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    oSvgSpinner.id = 'svgspinner';
    oSvgContent.appendChild(oSvgSpinner);
    for (let nTicks = 0; nTicks <= nTotalTicks; nTicks++) {
        const sShape = getShapePath(eShape, nTicks, false);
        oSvgSpinner.points = sShape;
    }
}

let nIntervalIdSpinner = -1;
const nTotalTicks = 60;
let nNumberOfTicks;

const main = function () {
    drawSvgSpinner();
    oButtonRestart = document.getElementById('restart');
    oButtonRestart.onclick = main;
    nNumberOfTicks = 0;
    clearInterval(nIntervalIdSpinner);
    nIntervalIdSpinner = setInterval(drawSpinner, 700, SHAPES.CLOCK_TIMER);
    drawSpinner(SHAPES.CLOCK_TIMER, true);
}

main();