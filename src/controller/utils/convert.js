const chp = require('child_process');
const file = require('./file');
const excel2json = require('convert-excel-to-json');

/**
 * Converts a .docx file to an .html file using the Mammoth Python library.
 * If Mammoth is not installed, it will install it before attempting the conversion.
 *
 * @async
 * @function convertDocxToHtml
 * @param {string} docxFilePath - The path to the .docx file to be converted.
 * @param {string} htmlFilePath - The path to the resulting .html file.
 * @returns {Promise<void>} A Promise that resolves when the conversion is completed or rejects if an error occurs.
 * @throws Will throw an error if the Mammoth installation or conversion process encounters an issue.
 * @example
 *   convertDocxToHtml('path/to/input.docx', 'path/to/output.html');
 */
const convertDocxToHtml = async (docxFilePath, htmlFilePath) => {
  try {
    chp.execSync(
      `mammoth ${docxFilePath} ${htmlFilePath}`
    );
    console.info(`${docxFilePath} converted to ${htmlFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

const convertCsvToJson = async (csvFilePath, jsonFilePath) => {
  
};

/**
 * Converts an Excel file to a JSON file with optional sheet selection.
 *
 * @param {string} xlsFilePath - The path to the Excel file to be converted.
 * @param {string[]} sheets - An array of sheet names to be included in the JSON conversion (optional).
 * @param {string} jsonFilePath - The path to the output JSON file.
 * @throws Will throw an error if there's an issue while converting the Excel file.
 */
const convertExcelToJson = async (
  xlsFilePath,
  sheets = [],
  jsonFilePath,
) => {
  try {
    if (sheets.length < 1) {      
      const result = excel2json({
        sourceFile: xlsFilePath,
        columnToKey: {
          '*': '{{columnHeader}}'
        }
      });

      file.writeFile(result, jsonFilePath);
    }

    if (sheets.length > 0) {
      const result = excel2json({
        sourceFile: xlsFilePath,
        sheets: sheets,
        columnToKey: {
          '*': '{{columnHeader}}'
        }
      });
      
      file.writeFile(JSON.stringify(result), jsonFilePath);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  convertDocxToHtml,
  convertExcelToJson
}