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

export const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const lastYear = new Date("31/12");
    lastYear.setFullYear(today.getFullYear());
    console.log(lastYear)

    if (date.toDateString() === today.toDateString()) {
        return "Hoy";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Ayer";
    } else if (date < yesterday && date >= lastYear) {
        return date.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }).replace(/^\w/, (c) => c.toUpperCase());;
    } else {
        return date.toLocaleDateString("en-AR", { day: "numeric", month: "numeric", year: "2-digit" });
    }
}

export const formatDateOrderDetail = (rawDate) => {
    let date = formatDate(new Date(rawDate))
    if (date == "Hoy") {
        return " hoy"
    } else if (date == "Ayer") {
        return " ayer"
    } else {
        return " el " + date
    }
}