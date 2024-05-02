import { BaseSpinner } from "./baseSpinner.js";

export class ClockTimerSpinner extends BaseSpinner {
    static getPointForClockTimer = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 40;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nCosine = Math.cos(nIncrement);
        const nSine = Math.sin(nIncrement);
        const sFormattedXValue = Math.floor(aPoint[0] + nCosine * nScale);
        const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
        return bIsCssFormat ? ClockTimerSpinner.getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : ClockTimerSpinner.getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
    }

    static getPointForSineWave = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 40;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nSine = Math.sin(nIncrement);
        const sFormattedXValue = Math.floor(aPoint[0] - 74 + nNumberOfPoints - index) * 4;
        const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
        return bIsCssFormat ? ClockTimerSpinner.getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : ClockTimerSpinner.getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
    }

    static getPoint = function (eShape = ClockTimerSpinner.SHAPES.CLOCK_TIMER, aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        switch (eShape) {
            case ClockTimerSpinner.SHAPES.CLOCK_TIMER:
                return ClockTimerSpinner.getPointForClockTimer(aPoint, index, nNumberOfPoints, bIsCssFormat)
            case ClockTimerSpinner.SHAPES.SINE_WAVE:
                return ClockTimerSpinner.getPointForSineWave(aPoint, index, nNumberOfPoints, bIsCssFormat)
            default:
                return ClockTimerSpinner.apply.getPointForClockTimer(aPoint, index, nNumberOfPoints, bIsCssFormat)
        }
    }

    static getShapePathCss = function (eShape = ClockTimerSpinner.SHAPES.CLOCK_TIMER, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        let aFormattedPoints = [];
        let oFormattedPoint = ClockTimerSpinner.getPoint(eShape, aStartPoint, 0, nNumberOfPoints, true);
        aFormattedPoints.push(oFormattedPoint);
        const oFormattedStartPoint = ClockTimerSpinner.getCssFormattedPointFromXY(aStartPoint[0], aStartPoint[1], true);
        aFormattedPoints.push(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = ClockTimerSpinner.getPoint(eShape, aStartPoint, nPoint, nNumberOfPoints, true);
                    aFormattedPoints.push(oFormattedPoint);
                }
            }
        }
        if (eShape === ClockTimerSpinner.SHAPES.SINE_WAVE) {
            aFormattedPoints.push(oFormattedStartPoint);
        }
        return aFormattedPoints.join(',');
    }

    static getShapePathSvg = function (eShape = ClockTimerSpinner.SHAPES.CLOCK_TIMER, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        const oSvgSpinner = document.getElementById('svgspinner');
        const oSvgPointList = oSvgSpinner.points;
        let oFormattedPoint = ClockTimerSpinner.getPoint(eShape, aStartPoint, 0, nNumberOfPoints, false);
        oSvgPointList.appendItem(oFormattedPoint);
        const oFormattedStartPoint = ClockTimerSpinner.getSvgPointFromXY(aStartPoint[0], aStartPoint[1], false);
        oSvgPointList.appendItem(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = ClockTimerSpinner.getPoint(eShape, aStartPoint, nPoint, nNumberOfPoints, false);
                    oSvgPointList.appendItem(oFormattedPoint);
                }
            }
        }
        if (eShape === ClockTimerSpinner.SHAPES.SINE_WAVE) {
            oSvgPointList.appendItem(oFormattedStartPoint);
        }
        return oSvgPointList;
    }

    static drawShapePath = function (eShape = ClockTimerSpinner.SHAPES.CLOCK_TIMER, nTicks, nTotalTicks, bIsCssFormat = true) {
        const nNumberOfPoints = 30;
        const aStartPoint = [80, 80];
        const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
        if (bIsCssFormat) {
            return ClockTimerSpinner.getShapePathCss(eShape, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
        }
        return ClockTimerSpinner.getShapePathSvg(eShape, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
    }

    static getShape = function (eShape = ClockTimerSpinner.SHAPES.CLOCK_TIMER, nTicks, nTotalTicks, bIsCssFormat) {
        return `polygon(${ClockTimerSpinner.drawShapePath(eShape, nTicks, nTotalTicks, bIsCssFormat)})`;
    }
}