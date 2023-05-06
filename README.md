# kunla-utils

`kunla-utils` is a utility package that provides a set of helpful functions for array manipulation, file conversion, file manipulation, object manipulation, and string manipulation. This package is designed to make working with various data formats and string transformations easier and more efficient.

## Installation

\`\`\`sh
npm install kunla-utils
\`\`\`

## Usage

\`\`\`js
const kunlaUtils = require("kunla-utils");
\`\`\`

## Modules

### 1. Array Utils

Functions for manipulating arrays.

#### Functions:

- `changeObjectKeyIdentificator(array=[], keysToChangeIdentificators=[])`
- `removeObjectByKeyValue(arrayOfObjects = [], keyValue = [], logicalOperator = "or")`
- `removeObjectPropertyByKeyIdentificator(array = [], keyIdentificator = [])`
- `keepObjectPropertyByKeyIdentificator(array = [], keyIdentificators = [])`
- `keepObjectByKeyValue(arrayOfObjects = [], keyValue = [], logicalOperator = "or")`
- `matchObjectsByKeyValueAndAddKeysToMerge(arrayThatIsChanged, arrayThatChanges, keyValuesToMatch, keysToMerge, logicalOperator = "AND")`
- `matchObjectsByKeyValueAndMerge(arrayThatIsOverwrited, arrayThatOverwrites, keyValuesToMatch, logicalOperator = "AND")`
- `matchObjectsByKeyValueAndCreateNewArray(arrayToMatch, arrayToBecomeTheNew, keyValuesToMatch, logicalOperator = "AND")`
- `unmatchObjectsByKeyValueAndMerge(arrayThatIsOverwrited, arrayThatOverwrites, keyValuesToMatch, logicalOperator = "AND")`
- `unmatchObjectsByKeyValueAndCreateNewArray(arrayToMatch, arrayToBecomeTheNew, keyValuesToMatch, logicalOperator = "AND")`
- `removeByValue(array = [], value = [])`
- `removeRepeatedValues(array = [])`
- `createArrayOverFolderFiles(folderPath)`

### 2. Conversion Utils

Functions for converting between different file formats.

#### Functions:

- `convertDocxToHtml(docxFilePath, htmlFilePath)`
- `convertCsvToJson(csvFilePath, jsonFilePath)`
- `convertXlsToJson(xlsFilePath, xlsFileSheet, jsonFilePath)`
- `convertExcelToJson(xlsFilePath, sheets, jsonFilePath)`

### 3. File Utils

Functions for file manipulation, such as writing and downloading.

#### Functions:

- `writeFile(stringToFile, filePath)`
- `download(url, folderPath)`

### 4. Object Utils

Functions for manipulating objects, such as changing property value types.

#### Functions:

- `changePropertiesValueType(objectToChange, propertiesTypesToChange)`

### 5. String Utils

Functions for transforming and manipulating strings.

#### Functions:

- `pascalfy(text)`
- `kebabfy(text)`
- `pluralize(text)`
- `singularize(text)`

## Examples

### Sort an array of objects

\`\`\`js
const { sortArray } = require("kunla-utils");
const array = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

const sortedArray = sortArray(array, "age");
console.log(sortedArray); // [{ name: "Bob", age: 25 }, { name: "Alice", age: 30 }, { name: "Charlie", age: 35 }]
\`\`\`

### Convert .docx to .html

\`\`\`js
const { convertDocxToHtml } = require("kunla-utils");
convertDocxToHtml("path/to/input.docx", "path/to/output.html");
\`\`\`

### Write content to a file

\`\`\`js
const { writeFile } = require("kunla-utils");
writeFile("Hello, World!", "path/to/output.txt");
\`\`\`

### Change object properties value type

\`\`\`js
const { changePropertiesValueType } = require("kunla-utils");
const obj = {
  age: "42",
  isActive: "true",
  name: "John Doe",
};

const propertiesTypesToChange = [
  { property: "age", newType: "number" },
  { property: "isActive", newType: "boolean" },
];

changePropertiesValueType(obj, propertiesTypesToChange).then((newObj) => {
  console.log(newObj); // { age: 42, isActive: true, name: "John Doe" }
});
\`\`\`


### Convert text to PascalCase

\`\`\`js
const { pascalfy } = require("kunla-utils");
const text = "hello world";
const pascalCase = pascalfy(text);
console.log(pascalCase); // "HelloWorld"
\`\`\`

## License

MIT
