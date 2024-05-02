import { BaseSpinner } from "./baseSpinner.js";

export class ClockTimerSpinner extends BaseSpinner {
    static getPoint = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 40;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nCosine = Math.cos(nIncrement);
        const nSine = Math.sin(nIncrement);
        const sFormattedXValue = Math.floor(aPoint[0] + nCosine * nScale);
        const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
        return bIsCssFormat ? ClockTimerSpinner.getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : ClockTimerSpinner.getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
    }

    static getShapePathCss = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        let aFormattedPoints = [];
        let oFormattedPoint = ClockTimerSpinner.getPoint(aStartPoint, 0, nNumberOfPoints, true);
        aFormattedPoints.push(oFormattedPoint);
        const oFormattedStartPoint = ClockTimerSpinner.getCssFormattedPointFromXY(aStartPoint[0], aStartPoint[1], true);
        aFormattedPoints.push(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = ClockTimerSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, true);
                    aFormattedPoints.push(oFormattedPoint);
                }
            }
        }
        return aFormattedPoints.join(',');
    }

    static getShapePathSvg = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        const oSvgSpinner = document.getElementById('svgspinner');
        const oSvgPointList = oSvgSpinner.points;
        let oFormattedPoint = ClockTimerSpinner.getPoint(aStartPoint, 0, nNumberOfPoints, false);
        oSvgPointList.appendItem(oFormattedPoint);
        const oFormattedStartPoint = ClockTimerSpinner.getSvgPointFromXY(aStartPoint[0], aStartPoint[1], false);
        oSvgPointList.appendItem(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = ClockTimerSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, false);
                    oSvgPointList.appendItem(oFormattedPoint);
                }
            }
        }
        return oSvgPointList;
    }

    drawShapePath = function (nTicks, nTotalTicks, bIsCssFormat = true) {
        const nNumberOfPoints = 30;
        const aStartPoint = [80, 80];
        const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
        if (bIsCssFormat) {
            return ClockTimerSpinner.getShapePathCss(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
        }
        return ClockTimerSpinner.getShapePathSvg(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
    }

    getShape = function (nTicks, nTotalTicks, bIsCssFormat) {
        return `polygon(${this.drawShapePath(nTicks, nTotalTicks, bIsCssFormat)})`;
    }
}