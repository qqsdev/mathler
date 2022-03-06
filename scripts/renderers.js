const COLOR_MAPS = {
  [EMPTY]: 'empty',
  [WRONG]: 'wrong',
  [CORRECT]: 'correct',
};

/**
 * Fills empty inputs
 * @param {HtmlElement} attemptsElement
 * @param {string[][]} attempts
 */
function renderEmptyAttempts(attemptsElement, attempts) {
  for (const attempt of attempts) {
    const wrapper = document.createElement('div');

    for (const input of attempt) {
      const button = document.createElement('button');
      wrapper.appendChild(button);
    }

    attemptsElement.appendChild(wrapper);
  }
}

/**
 * Fills single input
 * @param {HtmlElement} attemptsElement
 * @param {number} row
 * @param {number} column
 * @param {string?} value
 * @param {string?} color
 */
function renderInputValue(attemptsElement, row, column, value) {
  const input = attemptsElement.children[row].children[column];

  input.innerHTML = value || '';
}

/**
 * 
 * @param {HtmlElement} attemptsElement 
 * @param {number} row 
 * @param {string[]} colors 
 */
function renderInputColors(attemptsElement, row, colors) {
  const inputs = attemptsElement.children[row].children;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const color = colors[i];

    if (COLOR_MAPS[color]) {
      input.classList.add(COLOR_MAPS[color]);
    }
  }
}
