/** Напиши скрипт, который при сабмите формы 
 * вызывает функцию createPromise(position, delay) 
 * столько раз, сколько ввели в поле amount. 
 * При каждом вызове передай ей номер создаваемого 
 * промиса (position) и задержку учитывая введенную 
 * пользователем первую задержку (delay) и шаг (step).*/



import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.form')
};

refs.form.addEventListener('submit', formSubmit)

function formSubmit(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);
  
  for (let position = 0; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
         .catch(({ position, delay }) => {
           setTimeout(() => {
             Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
           }, delay);
         });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
    resolve(({ position, delay }))// Fulfill
  } else {
    reject(({ position, delay })) // Reject
  }
  })
}


    