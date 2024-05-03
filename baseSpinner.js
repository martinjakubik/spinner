export class BaseSpinner {
    static getSvgPointFromXY = function (sFormattedXValue, sFormattedYValue) {
        const oSvgContent = document.getElementById('svgcontent');
        const oSvgPoint = oSvgContent.createSVGPoint();
        oSvgPoint.x = sFormattedXValue * 4;
        oSvgPoint.y = sFormattedYValue * 4;
        return oSvgPoint;
    }

    static getCssFormattedPointFromXY = function (sFormattedXValue, sFormattedYValue) {
        return `${sFormattedXValue}px ${sFormattedYValue}px`;
    }

    static clearShapePathSvg = function () {
        const oSvgSpinner = document.getElementById('svgspinner');
        if (oSvgSpinner) {
            const oSvgPointList = oSvgSpinner.points;
            oSvgPointList.clear();
        }
    }

    clearShapePath = function (bIsCssFormat = true) {
        if (!bIsCssFormat) {
            BaseSpinner.clearShapePathSvg();
        }
    }
}