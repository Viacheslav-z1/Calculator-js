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
  let plus = document.querySelector('.plus');

  function updateScreen(arq) {
    screen.innerHTML = arq;
    console.log(a, b, sign);
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
    if (l.length > 10 && l.length < 18) {
      screenStyle.classList.add('fz');
    }
    if (l.length < 10) {
      screenStyle.classList.remove('fz');
    }
    if (l.length > 18) {
      screenStyle.classList.add('fz-small');
    }
    if (l.length < 18) {
      screenStyle.classList.remove('fz-small');
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

      if (b === '' && sign === '' && !finish) {
        if (a.includes('.') && num === '.' || a.length > 15) {
          a += '';
        } else if (a === '' && num === '.') {
          a = `0.`;
          updateScreen(a);
        }
        else {
          a = a + num;
          smallFz(a);
          updateScreen(a);
        }
      } else if (a !== '' && sign!== '') {
        if (b.includes('.') && num === '.' || b.length > 15) {
          b += '';
        } else if (b === '' && num === '.') {
          b = `0.`;
          updateScreen(b);
        }
        else {
          b = b + num;
          smallFz(b);
          updateScreen(b);
        }
      } 
    }

    if (signs.includes(num)) {
      sign = num;
      updateScreen(sign);
    }

    if (num === '+/-') {
      if (a !== '' && a > 0 && b === '') {
        a = `-${a}`;
        updateScreen(a);
      }
      else if (a !== '' && a < 0 && b === '') {
        a = a.slice(1);
        updateScreen(a);
      }
      else if (a !== '' && b > 0 && b !== '') {
        b = `-${b}`;
        updateScreen(b);
      }
      else if (a !== '' && b < 0 && b !== '') {
        b = b.slice(1);
        updateScreen(b);
      }
    }






    if (num === '%') {
      if (a !== '' && b === '') {
        a = (+a) / 100;
        updateScreen(a);
      }
      if (a !== '' && b !== '') {
        b = (+b) / 100;
        updateScreen(b);
      }
    }

    if (num === '=') {
      createResult();
    }
    if (sign !== '' && b !== '' && finish) {
      createResult();
    }
  });

  function createResult() {
    switch (sign) {
      case '-':
        result = (+a) - (+b);
        updateScreen(result);
        a = `${result}`;
        b = '';
        sign = '';
        finish = true;
        break;
      case '+':
        result = (+a) + (+b);
        updateScreen(result);
        a = `${result}`;
        b = '';
        sign = '';
        finish = true;
        break;
      case 'x':
        result = (+a) * (+b);
        if (!Number.isInteger(result)) {
          result = result.toFixed(2);
        }
        updateScreen(result);
        a = `${result}`;
        b = '';
        sign = '';
        finish = true;
        break;
      case '/':
        if (b === '0') {
          result = 'ERROR';
          clearAll();
        }
        else {
          result = (+a) / (+b);
          if (result < 0 || !Number.isInteger(result)) {
            result = result.toFixed(2);
          }
        }
        updateScreen(result);
        a = `${result}`;
        b = '';
        sign = '';
        finish = true;
        break;
    }
  }


});