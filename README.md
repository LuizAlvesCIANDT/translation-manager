# Translation Manager CLI

A command-line tool to manage i18n translation files by converting them between a structured JSON format and an XLSX spreadsheet.

This tool simplifies the translation workflow by allowing non-technical team members (like translators or project managers) to work with familiar spreadsheet software, while developers can easily integrate the results back into a JSON-based application structure.

## Features

- **Export (JSON to XLSX)**: Converts a nested translation JSON file into a clean, easy-to-use XLSX spreadsheet. All translation keys are listed in the first column, with each subsequent column representing a language.
- **Import (XLSX to JSON)**: Converts a filled-out XLSX spreadsheet back into a structured JSON file.
- **Difference Report**: During the import process, the tool compares the incoming spreadsheet data against a "base" JSON file and generates an interactive HTML report highlighting all changes. This makes it easy to review what was **added**, **removed**, or **modified**.
- **Automatic Sorting**: Both keys and language codes are automatically sorted during the processes to ensure consistent output and clean diffs.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- npm (comes bundled with Node.js)

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

### 2. Importing a Spreadsheet to JSON

Use the `import` command to convert your XLSX spreadsheet back into JSON files. During this process, a difference report will be generated.

### 3. Reviewing Changes with report.html

As part of the `import` process, the tool generates a `report.html` file, which provides an interactive and user-friendly interface for reviewing all translation changes. This report is designed to be shared with project managers, translators, or developers to validate modifications without needing to check raw file diffs.

![alt text](report.png)

**Key functionalities:**

- **Clear Overview**: Changes are categorized into **Added**, **Removed**, and **Changed** sections, each with a total count for a quick summary.
- **Dynamic Filtering**: A search bar allows you to instantly filter all items by key or value, making it easy to find specific translations.
- **Side-by-Side Comparison**: For modified items, the report displays the old and new values next to each other, clearly highlighting the changes.
- **Flexible Data Loading**: The report can automatically load data from a `data.json` file placed in the same directory. Alternatively, you can load any JSON report file from your computer or fetch it from a URL directly within the page.
- **Standalone and Shareable**: It's a single, self-contained HTML file that runs in any modern browser without needing a server, making it easy to archive and share.
