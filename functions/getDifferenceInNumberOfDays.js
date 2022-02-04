function getDifferenceInNumberOfDays(date1, date2) {
    const totalDiffInMs = Math.abs(date2 - date1);
    return Math.round(((totalDiffInMs % 86400000) % 3600000) / 60000);
    // return diffInMs / (1000 * 60 * 60 * 24);
}

export default getDifferenceInNumberOfDays;
