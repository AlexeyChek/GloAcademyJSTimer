const hi = document.getElementById('hi'),
  day = document.getElementById('day'),
  time = document.getElementById('time'),
  newYear = document.getElementById('newYear');

const getDayTime = date => {
  const hour = date.getHours();
  if (hour > 18 && hour < 22) return 'Добрый вечер';
  if (hour >= 22 || hour < 6) return 'Доброй ночи';
  if (hour >= 6 && hour < 10) return 'Доброе утро';
  if (hour >= 10 && hour < 18) return 'Добрый день';
};

const getDayWeek = date => {
  const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return weekDays[date.getDay()];
};

const getDayByNewYear = date => {
  const newYearDate = new Date('1.1.2022').getTime();
  return Math.floor((newYearDate - date.getTime()) / 1000 / 60 / 60 / 24) + 1;
  // + 1 потому что сегодня ещё не закончилось
};

const getDayByNewYearText = date => {
  const days = getDayByNewYear(date);

  const num = ('' + days)[('' + days).length - 2];
  const lastNum = ('' + days)[('' + days).length - 1];

  if (num !== '1' && lastNum === '1') {
    return days + ' день';
  } else if (num !== '1' && lastNum > 1 && lastNum < 5) {
    return days + ' дня';
  } else {
    return days + ' дней';
  }
};

const update = () => {
  const date = new Date();
  hi.textContent = getDayTime(date);
  day.textContent = 'Сегодня: ' + getDayWeek(date);
  time.textContent = 'Текущее время: ' + date.toLocaleTimeString('en');
  newYear.textContent = 'До нового года осталось ' + getDayByNewYearText(date);
};

setInterval(update, 1000);
