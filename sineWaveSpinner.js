import { BaseSpinner } from "./baseSpinner.js";

export class SineWaveSpinner extends BaseSpinner {
    static sName = 'SineWave';
    static getPoint = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 40;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nSine = Math.sin(nIncrement);
        const sFormattedXValue = Math.floor(aPoint[0] - 74 + nNumberOfPoints - index) * 4;
        const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
        return bIsCssFormat ? SineWaveSpinner.getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : SineWaveSpinner.getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
    }

    static getShapePathCss = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        let aFormattedPoints = [];
        let oFormattedPoint = SineWaveSpinner.getPoint(aStartPoint, 0, nNumberOfPoints, true);
        aFormattedPoints.push(oFormattedPoint);
        const oFormattedStartPoint = SineWaveSpinner.getCssFormattedPointFromXY(aStartPoint[0], aStartPoint[1], true);
        aFormattedPoints.push(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = SineWaveSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, true);
                    aFormattedPoints.push(oFormattedPoint);
                }
            }
        }
        aFormattedPoints.push(oFormattedStartPoint);
        return aFormattedPoints.join(',');
    }

    static getShapePathSvg = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        const oSvgSpinner = document.getElementById('svgspinner');
        const oSvgPointList = oSvgSpinner.points;
        let oFormattedPoint = SineWaveSpinner.getPoint(aStartPoint, 0, nNumberOfPoints, false);
        oSvgPointList.appendItem(oFormattedPoint);
        const oFormattedStartPoint = SineWaveSpinner.getSvgPointFromXY(aStartPoint[0], aStartPoint[1], false);
        oSvgPointList.appendItem(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = SineWaveSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, false);
                    oSvgPointList.appendItem(oFormattedPoint);
                }
            }
        }
        oSvgPointList.appendItem(oFormattedStartPoint);
        return oSvgPointList;
    }

    drawShapePath = function (nTicks, nTotalTicks, bIsCssFormat = true) {
        const nNumberOfPoints = 30;
        const aStartPoint = [80, 80];
        const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
        if (bIsCssFormat) {
            return SineWaveSpinner.getShapePathCss(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
        }
        return SineWaveSpinner.getShapePathSvg(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
    }
}