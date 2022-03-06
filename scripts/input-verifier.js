const EMPTY = '⬜️';
const WRONG = '🟨';
const CORRECT = '🟩';

/**
 * @typedef {Object} CLUES
 * @property {number[]} empty - empty numbers
 * @property {number[]} wrong - wrong numbers
 * @property {number[]} correct - correct numbers
 */

/**
 * Fill the clues
 * @param {string} solution 
 * @param {string} attempt 
 * @param {CLUES} CLUES 
 */
function fillCLues(solution, attempt, CLUES) {
  for (let i = 0; i < attempt.length; i++) {
    const item = attempt[i];

    if (solution[i] === item) {
      CLUES.correct.push(item);
    } else if (solution.includes(item)) {
      CLUES.wrong.push(item);
    } else {
      CLUES.empty.push(item);
    }
  }
}

/**
 * Finds clues to how close to the solution
 * @param {string} solution
 * @param {string} attempt
 * @returns {string[]} Clues
 */
function verifyInput(solution, attempt) {
  solution = [...solution];
  attempt = [...attempt];

  return attempt
    .map((item, index) =>
      item === solution[index] ? (solution[index] = CORRECT) : item
    )
    .map((item) => {
      if (item === CORRECT) return item;

      const found = solution.indexOf(item);
      return found >= 0 ? (solution[found] = WRONG) : EMPTY;
    });
}

// ⬜️🟩🟨

verifyInput('111111', '224466'); // ⬜️⬜️⬜️⬜️⬜️⬜️
verifyInput('123456', '224466'); // ⬜️🟩⬜️🟩⬜️🟩
verifyInput('222222', '224466'); // 🟩🟩⬜️⬜️⬜️⬜️
verifyInput('122345', '224466'); // 🟨🟩🟨⬜️⬜️⬜️
verifyInput('220000', '422244'); // ⬜️🟩🟨⬜️⬜️⬜️
verifyInput('224440', '422244'); // 🟨🟩🟨⬜️🟩🟨
