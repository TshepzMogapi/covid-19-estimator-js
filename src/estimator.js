const covid19ImpactEstimator = (data) => {
  const input = data;

  const duration = {
    days: 1,
    weeks: 7,
    months: 30
  };

  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime:
        input.reportedCases
        * 10
        * 2 ** parseInt((input.timeToElapse * duration[input.periodType]) / 3, 10)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime:
        input.reportedCases
        * 50
        * 2 ** parseInt((input.timeToElapse * duration[input.periodType]) / 3, 10)
    }
  };
};

export default covid19ImpactEstimator;
