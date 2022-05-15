/**Напиши скрипт, который после нажатия кнопки «Start», 
 * раз в секунду меняет цвет фона <body> на случайное 
 * значение используя инлайн стиль. При нажатии на кнопку 
 * «Stop», изменение цвета фона должно останавливаться.

⚠️ Учти, на кнопку «Start» можно нажать бесконечное 
количество раз. Сделай так, чтобы пока изменение темы 
запушено, кнопка «Start» была не активна (disabled).

Для генерации случайного цвета используй функцию 
getRandomHexColor.
 */


const INTERVAL_DELAY = 1000; //через сколько меняется цвет
let intervalId = null; // идентификатор интервала

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]')
};
refs.btnStart.addEventListener('click', onIntervalClick); 
refs.btnStop.addEventListener('click', onStopClick);

//refs.btnStop.setAttribute = ('disabled', 'true');
//refs.btnStop.disabled = true;

//стиль кнопок
refs.btnStart.style = (`color: white; border-radius: 30%; background: tomato;`);
refs.btnStop.style = (`color: white; border-radius: 30%; background: tomato;`) 

function onIntervalClick() { 
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);
  refs.btnStop.disabled = false;
  refs.btnStart.disabled = true;
  
}

function onStopClick() {
  clearInterval(intervalId);
  //refs.btnStop.setAttribute = ('disabled', '');
  //refs.btnStart.setAttribute = ('disabled', 'true');
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * element.setAttribute(name, value);
name - имя атрибута (строка).
value  - значение атрибута.

 */
