import fs from "fs";
import XLSX from "xlsx";

/**
 * Reads an XLSX file and converts a specific sheet into a structured JSON object.
 */
// Changed to async arrow function
const spreadsheetToJson = async (xlsxPath, sheetNameArg) => {
  if (!fs.existsSync(xlsxPath)) {
    throw new Error(`File not found: ${xlsxPath}`);
  }

  const workbook = XLSX.readFile(xlsxPath);
  const sheetName = sheetNameArg || workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(
      `Sheet "${sheetName}" not found in file. Available sheets: ${workbook.SheetNames.join(
        ", "
      )}`
    );
  }

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false });

  if (!data || data.length === 0) {
    console.warn(`Warning: Sheet "${sheetName}" is empty.`);
    return {};
  }

  const headers = data[0];
  const rows = data.slice(1);
  const exportObj = {};

  for (let col = 2; col < headers.length; col++) {
    const localeName = headers[col];
    if (!localeName) continue;

    const translationData = {};
    for (const row of rows) {
      const key = row[0];
      if (key) {
        const value = row[col];
        translationData[key] =
          value === undefined || value === null ? "" : value;
      }
    }

    exportObj[localeName] = { translation: translationData };
  }

  return exportObj;
};

export { spreadsheetToJson };
