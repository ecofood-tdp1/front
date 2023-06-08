import seedrandom from 'seedrandom';

export const getReviewStarsFor = (id: string) => {
    const seed = id + "grupo4tdp";
    const rng = new seedrandom(seed);
    const randomNum = rng() * (5.3 - 3.4) + 3.4;
    return Math.round(randomNum)
}

export const getReviewCountFor = (id: string) => {
    const seed = id + "grupo4tdp";
    const rng = new seedrandom(seed);
    const randomNum = rng() * (20 - 2) + 2;
    return Math.round(randomNum)
}