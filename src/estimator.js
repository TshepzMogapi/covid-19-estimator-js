const infectionsRate = (data, impactFactor) => {
  const duration = {
    days: 1,
    weeks: 7,
    months: 30
  };
  return data.reportedCases
  * impactFactor
  * 2 ** parseInt((data.timeToElapse * duration[data.periodType]) / 3, 10)
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: infectionsRate(input, 10)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: infectionsRate(input, 50)
    }
  };
};

export default covid19ImpactEstimator;
