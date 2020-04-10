const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime:
        input.reportedCases * 10 * 2 ** parseInt(input.timeToElapse / 3, 10)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime:
        input.reportedCases * 50 * 2 ** parseInt(input.timeToElapse / 3, 10)
    }
  };
};

export default covid19ImpactEstimator;
