export function generateRange(mmr) {
    let lowerBound = mmr - 1000;

    if (mmr < 1000) {
        lowerBound = 0;
    }

    const upperBound = mmr + 1000;

    return `${lowerBound}-${upperBound}`;
}