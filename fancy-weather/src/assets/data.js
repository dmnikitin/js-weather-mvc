const temperatureValues = {
  celsius: 'celcius',
  fahrenheit: 'fahrenheit',
};
const languages = {
  eng: 'eng',
  ru: 'ru',
  by: 'by',
};

const translations = {
  layout: {
    theme: {
      eng: 'change theme',
      ru: 'сменить тему',
      by: 'змянiць тэму',
    },
    city: {
      eng: 'change city',
      ru: 'сменить город',
      by: 'змянiць горад',
    },
  },
  weekday: {
    eng: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    by: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца ', 'Субота'],
  },
  month: {
    eng: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    by: ['Студзень', 'Люты', 'Сакавiк', 'Красавiк', 'Травень', 'Чэрвень', 'Лiпень', 'Жнiвень', 'Верасень', 'Кастрычнiк', 'Лiстапад', 'Снежань'],
  },
  weather: {
    eng: ['clear-day', 'clear-night', 'partly-cloudy-day', 'partly-cloudy-night', 'cloudy', 'rain', 'sleet', 'snow', 'wind', 'fog'],
    ru: ['Ясно', 'Ясная ночь', 'День, частичная облачность', 'Ночь, частичная облачность', 'Облачно', 'Дождь', 'Дождь со снегом', 'Снег', 'Сильный ветер', 'Туман'],
    by: ['Ясна', 'Ясная ноч', 'Дзень, частковая воблачнасць', 'Ноч, частковая воблачнасць', 'Воблачна ', 'Дождж', 'Дождж са снегам', 'Снег', 'Моцны вецер', 'Туман'],
  },
};


export {
  temperatureValues,
  languages,
  translations,
};
