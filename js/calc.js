document.addEventListener("DOMContentLoaded", function () {

  let a = '';
  let b = '';
  let sign = '';
  let finish = false;
  let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',];
  let signs = ['/', 'x', '-', '+'];
  let result = 0;

  let screen = document.querySelector('.calc-screen');
  let ac = document.querySelector('.ac');
  let buttons = document.querySelector('.calc-buttons');
  let results = document.querySelector('.result');
  let screenStyle = document.querySelector('.calc-screen');
  function updateScreen(arq) {
    screen.innerHTML = arq;
    let len = screenStyle.textContent;
    smallFz(len);
  }

  function clearAll() {
    screen.innerHTML = '0';
    a = '';
    b = '';
    sign = '';
    finish = false;
    smallFz('1');
  }
  function smallFz(l) {
    if (l.length > 10) {
      screenStyle.classList.add('fz');
    } else if (l.length < 10) {
      screenStyle.classList.remove('fz');
    }
  }
  smallFz(a);

  buttons.addEventListener('click', function (event) {
    if (!event.target.classList.contains('btn')) {
      return;
    }
    if (event.target.classList.contains('ac')) {
      clearAll();
    }
    const num = event.target.textContent;

    if (digits.includes(num)) {
      if (b === '' && sign === '') {
        a = a + num;
        smallFz(a);
        updateScreen(a);
      } else if (a !== '' && b !== '' && finish) {

      }
      else {
        b = b + num;
        updateScreen(b);
      }
    }

    if (signs.includes(num)) {
      sign = num;
      updateScreen(sign);
    }
    if(num === '='){
      switch (sign) {
        case '-':
          result = (+a) - (+b);
          updateScreen(result);
          a = `${result}`;
          b = '';
          sign = '';
          break;
        case '+':
          result = (+a) + (+b);
          updateScreen(result);
          a = `${result}`;
          b = '';
          sign = '';
          break;
        case 'x':
          result = (+a) * (+b);
          updateScreen(result);
          a = `${result}`;
          b = '';
          sign = '';
          break;
        case '/':
          if(b === '0'){
            result = 'ERROR';
            clearAll();
          }
          else{
            result = (+a) / (+b);
            result = result.toFixed(2); 
          }
          updateScreen(result);
          a = `${result}`;
          b = '';
          sign = '';
          break;
      }
    }
  });


});