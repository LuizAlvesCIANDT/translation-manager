/**
 * @file This module provides a pure function to convert a structured translation
 * JSON object into a 2D array suitable for a spreadsheet.
 */

/**
 * Converts a structured translation JSON object into a 2D array format for a worksheet.
 *
 * @param {object} jsonData The input JSON data, e.g., { "de-DE": { "translation": { ... } } }.
 * @returns {Array<Array<any>>} An array of arrays representing the sheet data.
 */

const convertJsonToSheetData = (jsonData) => {
  if (!jsonData || typeof jsonData !== "object") {
    throw new Error("Invalid JSON data provided. Expected an object.");
  }

  const locales = Object.keys(jsonData).sort();
  const allKeys = new Set();

  locales.forEach((locale) => {
    const translations = jsonData[locale]?.translation;
    if (translations) {
      Object.keys(translations).forEach((key) => allKeys.add(key));
    }
  });

  const sortedKeys = Array.from(allKeys).sort();

  const headers = ["Key", "Description", ...locales];
  const data = [headers];

  sortedKeys.forEach((key) => {
    const row = [key, ""];
    locales.forEach((locale) => {
      const translation = jsonData[locale]?.translation?.[key];
      row.push(
        translation !== undefined && translation !== null ? translation : ""
      );
    });
    data.push(row);
  });

  return data;
};

export { convertJsonToSheetData };
