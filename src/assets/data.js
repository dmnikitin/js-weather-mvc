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
      be: 'увядзіце карэктны населены пункт',
    },
  },
  weekday: {
    all: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    full: {
      en: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      be: ['нядзеля', 'панядзелак', 'аўторак', 'серада', 'чацвер', 'пятніца ', 'субота'],
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
  seasons: {
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
  },
  dayParts: ['night', 'morning', 'afternoon', 'dusk'],
};

const errors = {
  THEME_LOADING_ERROR: 'THEME_LOADING_ERROR',
  WEATHER_LOADING_ERROR: 'WEATHER_LOADING_ERROR',
  GEODATA_LOADING_ERROR: 'GEODATA_LOADING_ERROR',
  MAP_LOADING_ERROR: 'MAP_LOADING_ERROR',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR',
  VOICE_RECOGNITION_ERROR: 'VOICE_RECOGNITION_ERROR',
  OTHER_ERROR: 'OTHER_ERROR',
  MESSAGE: 'Sorry, there was an error',
};

export {
  temperatureValues,
  languages,
  translations,
  formatWeekDays,
  errors,
};
