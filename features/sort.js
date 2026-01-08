/**
 * Sorts a translation object by its top-level locale keys and then by the keys
 * within each locale's `translation` object.
 * The 'en-US' locale is always placed first.
 */
const sortTranslationsObject = (data) => {
  if (!data || typeof data !== "object") {
    return {};
  }

  const sortedLocales = {};
  // Get the locale keys and apply a custom sort
  const localeKeys = Object.keys(data).sort((a, b) => {
    // Rule: 'en-US' always comes first.
    if (a === "en-US") return -1;
    if (b === "en-US") return 1;

    // Rule: For all other locales, sort alphabetically.
    return a.localeCompare(b);
  });

  localeKeys.forEach((locale) => {
    const localeData = data[locale] || {};
    const translations = localeData.translation || {};
    const sortedTranslation = {};
    const translationKeys = Object.keys(translations).sort();

    translationKeys.forEach((key) => {
      sortedTranslation[key] = translations[key];
    });

    sortedLocales[locale] = {
      ...localeData,
      translation: sortedTranslation,
    };
  });

  return sortedLocales;
};

export { sortTranslationsObject };
