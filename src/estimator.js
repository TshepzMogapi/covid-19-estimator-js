const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: infectionsRate(input)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: infectionsRate(input)
    }
  };
};

const infectionsRate = (data) => {
  return 5;
};

export default covid19ImpactEstimator;
