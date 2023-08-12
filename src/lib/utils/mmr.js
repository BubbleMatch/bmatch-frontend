export function generateRange(mmr) {
    let lowerBound = mmr - 1000;

    // For numbers less than 1000, the lower bound should be zero
    if (mmr < 1000) {
        lowerBound = 0;
    }

    const upperBound = mmr + 1000;

    return `${lowerBound}-${upperBound}`;
}