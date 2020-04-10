const infectionsRate = (data, impactFactors) => {
  const duration = {
    days: 1,
    weeks: 7,
    months: 30
  };
  return [data.reportedCases * 10, data.reportedCases
  * impactFactors
  * 2 ** parseInt((data.timeToElapse * duration[data.periodType]) / 3, 10),
  parseInt(infectionsRate(data, impactFactors) * 0.15, 10)];
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: infectionsRate(input, 10)[0],
      infectionsByRequestedTime: infectionsRate(input, 10)[1],
      severeCasesByRequestedTime: infectionsRate(input, 10)[2],
      hospitalBedsByRequestedTime: parseInt(input.totalHospitalBeds * 0.35, 10)
      - infectionsRate(input, 10)[2]
    },
    severeImpact: {
      currentlyInfected: infectionsRate(input, 50)[0],
      infectionsByRequestedTime: infectionsRate(input, 50)[1],
      severeCasesByRequestedTime: infectionsRate(input, 50)[2],
      hospitalBedsByRequestedTime: parseInt(input.totalHospitalBeds * 0.35, 10)
      - infectionsRate(input, 50)[2]
    }
  };
};

export default covid19ImpactEstimator;
