import XLSX from "xlsx";

/**
 * Creates and writes an XLSX spreadsheet file from a 2D data array.
 * @param {object} options - The options for creating the spreadsheet.
 */
const createSpreadsheet = ({
  sheetData,
  outputPath,
  sheetName = "Translations",
}) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  XLSX.writeFile(workbook, outputPath);
};

export { createSpreadsheet };
