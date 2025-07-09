const display = document.getElementById('display');
const liveResult = document.getElementById('live-result');
const standardButtons = document.querySelector('.standard-buttons');
const scientificButtons = document.querySelector('.scientific-buttons');
const toggleBtn = document.getElementById('toggle-mode');

let input = '';

toggleBtn.addEventListener('click', () => {
  const isStandard = !standardButtons.classList.contains('hidden');
  standardButtons.classList.toggle('hidden', isStandard);
  scientificButtons.classList.toggle('hidden', !isStandard);
});

function formatInput(str) {
  return str
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/ln/g, 'log')
    .replace(/\^/g, '**');
}

function calculateLiveResult() {
  try {
    const result = math.evaluate(formatInput(input));
    liveResult.value = isFinite(result) ? `= ${result}` : '';
  } catch {
    liveResult.value = '';
  }
}

function updateDisplay(value) {
  if (value === 'C' || value === 'Escape') {
    input = '';
    display.value = '';
    liveResult.value = '';
  } else if (value === '=' || value === 'Enter') {
    try {
      const result = math.evaluate(formatInput(input));
      input = result.toString();
      display.value = input;
      liveResult.value = '';
    } catch {
      display.value = 'Error';
      input = '';
    }
  } else if (value === 'Backspace') {
    input = input.slice(0, -1);
    display.value = input;
    calculateLiveResult();
  } else if (/^[\d+\-*/().^π√]|sin|cos|tan|log|ln|e$/.test(value)) {
    if (["sin", "cos", "tan", "log", "ln", "√"].includes(value)) {
      input += value + '(';
    } else {
      input += value;
    }
    display.value = input;
    calculateLiveResult();
  }
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    updateDisplay(value);
  });
});

document.addEventListener('keydown', e => {
  updateDisplay(e.key);
});
