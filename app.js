const getFormattedPoint = function (aPoint, nTicks, index, nNumberOfPoints) {
    const nScale = 20;
    const nIncrement = index * 2;
    const nPosition = -nTicks + nIncrement;
    return Math.floor(aPoint[0] + Math.cos(nPosition) * nScale) + 'px ' + Math.floor(aPoint[1] + Math.sin(nPosition) * nScale) + 'px';
}

const getShape = function (nTicks) {
    const nNumberOfPoints = 3;
    const aStartPoint = [80, 80];
    let aFormattedPoints = [];
    for (let nPoint = 0; nPoint < nNumberOfPoints; nPoint++) {
        aFormattedPoints.push(getFormattedPoint(aStartPoint, nTicks, nPoint, nNumberOfPoints))
    }
    const sShapePoints = aFormattedPoints.join(',');
    return 'polygon(' + sShapePoints + ')';
}

const drawSpinner = function () {
    if (nNumberOfTicks > 0) {
        const oSpinner = document.getElementById('spinner');
        const sShape = getShape(nNumberOfTicks);
        oSpinner.style.clipPath = sShape;
        nNumberOfTicks = nNumberOfTicks - 1;
    } else {
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
}

main();