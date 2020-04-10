const infectionsRate = (currentlyInfected, factor, periodType) => {
  return currentlyInfected * Math.pow(2, 9);
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: infectionsRate(input.reportedCases * 10, 2, 9)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: infectionsRate(input.reportedCases * 10, 2, 9)
    }
  };
};

export default covid19ImpactEstimator;
