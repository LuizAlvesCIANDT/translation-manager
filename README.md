# Translation Manager CLI

A command-line tool to manage i18n translation files by converting them between a structured JSON format and an XLSX spreadsheet.

This tool simplifies the translation workflow by allowing non-technical team members (like translators or project managers) to work with familiar spreadsheet software, while developers can easily integrate the results back into a JSON-based application structure.

## Features

-   **Export (JSON to XLSX)**: Converts a nested translation JSON file into a clean, easy-to-use XLSX spreadsheet. All translation keys are listed in the first column, with each subsequent column representing a language.
-   **Import (XLSX to JSON)**: Converts a filled-out XLSX spreadsheet back into a structured JSON file.
-   **Difference Report**: During the import process, the tool compares the incoming spreadsheet data against a "base" JSON file and generates an interactive HTML report highlighting all changes. This makes it easy to review what was **added**, **removed**, or **modified**.
-   **Automatic Sorting**: Both keys and language codes are automatically sorted during the processes to ensure consistent output and clean diffs.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v16.x or later recommended)
-   npm (comes bundled with Node.js)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
## Usage

The tool provides two main commands: `export` and `import`.

### 1. Exporting JSON to a Spreadsheet

Use the `export` command to convert your main JSON translation file into an XLSX spreadsheet.
