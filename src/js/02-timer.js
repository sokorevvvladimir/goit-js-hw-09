import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    start: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  onClose(selectedDates) {
    
    if (selectedDates[0].getTime() < Date.now()) {
        const message = "Please choose a date in the future";
        Notiflix.Notify.failure(message);;
      } else {
        refs.start.disabled = false;
        
        refs.start.addEventListener('click', () => {
            timerId = setInterval(() => { finalCountdown() }, 1000)
        });

        function finalCountdown() {
            const diff = selectedDates[0].getTime() - Date.now();
            const res = convertMs(diff);
            
            refs.days.textContent = res.days;
            refs.hours.textContent = res.hours;
            refs.minutes.textContent = res.minutes;
            refs.seconds.textContent = res.seconds;

            if (refs.days.textContent === "00" && refs.hours.textContent === "00" && refs.minutes.textContent === "00" && refs.seconds.textContent === "00") {
                clearInterval(timerId);
            }
        }
      };
      
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

