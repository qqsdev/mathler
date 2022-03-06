document.addEventListener('DOMContentLoaded', () => {
  const attemptsElement = document.getElementById('attempts');
  const goalElement = document.getElementById('goal');
  const inputButtons = document.getElementsByClassName('inputBtn');
  const enterBtn = document.getElementById('enterBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const shareBtn = document.getElementById('shareBtn');

  const ATTEMPTS_COUNT = 6;
  const ATTEMPTS = [];
  const CLUES = { empty: [], wrong: [], correct: [] };
  const RESULT = [];

  const DIFFICULTY = MATH_PATTERNS.EASY;
  const SOLUTION_LENGTH = DIFFICULTY[0].length;

  let goal = 0; // Example: 51
  let solution = 0; // Example: '68/4*3'

  let currentAttemptIndex = 0;
  let currentAttemptRow = 0;
  let currentAttempt = null;

  function fillEmptyAttempts() {
    for (let i = 0; i < ATTEMPTS_COUNT; i++) {
      ATTEMPTS.push(new Array(SOLUTION_LENGTH));
    }

    currentAttempt = ATTEMPTS[currentAttemptRow];
    renderEmptyAttempts(attemptsElement, ATTEMPTS);
  }

  for (const inputButton of inputButtons) {
    inputButton.addEventListener('click', (event) =>
      inputHandler(event.target.innerHTML)
    );
  }

  deleteBtn.addEventListener('click', deleteHandler);
  enterBtn.addEventListener('click', enterHandler);
  shareBtn.addEventListener('click', shareHandler);
  document.addEventListener('keydown', keydownHandler);

  function shareHandler() {
    const newLine = '\r\n';
    const share = `${location.href}${newLine}${newLine}${RESULT.join(newLine)}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(share);
    }

    if (navigator.share) {
      navigator
        .share({ title: 'Mathler', text: share, url: location.href })
        .catch(console.error);
    }
  }

  function keydownHandler(event) {
    if (event.key === 'Enter') return enterHandler();
    if (event.key === 'Delete') return deleteHandler();
    if (event.key === 'Backspace') return deleteHandler();

    if (Number.isInteger(+event.key)) return inputHandler(event.key);
    if (event.key === '+') return inputHandler(event.key);
    if (event.key === '-') return inputHandler(event.key);
    if (event.key === '*') return inputHandler(event.key);
    if (event.key === '/') return inputHandler(event.key);
    if (event.key === '(') return inputHandler(event.key);
    if (event.key === ')') return inputHandler(event.key);
  }

  function inputHandler(text) {
    if (currentAttemptIndex >= SOLUTION_LENGTH) return;

    renderInputValue(
      attemptsElement,
      currentAttemptRow,
      currentAttemptIndex,
      text
    );

    currentAttempt[currentAttemptIndex++] = text;
  }

  function deleteHandler() {
    if (currentAttemptIndex == 0) return;

    currentAttempt[--currentAttemptIndex] = undefined;

    renderInputValue(
      attemptsElement,
      currentAttemptRow,
      currentAttemptIndex,
      undefined
    );
  }

  const success = (message) => ({ success: true, message });
  const fail = (message) => ({ success: false, message });

  function validateAttempt(attempt) {
    if (attempt.length < SOLUTION_LENGTH) {
      return fail('Not enough numbers');
    }

    try {
      if (eval(attempt) !== goal) {
        const message = `Every guess must equal ${goal} ... are you forgetting order of operations?`;
        return fail(message);
      }
    } catch (error) {
      console.warn('Something went wrong..', error);
      return fail('Something went wrong');
    }

    if (eval(attempt) === goal) {
      const colors = verifyInput(solution, currentAttempt);
      RESULT.push(colors.join(''));

      renderInputColors(attemptsElement, currentAttemptRow, colors);
      fillCLues(solution, currentAttempt, CLUES);
      renderClues();

      currentAttempt = ATTEMPTS[++currentAttemptRow];
      currentAttemptIndex = 0;

      if (attempt === solution) {
        const message = getRandom([
          'Great job!',
          'Awesome!',
          'Malades!',
          'Well done!',
        ]);
        return success(message);
      }

      return fail();
    }

    console.warn('Something went wrong..');
    return fail('Something went wrong...');
  }

  function enterHandler() {
    const attempt = currentAttempt.join('');
    const result = validateAttempt(attempt);

    if (!result) {
      console.warn('something went wrong..');
      return;
    }

    if (result.message) {
      notify(result.message);
    }
  }

  /*
   * render
   */

  function renderGoal() {
    goalElement.innerHTML = goal;
  }

  function renderClues() {
    for (const input of inputButtons) {
      input.className = 'inputBtn';

      const text = input.innerHTML;

      if (CLUES.correct.includes(text)) {
        input.classList.add('correct');
      } else if (CLUES.wrong.includes(text)) {
        input.classList.add('wrong');
      } else if (CLUES.empty.includes(text)) {
        input.classList.add('empty');
      }
    }
  }

  /**
   * Initializes new goal and restarts the game
   */
  function initNewGoal() {
    const calculation = generateCalculation(DIFFICULTY);
    console.log(`${calculation} = ${eval(calculation)}`);

    goal = eval(calculation);
    solution = calculation;

    ATTEMPTS.length = 0;
    CLUES.empty.length = 0;
    CLUES.wrong.length = 0;
    CLUES.correct.length = 0;

    currentAttemptIndex = 0;
    currentAttemptRow = 0;
    currentAttempt = null;

    fillEmptyAttempts();
    renderGoal();
  }

  // Start the game
  initNewGoal();
});
