const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");

/**
 * Converts a structured translation JSON object back into a worksheet format.
 * @param {object} jsonData The input JSON data, e.g., { "de-DE": { "translation": { ... } } }.
 * @returns {Array<Array<any>>} An array of arrays representing the sheet data.
 */
function convertJsonToSheetData(jsonData) {
  if (!jsonData || typeof jsonData !== "object") {
    throw new Error("Invalid JSON data provided. Expected an object.");
  }

  const locales = Object.keys(jsonData).sort();
  const allKeys = new Set();

  // First, gather all unique translation keys from all locales
  locales.forEach((locale) => {
    const translations = jsonData[locale]?.translation;
    if (translations) {
      Object.keys(translations).forEach((key) => allKeys.add(key));
    }
  });

  const sortedKeys = Array.from(allKeys).sort();

  // Create header row
  const headers = ["Key", "Description", ...locales];
  const data = [headers];

  // Create data rows
  sortedKeys.forEach((key) => {
    const row = [key, ""]; // Key in column A, Context in column B (empty)

    locales.forEach((locale) => {
      const translation = jsonData[locale]?.translation?.[key];
      // Add the translation value or an empty string if not found
      row.push(
        translation !== undefined && translation !== null ? translation : ""
      );
    });

    data.push(row);
  });

  return data;
}

/**
 * Main function to read a JSON file and export it to an XLSX spreadsheet.
 */
function main() {
  const [, , inputJsonPath, outputXlsxPath = "output.xlsx"] = process.argv;

  if (!inputJsonPath) {
    console.error("\n❌ Missing required arguments.");
    console.error(
      "Usage: node jsonToSheet.js <path/to/input.json> [path/to/output.xlsx]"
    );
    console.error(
      "Example: node jsonToSheet.js translations.json translations_spreadsheet.xlsx"
    );
    process.exit(1);
  }

  try {
    console.log(`🚀 Reading JSON file from "${inputJsonPath}"...`);
    const fileContent = fs.readFileSync(inputJsonPath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    console.log("⚙️  Converting JSON data to spreadsheet format...");
    const sheetData = convertJsonToSheetData(jsonData);

    // Create a new workbook and a new worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Translations");

    // Write the workbook to a file
    XLSX.writeFile(workbook, outputXlsxPath);

    console.log(`\n🎉 Process finished successfully!`);
    console.log(`Spreadsheet saved to: ${path.resolve(outputXlsxPath)}`);
  } catch (error) {
    console.error("\n❌ An error occurred during the process:", error.message);
    process.exit(1);
  }
}

main();
