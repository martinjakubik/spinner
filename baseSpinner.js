export class BaseSpinner {
    static SHAPES = {
        CLOCK_TIMER: 0,
        SINE_WAVE: 1
    }

    static getSvgPointFromXY = function (sFormattedXValue, sFormattedYValue) {
        const oSvgContent = document.getElementById('svgcontent');
        const oSvgPoint = oSvgContent.createSVGPoint();
        oSvgPoint.x = sFormattedXValue;
        oSvgPoint.y = sFormattedYValue;
        return oSvgPoint;
    }

    static getCssFormattedPointFromXY = function (sFormattedXValue, sFormattedYValue) {
        return `${sFormattedXValue}px ${sFormattedYValue}px`;
    }
}