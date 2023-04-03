const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const TIMER_INTERVAL_MS = 1000;

const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    clearInterval(intervalId);

    let remainingSeconds = seconds;

    const updateTimer = () => {
      const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
      const minutes = Math.floor((remainingSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
      const seconds = remainingSeconds % SECONDS_IN_MINUTE;

      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      const formattedTime =
          formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

      timerEl.textContent = formattedTime;

      if (remainingSeconds === 0) {
        clearInterval(intervalId);
      } else {
        remainingSeconds--;
      }
    };

    updateTimer();
    intervalId = setInterval(updateTimer, TIMER_INTERVAL_MS);
  };
};


const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
