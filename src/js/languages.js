export const dictionaries = {
  russian: ['время','точность','мысль','ритм','клавиша','практика','скорость','слово','строка','буква','память','фокус','тишина','навык','движение','работа','система','простота','свобода','идея','проект','задача','решение','деталь','человек','знание','вопрос','ответ','уровень','результат','форма','порядок','смысл','начало','точка','свет','пространство','шаг','темп','уверенность','внимание','привычка','развитие','техника','поток','спокойствие','возможность','качество','действие','интерес','пример','выбор','путь','цель','метод','экран','текст','палец','печать','тренировка'],
  english: ['time','accuracy','thought','rhythm','keyboard','practice','speed','word','line','letter','memory','focus','silence','skill','motion','work','system','simple','freedom','idea','project','task','solution','detail','human','knowledge','question','answer','level','result','shape','order','meaning','begin','point','light','space','step','pace','confidence','attention','habit','growth','technique','flow','calm','possible','quality','action','interest','example','choice','path','goal','method','screen','text','finger','typing','training']
};

const languageNames = { ru: 'russian', en: 'english' };
const dictionaryUrl = 'https://raw.githubusercontent.com/monkeytypegame/monkeytype/master/frontend/static/languages';
const loadedDictionaries = new Map();
const pendingDictionaries = new Map();

function getLanguageName(locale) {
  const code = String(locale || 'ru').toLowerCase().split(/[-_]/)[0];
  return languageNames[code] || languageNames.ru;
}

function getFallback(locale) {
  return dictionaries[getLanguageName(locale)];
}

export function preloadLanguage(locale) {
  const language = getLanguageName(locale);
  if (loadedDictionaries.has(language)) return Promise.resolve(loadedDictionaries.get(language));
  if (pendingDictionaries.has(language)) return pendingDictionaries.get(language);

  const request = fetch(`${dictionaryUrl}/${language}_10k.json`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data.words) || data.words.length === 0) {
        throw new Error("В словаре отсутствует массив words");
      }
      loadedDictionaries.set(language, data.words);
      return data.words;
    })
    .catch(error => {
      console.warn(`Не удалось загрузить словарь ${language}, используется встроенный:`, error);
      return getFallback(locale);
    })
    .finally(() => pendingDictionaries.delete(language));

  pendingDictionaries.set(language, request);
  return request;
}

export function createText(locale, count = 70, source) {
  const language = getLanguageName(locale);
  const wordsSource = source || loadedDictionaries.get(language) || getFallback(locale);
  const words = [];
  let previous = -1;

  for (let i = 0; i < count; i += 1) {
    let index;
    do index = Math.floor(Math.random() * wordsSource.length); while (index === previous && wordsSource.length > 1);
    previous = index;
    words.push(wordsSource[index]);
  }

  return words.join(' ');
}
