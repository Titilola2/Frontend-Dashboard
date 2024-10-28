export function magnify(str) {
    if (str) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const numberPart = str.match(/^-?\d+(?:\.\d+)?/)[0];
    const suffixPart = str.replace(numberPart, '').trim();
    const suffixIndex = suffixes.indexOf(suffixPart);
    if (suffixIndex === -1) {
    throw new Error(`Invalid suffix '${suffixPart}'`);
    }
    return parseFloat(numberPart) * Math.pow(1000, suffixIndex);
    } else return 0;
    }