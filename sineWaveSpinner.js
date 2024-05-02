import { BaseSpinner } from "./baseSpinner.js";

export class SineWaveSpinner extends BaseSpinner {
    static getPointForClockTimer = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 40;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nCosine = Math.cos(nIncrement);
        const nSine = Math.sin(nIncrement);
        const sFormattedXValue = Math.floor(aPoint[0] + nCosine * nScale);
        const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
        return bIsCssFormat ? SineWaveSpinner.getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : SineWaveSpinner.getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
    }

    static getPointForSineWave = function (aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        const nScale = 40;
        const nIncrement = index * 2 * Math.PI / nNumberOfPoints - Math.PI / 2;
        const nSine = Math.sin(nIncrement);
        const sFormattedXValue = Math.floor(aPoint[0] - 74 + nNumberOfPoints - index) * 4;
        const sFormattedYValue = Math.floor(aPoint[1] + nSine * nScale);
        return bIsCssFormat ? SineWaveSpinner.getCssFormattedPointFromXY(sFormattedXValue, sFormattedYValue) : SineWaveSpinner.getSvgPointFromXY(sFormattedXValue, sFormattedYValue);
    }

    static getPoint = function (eShape = SineWaveSpinner.SHAPES.CLOCK_TIMER, aPoint, index, nNumberOfPoints, bIsCssFormat = true) {
        switch (eShape) {
            case SineWaveSpinner.SHAPES.CLOCK_TIMER:
                return SineWaveSpinner.getPointForClockTimer(aPoint, index, nNumberOfPoints, bIsCssFormat)
            case SineWaveSpinner.SHAPES.SINE_WAVE:
                return SineWaveSpinner.getPointForSineWave(aPoint, index, nNumberOfPoints, bIsCssFormat)
            default:
                return SineWaveSpinner.apply.getPointForClockTimer(aPoint, index, nNumberOfPoints, bIsCssFormat)
        }
    }

    static getShapePathCss = function (eShape = SineWaveSpinner.SHAPES.CLOCK_TIMER, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        let aFormattedPoints = [];
        let oFormattedPoint = SineWaveSpinner.getPoint(eShape, aStartPoint, 0, nNumberOfPoints, true);
        aFormattedPoints.push(oFormattedPoint);
        const oFormattedStartPoint = SineWaveSpinner.getCssFormattedPointFromXY(aStartPoint[0], aStartPoint[1], true);
        aFormattedPoints.push(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = SineWaveSpinner.getPoint(eShape, aStartPoint, nPoint, nNumberOfPoints, true);
                    aFormattedPoints.push(oFormattedPoint);
                }
            }
        }
        if (eShape === SineWaveSpinner.SHAPES.SINE_WAVE) {
            aFormattedPoints.push(oFormattedStartPoint);
        }
        return aFormattedPoints.join(',');
    }

    static getShapePathSvg = function (eShape = SineWaveSpinner.SHAPES.CLOCK_TIMER, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints) {
        const oSvgSpinner = document.getElementById('svgspinner');
        const oSvgPointList = oSvgSpinner.points;
        let oFormattedPoint = SineWaveSpinner.getPoint(eShape, aStartPoint, 0, nNumberOfPoints, false);
        oSvgPointList.appendItem(oFormattedPoint);
        const oFormattedStartPoint = SineWaveSpinner.getSvgPointFromXY(aStartPoint[0], aStartPoint[1], false);
        oSvgPointList.appendItem(oFormattedStartPoint);
        if (nTicks > 0) {
            for (let nPoint = 1; nPoint < nNumberOfPoints; nPoint++) {
                if (nTicks < nPoint * nTicksByPoints) {
                    oFormattedPoint = SineWaveSpinner.getPoint(eShape, aStartPoint, nPoint, nNumberOfPoints, false);
                    oSvgPointList.appendItem(oFormattedPoint);
                }
            }
        }
        if (eShape === SineWaveSpinner.SHAPES.SINE_WAVE) {
            oSvgPointList.appendItem(oFormattedStartPoint);
        }
        return oSvgPointList;
    }

    drawShapePath = function (nTicks, nTotalTicks, bIsCssFormat = true) {
        const nNumberOfPoints = 30;
        const aStartPoint = [80, 80];
        const nTicksByPoints = Math.floor(nTotalTicks / nNumberOfPoints);
        if (bIsCssFormat) {
            return SineWaveSpinner.getShapePathCss(SineWaveSpinner.SHAPES.SINE_WAVE, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
        }
        return SineWaveSpinner.getShapePathSvg(SineWaveSpinner.SHAPES.SINE_WAVE, nTicks, nNumberOfPoints, aStartPoint, nTicksByPoints);
    }

    getShape = function (nTicks, nTotalTicks, bIsCssFormat) {
        return `polygon(${this.drawShapePath(nTicks, nTotalTicks, bIsCssFormat)})`;
    }
}