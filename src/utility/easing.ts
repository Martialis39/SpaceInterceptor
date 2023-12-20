// Got this from the internet

export const easeInOutBack = function (t) {
    var s = 1.70158;
    if ((t *= 2) < 1) {
        return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
    } else {
        return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    }
};
