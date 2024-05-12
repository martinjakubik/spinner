import { BaseSpinner } from "./baseSpinner.js";

export class DotClockSpinner extends BaseSpinner {
    static sName = 'DotClock';

    static getSvgPointFromXY = function (sFormattedXValue, sFormattedYValue) {
        return `${Math.round(sFormattedXValue)},${Math.round(sFormattedYValue)}`;
    }

    static getPoint = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 120;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nCosine = Math.cos(nIncrement);
        const nSine = Math.sin(nIncrement);
        const nXValue = Math.floor(aPoint[0] + nCosine * nScale);
        const nYValue = Math.floor(aPoint[1] + nSine * nScale);
        const oPoint = {
            x: nXValue,
            y: nYValue,
            formatted: bIsCssFormat ? DotClockSpinner.getCssFormattedPointFromXY(nXValue, nYValue) : DotClockSpinner.getSvgPointFromXY(nXValue, nYValue)
        }
        return oPoint;
    }

    static getPointsForCircleAtStartPoint(oStartPoint, aFormattedPoints, bIsCssFormat = true) {
        const nNumberOfPoints = 8;
        const nScale = 18;
        let sSvgPointList = '';
        for (let nAngle = 0; nAngle <= 2 * Math.PI; nAngle = nAngle + 2 * Math.PI / nNumberOfPoints) {
            if (bIsCssFormat) {
                const aPoint = [
                    (Math.cos(nAngle) + oStartPoint.x / 40) * nScale,
                    (Math.sin(nAngle) + oStartPoint.y / 40) * nScale
                ];
                const oFormattedPoint = DotClockSpinner.getPoint(aPoint, nAngle, nNumberOfPoints, true).formatted;
                aFormattedPoints.push(oFormattedPoint);
            } else {
                const aPoint = [
                    (Math.cos(nAngle)) * nScale,
                    (Math.sin(nAngle)) * nScale
                ];
                const sSvgPoint = DotClockSpinner.getSvgPointFromXY(aPoint[0], aPoint[1]);
                sSvgPointList += ` l ${sSvgPoint}`;
            }
        }
        return sSvgPointList;
    }

    static getShapePathCss = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        let aFormattedPoints = [];
        let oFormattedPoint = DotClockSpinner.getPoint(aStartPoint, 0, nNumberOfPoints, true).formatted;
        aFormattedPoints.push(oFormattedPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    const oPoint = DotClockSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, true);
                    oFormattedPoint = oPoint.formatted;
                    DotClockSpinner.getPointsForCircleAtStartPoint(aStartPoint, aFormattedPoints, null, true);
                    aFormattedPoints.push(oFormattedPoint);
                }
            }
        }
        return aFormattedPoints.join(',');
    }

    static getShapePathSvg = function (nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        let sSvgPointList = '';
        let sFormattedPoint;
        if (nTicks > 0) {
            for (let nPoint = 0; nPoint <= nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    const oPoint = DotClockSpinner.getPoint(aStartPoint, nPoint, nNumberOfPoints, false);
                    sFormattedPoint = `M ${oPoint.formatted}`;
                    sSvgPointList += ' ' + sFormattedPoint;
                    sSvgPointList += ' ' + DotClockSpinner.getPointsForCircleAtStartPoint(oPoint, null, false);
                }
            }
        }
        // sSvgPointList += ' Z';
        return sSvgPointList;
    }

    drawShapePath = function (nTicks, nTotalTicks, bIsCssFormat = true) {
        const nNumberOfPoints = 8;
        const aStartPoint = [140, 140];
        const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
        if (bIsCssFormat) {
            return DotClockSpinner.getShapePathCss(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
        }
        return DotClockSpinner.getShapePathSvg(nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
    }

    getShape = function (nTicks, nTotalTicks, bIsCssFormat) {
        return `path(${this.drawShapePath(nTicks, nTotalTicks, bIsCssFormat)})`;
    }
}