import { BaseSpinner } from "./baseSpinner.js";

export class DotClockSpinner extends BaseSpinner {
    static sName = 'DotClock';
    static getPoint = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 40;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nCosine = Math.cos(nIncrement);
        const nSine = Math.sin(nIncrement);
        const sFormattedXValue = Math.floor(aPoint[0] + nCosine * nScale);
        const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
        return bIsCssFormat ? DotClockSpinner.getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : DotClockSpinner.getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
    }

    static getPointsForCircleAtStartPoint(oStartPoint, aFormattedPoints, oSvgPointList, bIsCssFormat = true) {
        const nNumberOfPoints = 10;
        const nScale = 8;
        for (let nAngle = 0; nAngle <= 2 * Math.PI; nAngle = nAngle + 2 * Math.PI / nNumberOfPoints) {
            const aPoint = [
                (Math.cos(nAngle) + oStartPoint.x / 40) * nScale,
                (Math.sin(nAngle) + oStartPoint.y / 40) * nScale
            ];
            if (bIsCssFormat) {
                const oFormattedPoint = DotClockSpinner.getPoint(aPoint, nAngle, nNumberOfPoints, true);
                aFormattedPoints.push(oFormattedPoint);
            } else {
                const oSvgPoint = BaseSpinner.getSvgPointFromXY(aPoint[0], aPoint[1]);
                oSvgPointList.appendItem(oSvgPoint);
            }
        }
    }

    static getShapePathCss = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        let aFormattedPoints = [];
        let oFormattedPoint = DotClockSpinner.getPoint(aStartPoint, 0, nNumberOfPoints, true);
        aFormattedPoints.push(oFormattedPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = DotClockSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, true);
                    DotClockSpinner.getPointsForCircleAtStartPoint(oFormattedPoint, aFormattedPoints, null, true);
                    aFormattedPoints.push(oFormattedPoint);
                }
            }
        }
        return aFormattedPoints.join(',');
    }

    static getShapePathSvg = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        const oSvgSpinner = document.getElementById('svgspinner');
        const oSvgPointList = oSvgSpinner.points;
        let oFormattedPoint;
        if (nTicks > 0) {
            for (let nPoint = 0; nPoint <= nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = DotClockSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, false);
                    DotClockSpinner.getPointsForCircleAtStartPoint(oFormattedPoint, null, oSvgPointList, false);
                }
            }
        }
        return oSvgPointList;
    }

    drawShapePath = function (nTicks, nTotalTicks, bIsCssFormat = true) {
        const nNumberOfPoints = 8;
        const aStartPoint = [80, 80];
        const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
        if (bIsCssFormat) {
            return DotClockSpinner.getShapePathCss(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
        }
        return DotClockSpinner.getShapePathSvg(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
    }

    getShape = function (nTicks, nTotalTicks, bIsCssFormat) {
        return `polygon(${this.drawShapePath(nTicks, nTotalTicks, bIsCssFormat)})`;
    }
}