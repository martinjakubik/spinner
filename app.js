const getFormattedPoint = function (aPoint, nTicks, index, nNumberOfPoints) {
    const nScale = 40;
    const nIncrement = index * 2 * Math.PI / nNumberOfPoints;
    const nPosition = -nTicks + nIncrement;
    const nCosine = Math.cos(nPosition);
    const nSine = Math.sin(nPosition);
    return Math.floor(aPoint[0] + nCosine * nScale) + 'px ' + Math.floor(aPoint[1] + nSine * nScale) + 'px';
}

const getShape = function (nTicks) {
    const nNumberOfPoints = 7;
    const aStartPoint = [80, 80];
    let aFormattedPoints = [];
    for (let nPoint = 0; nPoint < nNumberOfPoints; nPoint++) {
        aFormattedPoints.push(getFormattedPoint(aStartPoint, nTicks, nPoint, nNumberOfPoints))
    }
    const sShapePoints = aFormattedPoints.join(',');
    return 'polygon(' + sShapePoints + ')';
}

const drawSpinner = function () {
    const oSpinner = document.getElementById('spinner');
    if (nNumberOfTicks > 0) {
        const sShape = getShape(nNumberOfTicks);
        oSpinner.style.clipPath = sShape;
        nNumberOfTicks = nNumberOfTicks - 1;
    } else {
        const sShape = getShape(1);
        oSpinner.style.clipPath = sShape;
        clearInterval(nIntervalIdSpinner);
    }
}

let nIntervalIdSpinner = -1;
let nNumberOfTicks;

const main = function () {
    oButtonRestart = document.getElementById('restart');
    oButtonRestart.onclick = main;
    nNumberOfTicks = 60;
    clearInterval(nIntervalIdSpinner);
    nIntervalIdSpinner = setInterval(drawSpinner, 700);
    drawSpinner();
}

main();