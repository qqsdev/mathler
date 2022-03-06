const MATH_PATTERN_NAMES = {
  NON_ZERO_DIGITS: 'k',
  ALL_DIGITS: 'n',
  OPERATORS: 'o'
};

const MATH_PATTERNS = {
  EASY: [
    // single operator
    'koknn',
    'knokn',
    'knnok',
  ],

  MEDIUM: [
    // single operator
    'koknnn',
    'knoknn',
    'knnokn',
    'knnnok',
    // two operators
    'kokokn',
    'koknok',
    'knokok',
  ],

  HARD: [
    // single operator
    'koknnnnn',
    'knoknnnn',
    'knnoknnn',
    'knnnoknn',
    'knnnnokn',
    'knnnnnok',
    // two operators
    'kokoknnn',
    'koknoknn',
    'koknnokn',
    'koknnnok',
    'knokoknn',
    'knoknokn',
    'knoknnok',
    'knnokokn',
    'knnoknok',
    'knnnokok',
    // three opertors
    'kokokokn',
    'kokoknok',
    'koknokok',
    'knokokok',
    // brackets
    '(kok)okn',
    '(knok)ok',
    '(kokn)ok',
    'kno(nok)',
    'ko(nnok)',
    'ko(nokn)',
  ],
};
