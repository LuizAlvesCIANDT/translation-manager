#!/usr/bin/env node

// Changed from require
import fs from "fs/promises";
import path from "path";

// Changed from require. IMPORTANT: Added .js extension
import { convertJsonToSheetData } from "./features/convertJsonToSheetData.js";
import { createSpreadsheet } from "./features/createSpreadsheet.js";
import { sortTranslationsObject } from "./features/sort.js";

// With ES Modules, we can use top-level await, simplifying the main() wrapper.
try {
  const [, , inputJsonPath, outputXlsxPath = "output/output.xlsx"] = process.argv;

  if (!inputJsonPath) {
    console.error("\n❌ Missing required arguments.");
    console.error(
      "Usage: npm run export <path/to/input.json> [path/to/output.xlsx]"
    );
    process.exit(1);
  }

  console.log("🚀 Starting export process...");

  console.log(`[1/3] Reading and sorting "${inputJsonPath}"...`);
  const inputFileContent = await fs.readFile(inputJsonPath, "utf-8");
  const jsonData = JSON.parse(inputFileContent);
  const sortedJsonData = sortTranslationsObject(jsonData);

  console.log("[2/3] Converting JSON to sheet data format...");
  const sheetData = convertJsonToSheetData(sortedJsonData);

  console.log(`[3/3] Writing spreadsheet to "${outputXlsxPath}"...`);
  createSpreadsheet({
    sheetData: sheetData,
    outputPath: outputXlsxPath,
    sheetName: "Translations",
  });

  console.log(`\n🎉 Process finished successfully!`);
  console.log(`Spreadsheet saved to: ${path.resolve(outputXlsxPath)}`);
} catch (error) {
  console.error("\n❌ An error occurred:", error.message);
  process.exit(1);
}
