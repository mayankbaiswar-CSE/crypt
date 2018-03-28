import { width, height } from './device';

const scale = width / 375;

function normalize(size) {
    return Math.round(scale * size);
}

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const normalScale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (normalScale(size) - size) * factor;

export default normalize;
export { normalScale, verticalScale, moderateScale };