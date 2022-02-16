type languages = 'ua' | 'rus' | 'eng';
interface ITranslationParse<T> {
  translations: {
    [key in languages]: T;
  };
}
export function parseTranslation<T extends ITranslationParse<K>, K>(
  list: T[],
  language: languages
) {
  return list.map(({ translations, ...course }) => ({
    ...course,
    ...translations[language],
  }));
}
