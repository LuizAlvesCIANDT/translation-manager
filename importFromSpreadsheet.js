import fs from "fs/promises";
import path from "path";

import { createDiffReport } from "./features/diffReport.js";
import { sortTranslationsObject } from "./features/sort.js";
import { spreadsheetToJson } from "./features/spreadsheetToJson.js";

try {
  const [
    ,
    ,
    spreadsheetPath,
    sheetName,
    baseJsonPath,
    outputJsonFile = "output/translations.json",
    diffReportFile = "output/diff_report.json",
  ] = process.argv;

  if (!spreadsheetPath || !sheetName || !baseJsonPath) {
    console.error("\n❌ Missing required arguments.");
    console.error(
      "Usage: npm run import <spreadsheet_path> <sheet_name> <base_json_path> [output_json_path] [diff_report_path]"
    );
    console.error(
      "Example: npm run import ./input/spreadsheet.xlsx 'Soundstage - 0801 + Mojave and ' input/translations.json"
    );
    process.exit(1);
  }

  console.log("🚀 Starting the import and diffing process...");

  console.log(
    `[1/4] Reading sheet "${sheetName}" from "${spreadsheetPath}"...`
  );
  const newUnsortedData = await spreadsheetToJson(spreadsheetPath, sheetName);
  console.log("✅ Spreadsheet to JSON conversion complete.");

  console.log(`[2/4] Sorting newly converted data...`);
  const sortedNewData = sortTranslationsObject(newUnsortedData);
  await fs.writeFile(outputJsonFile, JSON.stringify(sortedNewData, null, 2));
  console.log(
    `✅ Sorted JSON from spreadsheet saved to: ${path.resolve(outputJsonFile)}`
  );

  console.log(`[3/4] Reading and sorting base file "${baseJsonPath}"...`);
  const baseFileContent = await fs.readFile(baseJsonPath, "utf-8");
  const baseJsonData = JSON.parse(baseFileContent);
  const sortedBaseData = sortTranslationsObject(baseJsonData);
  console.log("✅ Base file sorted successfully.");

  console.log(
    "[4/4] Generating difference report by comparing new data against the base..."
  );
  const diffReport = createDiffReport(sortedBaseData, sortedNewData);

  // Assuming you want the diff report to be a JSON file that the HTML report can load.
  const diffReportJsonPath = diffReportFile.endsWith(".html")
    ? diffReportFile.replace(".html", ".json")
    : `${diffReportFile}`;

  await fs.writeFile(diffReportJsonPath, JSON.stringify(diffReport, null, 2));
  console.log("✅ Report generation complete.");

  console.log(`\n🎉 Process finished successfully!`);
  console.log(
    `Difference report data saved to: ${path.resolve(diffReportJsonPath)}`
  );
} catch (error) {
  console.error("\n❌ An error occurred during the process:", error.message);
  process.exit(1);
}
