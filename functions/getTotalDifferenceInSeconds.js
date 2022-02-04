function getTotalDifferenceInSeconds(date1, date2) {
    const totalDiffInMs = Math.abs(date2 - date1);
    return totalDiffInMs / 1000;
}

export default getTotalDifferenceInSeconds;
