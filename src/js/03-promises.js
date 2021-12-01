import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
  btn: document.querySelector("button"),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};



function createPromise({ index, timeDelay }) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({index, timeDelay});
      } else {
        reject({index, timeDelay});
      }
    }, timeDelay);
    
  });
  
};

refs.form.addEventListener('submit', onSubmit);

function amount({ delay, step, amount }) {
  let timeDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
    
    timeDelay += step;
    createPromise({ index, timeDelay })
      .then(({ index, timeDelay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${index} in ${timeDelay}ms`);
      })
      .catch(({ index, timeDelay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${index} in ${timeDelay}ms`);
      });
  };
};

function createDataObj() {
  const formData = new FormData(refs.form);

  const dataObj = {};
  formData.forEach((value, name) => {
    dataObj[name] = Number(value);
  });
  return dataObj;
};

function onSubmit(e) {
  e.preventDefault();
  
  amount(createDataObj());
};


