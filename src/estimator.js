const infectionsRate = (data, impactFactor) => {
  const duration = {
    days: 1,
    weeks: 7,
    months: 30
  };
  return [data.reportedCases * 10, data.reportedCases
  * impactFactor
  * 2 ** parseInt((data.timeToElapse * duration[data.periodType]) / 3, 10)];
  // parseInt(infectionsRate(data, impactFactor) * 0.15, 10)];
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  const estimates = infectionsRate(input, 10);
  const severeImpacts = infectionsRate(input, 50);
  return {
    data: input,
    impact: {
      currentlyInfected: estimates[0],
      infectionsByRequestedTime: estimates[1]
      // severeCasesByRequestedTime: infectionsRate(input, 10)[2],
      // hospitalBedsByRequestedTime: parseInt(input.totalHospitalBeds * 0.35, 10)
      // - infectionsRate(input, 10)[2]
    },
    severeImpact: {
      currentlyInfected: severeImpacts[0],
      infectionsByRequestedTime: severeImpacts[1]
      // severeCasesByRequestedTime: infectionsRate(input, 50)[2],
      // hospitalBedsByRequestedTime: parseInt(input.totalHospitalBeds * 0.35, 10)
      // - infectionsRate(input, 50)[2]
    }
  };
};

export default covid19ImpactEstimator;
