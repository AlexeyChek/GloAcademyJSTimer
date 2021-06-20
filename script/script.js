// Timer
function counTimer(deadLine) {
  const timerDays = document.getElementById('timer-days'),
    timerHours = document.getElementById('timer-hours'),
    timerMinutes = document.getElementById('timer-minutes'),
    timerSeconds = document.getElementById('timer-seconds'),
    dateStop = new Date(deadLine).getTime();

  function getTimeRemaining() {
    const dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor((timeRemaining / 60 / 60) % 24),
      days = Math.floor(timeRemaining / 60 / 60 / 24);
    return { timeRemaining, days, hours, minutes, seconds };
  }

  function updateClock() {
    const timer = getTimeRemaining();
    if (timer.timeRemaining > 0) {
      timerDays.textContent = timer.days < 10 ? '0' + timer.days : timer.days;
      timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
      timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
      timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
    } else {
      timerDays.textContent = '0';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
      clearInterval(intervalId);
    }
  }

  const intervalId = setInterval(updateClock, 1000);
}

counTimer('19 july 2021 22:00:00');
