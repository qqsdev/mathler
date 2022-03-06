const MAP = {
  [MATH_PATTERN_NAMES.NON_ZERO_DIGITS]: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [MATH_PATTERN_NAMES.ALL_DIGITS]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [MATH_PATTERN_NAMES.OPERATORS]: ['+', '-', '*', '/'],
};

const GOAL_MIN_LIMIT = 0;
const GOAL_MAX_LIMIT = 100;
const MAX_TRY_COUNT = 100;

const getRandom = (array) => array[Math.floor(Math.random() * array.length)];
const isNaturalNumber = (number) => number % 1 == 0;

/**
 * Generates math calculation
 * @param {string[]} difficulty - Calculation pattern
 * @returns {string} Generated calculation
 */
function generateCalculation(difficulty) {
  const pattern = getRandom(difficulty).split('');
  const options = pattern.map((char) => MAP[char]);

  let counter = MAX_TRY_COUNT;

  while (counter--) {
    const calculation = options.map(getRandom).join('');
    const calculationResult = eval(calculation);

    if (
      calculationResult > GOAL_MIN_LIMIT &&
      calculationResult < GOAL_MAX_LIMIT &&
      isNaturalNumber(calculationResult)
    ) {
      return calculation;
    }
  }

  return generateCalculation(difficulty);
}
