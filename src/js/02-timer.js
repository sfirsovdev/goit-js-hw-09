/**
 * Напиши скрипт таймера, который ведёт обратный 
 * отсчет до определенной даты.
 * 
 * установить библиотеку flatpickr +
 * написать рефы +
 * поставить слушатель на кнопку и добавить запуск таймера +
 * прописать запуск таймера +
 * добавить стили +
 * Напиши функцию addLeadingZero(value), 
  которая использует метод padStart() и 
  перед отрисовкой интефрейса форматируй значение. +
 */


import flatpickr from 'flatpickr'; 
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};


const INTERVAL_DELAY = 1000;
let choosedDates = null;
let deltaTime;


const options = {
  enableTime: true, //включает сборщик времени
  time_24hr: true, //Отображает указатель времени в 24-часовом режиме без выбора AM / PM, когда он включен.
  defaultDate: new Date(), //Устанавливает начальную выбранную дату (даты).
  minuteIncrement: 1, //Регулирует шаг ввода минут (включая прокрутку)
  onClose(selectedDates) { //метод onClose
   // console.log(selectedDates[0]);
      choosedDates = selectedDates[0];
      if (choosedDates <= new Date()) {
          Notify.warning("Please choose a date in the future");
          return;
      }
      refs.btnStart.disabled = false;
  },
};
flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', () => {
    startClick();
    refs.btnStart.disabled = true;
});

refs.btnStart.disabled = true;

function startClick() {
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        deltaTime = choosedDates - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        startTime({ days, hours, minutes, seconds });
        
        if (deltaTime < INTERVAL_DELAY) {
            clearInterval(intervalId);
        }
         
    }, INTERVAL_DELAY);
    
}

function startTime({ days, hours, minutes, seconds }) {   
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.btnStart.style =
(`width: 50px; 
height: 50px;
border-radius: 50%;
font-size: 15px;
background-color: pink;
color: rgb(120 35 150);
`);
refs.timer.style = (`font-size: 24px;
color: rgb(120 35 150);
`)