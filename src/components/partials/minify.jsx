export function minify(number) {
    if (number) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    const scaledNumber = number / Math.pow(1000, suffixIndex);
    const formattedNumber = scaledNumber.toFixed(1);
    const suffix = suffixes[suffixIndex];
    return `${formattedNumber} ${suffix}`;
    } else return 0;
    }