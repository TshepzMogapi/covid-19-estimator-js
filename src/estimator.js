const calculator = (data, impactFactor) => {
  const duration = {
    days: 1,
    weeks: 7,
    months: 30
  };

  const infections = data.reportedCases * impactFactor;
  const rate = infections * 2 ** parseInt((data.timeToElapse * duration[data.periodType]) / 3, 10);
  const cases = parseInt(rate * 0.15, 10);
  const beds = parseInt(data.totalHospitalBeds * 0.35 - cases, 10);
  return [infections, rate, cases, beds];
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  const estimates = calculator(input, 10);
  const severeImpacts = calculator(input, 50);
  return {
    data: input,
    impact: {
      currentlyInfected: estimates[0],
      infectionsByRequestedTime: estimates[1],
      severeCasesByRequestedTime: estimates[2],
      hospitalBedsByRequestedTime: estimates[3]
    },
    severeImpact: {
      currentlyInfected: severeImpacts[0],
      infectionsByRequestedTime: severeImpacts[1],
      severeCasesByRequestedTime: severeImpacts[2],
      hospitalBedsByRequestedTime: severeImpacts[3]
    }
  };
};

export default covid19ImpactEstimator;
