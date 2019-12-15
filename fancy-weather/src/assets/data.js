const temperatureValues = {
  celsius: 'C',
  fahrenheit: 'F',
};
const languages = {
  en: 'en',
  ru: 'ru',
  be: 'be',
};

const formatWeekDays = {
  fullName: 'full',
  shortName: 'short',
};

const translations = {
  layout: {
    theme: {
      en: 'change theme',
      ru: 'сменить тему',
      be: 'змянiць тэму',
    },
    city: {
      en: 'change city',
      ru: 'сменить город',
      be: 'змянiць горад',
    },
    geoData: {
      latitude: {
        en: 'latitude',
        ru: 'широта',
        be: 'шырата',
      },
      longitude: {
        en: 'longitude',
        ru: 'долгота',
        be: 'даўгата',
      },
    },
    weather: {
      humidity: {
        en: 'humidity',
        ru: 'влажность',
        be: 'вiльготнасць',
      },
      windSpeed: {
        en: 'wind speed',
        ru: 'скорость ветра',
        be: 'хуткасць ветра',
      },
      apparent: {
        en: 'apparent temperature',
        ru: 'ощущается как',
        be: 'адчуваецца як',
      },
    },
    inputError: {
      en: 'please input existing place',
      ru: 'введите корректное название населенного пункта',
      be: 'увядзіце карэктны населен пункт',
    },
  },
  weekday: {
    full: {
      en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      be: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца ', 'Субота'],
    },
    short: {
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      be: ['Нд', 'Пн', 'Аўт', 'Ср', 'Чц', 'Пт ', 'Сб'],
    },
  },
  month: {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    be: ['Студзень', 'Люты', 'Сакавiк', 'Красавiк', 'Травень', 'Чэрвень', 'Лiпень', 'Жнiвень', 'Верасень', 'Кастрычнiк', 'Лiстапад', 'Снежань'],
  },
  weather: {
    en: ['clear-day', 'clear-night', 'partly-cloudy-day', 'partly-cloudy-night', 'cloudy', 'rain', 'sleet', 'snow', 'wind', 'fog'],
    ru: ['Ясно', 'Ясная ночь', 'День, частичная облачность', 'Ночь, частичная облачность', 'Облачно', 'Дождь', 'Дождь со снегом', 'Снег', 'Сильный ветер', 'Туман'],
    be: ['Ясна', 'Ясная ноч', 'Дзень, частковая воблачнасць', 'Ноч, частковая воблачнасць', 'Воблачна ', 'Дождж', 'Дождж са снегам', 'Снег', 'Моцны вецер', 'Туман'],
  },
};
const seasons = {
  0: 'winter',
  1: 'winter',
  2: 'spring',
  3: 'spring',
  4: 'spring',
  5: 'summer',
  6: 'summer',
  7: 'summer',
  8: 'fall',
  9: 'fall',
  10: 'fall',
  11: 'winter',
};

const dayParts = ['night', 'morning', 'day', 'evening'];


export {
  temperatureValues,
  languages,
  translations,
  seasons,
  dayParts,
  formatWeekDays,
};
