const display = document.getElementById('display');
const liveResult = document.getElementById('live-result');
const buttons = document.querySelectorAll('button');

let input = '';

function calculateLiveResult(){
    try{
        const result = eval(input);
        liveResult.value = isFinite(result) ? ` ${result}` : '';
    }
    catch{
        liveResult.value = '';
    }
}

function highlightButton (key) {
  const btn = [...buttons].find(b =>
    b.textContent === key ||
    (key === 'Enter'   && b.textContent === '=') ||
    (key === 'Escape'  && b.textContent === 'C')
  );
  if (btn) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 120);
  }
}

function updateDisplay(value){
    if(value === 'C' || value === 'Escape'){
        input = '';
        display.value = '';
        liveResult.value = '';
    }
    else if (value === '=' || value === 'Enter'){
        try{
            input = eval(input).toString();
            display.value = input;
        }
        catch{
            display.value = "Error";
            input = '';
        }
    }
    else if(value === 'Backspace'){
        input = input.slice(0, -1);
        display.value = input;
        calculateLiveResult();
    }
    else if(/[\d+\-*/.]/.test(value)){
        input += value;
        display.value = input;
        calculateLiveResult();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        updateDisplay(value);
    });
});
document.addEventListener('keydown', e =>{
    updateDisplay(e.key);
    highlightButton(e.key);
});