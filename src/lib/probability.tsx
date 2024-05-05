export default function createProbabilities(
  flatProbability: number,
  softPityStart: number,
  probabilityIncrease: number,
  hardPity: number
) {
  const perRoll = createPerRoll(
    flatProbability,
    softPityStart,
    probabilityIncrease,
    hardPity
  );
  const probabilityMassFunction = createPMF(perRoll);

  return {
    perRoll: perRoll,
    pmf: probabilityMassFunction,
    cdf: createCDF(probabilityMassFunction),
  };
}

function createPerRoll(
  flatProbability: number,
  softPityStart: number,
  probabilityIncrease: number,
  hardPity: number
) {
  function perRoll(pity: number): number {
    if (pity < 0 || pity > hardPity) {
      return 0;
    } else if (pity < softPityStart) {
      return flatProbability;
    } else if (pity == hardPity) {
      return 1;
    } else {
      return flatProbability + probabilityIncrease * (pity - softPityStart + 1);
    }
  }
  return perRoll;
}

function createPMF(perRoll: (pity: number) => number) {
  function probabilityMassFunction(pity: number): number {
    // it is impossible to get a proc without rolling
    if (pity == 0) {
      return 0;
    }

    let p = perRoll(pity);

    for (let i = 1; i < pity; i++) {
      p *= 1 - perRoll(i);
    }

    return p;
  }
  return probabilityMassFunction;
}

function createCDF(probabilityMassFunction: (pity: number) => number) {
  function cumulativeDistributionFunction(pity: number): number {
    return Array.from({ length: pity }, (_, i) =>
      probabilityMassFunction(pity - i - 1)
    ).reduce((accumulator, currentValue) => accumulator + currentValue);
  }
  return cumulativeDistributionFunction;
}
