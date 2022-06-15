const getFormattedPoint = function (aPoint, nTicks, index) {
    const nScale = 10;
    const nIncrement = 5;
    return Math.floor(aPoint[0] + Math.cos(nTicks + nIncrement * index) * nScale) + 'px ' + Math.floor(aPoint[1] + Math.sin(nTicks + nIncrement * index) * nScale) + 'px';
}

const getShape = function (nTicks) {
    const aPoints = [
        [20, 80],
        [60, 95],
        [10, 95]
    ]
    let aFormattedPoints = [];
    aPoints.forEach((aPoint, index) => {
        aFormattedPoints.push(getFormattedPoint(aPoint, nTicks, index))
    })
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