const fs = require("fs");

/**
 * Writes the content of a string to a file, overwriting the file if it already exists.
 *
 * @param {string} stringToFile - The string content to be written to the file.
 * @param {string} filePath - The path of the file to be written.
 */
const writeFile = (stringToFile, filePath) => {
  try {
    fs.rmSync(filePath);
    fs.writeFileSync(filePath, stringToFile);
  } catch (error) {
    fs.writeFileSync(filePath, stringToFile);
  }
}

/**
 * Downloads a file from the specified URL to the provided folder path.
 *
 * @param {string} url - The URL of the file to be downloaded.
 * @param {string} folderPath - The destination folder path where the downloaded file will be saved.
 * @returns {*} - The result of the download operation.
 */
const download = (url, folderPath) => {
  try {    
    const result = chp.execSync(`wget ${url}`, { cwd: folderPath });
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  writeFile,
  download
}