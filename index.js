import { spawn } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Prints the help message for the command-line tool.
 */
const printHelp = () => {
  console.log("\n📖 Translation Manager - Help");
  console.log("---------------------------------");
  console.log("\nAvailable Commands:");
  console.log(
    "  ▫ export   - Converts a JSON translations file to an XLSX spreadsheet."
  );
  console.log(
    "  ▫ import   - Converts an XLSX spreadsheet back into JSON files and creates a diff report."
  );
  console.log("\nExamples:");
  console.log(
    "  $ npm run export ./src/translations/all.json translations.xlsx"
  );
  console.log(
    "  $ npm run import ./translations.xlsx 'Translations' ./base.json"
  );
};

const command = process.argv[2];
const args = process.argv.slice(3);

/**
 * Executes a sub-script as a child process.
 * @param {string} scriptName The name of the script file to run.
 */

const runScript = (scriptName) => {
  const scriptPath = path.join(__dirname, scriptName);
  // The callback here is also an arrow function
  const child = spawn("node", [scriptPath, ...args], { stdio: "inherit" });

  child.on("error", (err) => {
    console.error(`\n❌ Failed to start script: ${scriptName}`, err);
  });
};

switch (command) {
  case "export":
    runScript("exportFromTranslations.js");
    break;

  case "import":
    runScript("importFromSpreadsheet.js");
    break;

  default:
    console.error(`\n❌ Unknown command: "${command || "none provided"}"`);
    printHelp();
    process.exit(1);
}
