const chp = require("child_process");

/**
 * Changes the key identificators in objects within an array based on the provided key mappings.
 *
 * @param {Array} array - The array of objects with keys to change.
 * @param {Array} keysToChangeIdentificators - An array containing objects with two properties:
 *                                             1. originalKeysIdentificators - an array of original key names.
 *                                             2. newKeysIdentificators - an array of new key names to replace the originals.
 * @returns {Array} The array of objects with updated key identificators.
 * @throws Will log an error if there is a problem during the process.
 */
const changeObjectKeyIdentificator = (
  array = [],
  keysToChangeIdentificators = []
) => {
  try {    
    array.forEach((object) => {
      keysToChangeIdentificators[0].originalKeysIdentificators.forEach((keyToChangeIdentificator, index) => {
        for (const key in object) {
          const i = index;
          if (Object.hasOwnProperty.call(object, key)) {
            if (key === keyToChangeIdentificator) {
              object[keysToChangeIdentificators[1].newKeysIdentificators[i]] = object[key];
              delete object[key];
            }
          }
        }
      });
    });
    return array;
  } catch (error) {
    console.error(error);
  }
};

/**
 * This function takes an array of objects and removes the objects that match the specified key-value pairs.
 * The logical operator determines how multiple key-value pairs should be treated (either "or" or "and").
 *
 * @param {Object[]} arrayOfObjects - An array of objects to filter.
 * @param {Object[]} keyValue - An array of objects, each containing a single key-value pair to match.
 * @param {string} logicalOperator - The logical operator to apply when matching multiple key-value pairs. Accepted values: "or", "and". Default: "or".
 * @returns {Object[]} A new array of objects with the matching objects removed.
 * @throws {Error} If the logical operator is not valid, an error is thrown.
 *
 * @example
 * const data = [
 *   { id: 1, name: "Alice", age: 30 },
 *   { id: 2, name: "Bob", age: 40 },
 *   { id: 3, name: "Alice", age: 50 }
 * ];
 *
 * const keyValues = [
 *   { name: "Alice" },
 *   { age: 30 }
 * ];
 *
 * const filteredData = removeObjectByKeyValue(data, keyValues, "or");
 * console.log(filteredData); // Output: [ { id: 2, name: 'Bob', age: 40 } ]
 */
const removeObjectByKeyValue = (
  arrayOfObjects = [],
  keyValue = [],
  logicalOperator = "or"
) => {
  if (logicalOperator !== "or" && logicalOperator !== "and") {
    throw new Error("Not a valid logical operator parameter");
  }

  return arrayOfObjects.filter((obj) => {
    const matchCounts = keyValue.map((keyValPair) => {
      return Object.entries(keyValPair).filter(([key, value]) => {
        return obj.hasOwnProperty(key) && obj[key] === value;
      }).length;
    });

    const totalMatches = matchCounts.reduce((acc, count) => acc + count, 0);

    if (logicalOperator === "or") {
      return totalMatches === 0;
    } else if (logicalOperator === "and") {
      return totalMatches !== keyValue.length;
    }
  });
};

/**
 * Removes specified object properties within an array of objects based on provided key identificators.
 *
 * @param {Array} array - The array of objects with properties to remove.
 * @param {Array} keyIdentificator - An array of key identificators to be removed from objects.
 * @returns {Array} The array of objects with specified properties removed.
 * @throws Will log an error if there is a problem during the process.
 */
const removeObjectPropertyByKeyIdentificator = (array = [], keyIdentificator = []) => {
  try {
    keyIdentificator.map((keyToRemove) => {
      array.map((object) => {
        for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
            if (key == keyToRemove) {
              delete object[key];
            }
          }
        }
      })
    });
    return array;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Keeps only specified object properties within an array of objects based on provided key identificators.
 *
 * @param {Array} array - The array of objects to process.
 * @param {Array} keyIdentificators - An array of key identificators to be kept within objects.
 * @returns {Array} A new array of objects containing only the specified properties.
 * @throws Will log an error if there is a problem during the process.
 */
const keepObjectPropertyByKeyIdentificator = (array = [], keyIdentificators = []) => {
  try {
    const newArray = [];
    array.forEach((object) => {
      const objectTemp = {};
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const element = object[key];
          keyIdentificators.forEach((keyIdentificator) => {
            if (key === keyIdentificator) {
              objectTemp[keyIdentificator] = element;
            }
          });
        }
      }
      newArray.push(objectTemp);
    });
    return newArray;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Returns an array of objects containing only the objects that match the specified key-value pairs.
 * 
 * @param {object[]} arrayOfObjects - The array of objects to filter by key-value pairs.
 * @param {object[]} keyValue - The array of key-value pairs to filter by.
 * @param {string} [logicalOperator="or"] - The logical operator to use for matching ("or" or "and").
 * @throws {Error} Throws an error if the logical operator parameter is not valid.
 * @returns {object[]} The filtered array of objects.
 */
const keepObjectByKeyValue = (
  arrayOfObjects = [],
  keyValue = [],
  logicalOperator = "or"
) => {
  if (logicalOperator !== "or" && logicalOperator !== "and") {
    throw new Error("Not a valid logical operator parameter");
  }

  return arrayOfObjects.filter((obj) => {
    const matchCounts = keyValue.map((keyValPair) => {
      return Object.entries(keyValPair).filter(([key, value]) => {
        return obj.hasOwnProperty(key) && obj[key] === value;
      }).length;
    });

    const totalMatches = matchCounts.reduce((acc, count) => acc + count, 0);

    if (logicalOperator === "or") {
      return totalMatches > 0;
    } else if (logicalOperator === "and") {
      return totalMatches === keyValue.length;
    }
  });
};

/**
 * Matches objects from two arrays based on the given key values, and adds specified keys to merge.
 * 
 * @param {Array} arrayThatIsChanged - The array whose objects will be changed.
 * @param {Array} arrayThatChanges - The array whose objects will change the first array.
 * @param {Array} keyValuesToMatch - The key values to match between the objects of the arrays.
 * @param {Array} keysToMerge - The keys to merge from the objects of the second array to the objects of the first array.
 * @param {string} logicalOperator - The logical operator to use for matching ("AND" or "OR"). Default is "AND".
 * @returns {Array} - The resulting array with matched objects and merged keys.
 */
const matchObjectsByKeyValueAndAddKeysToMerge = (
  arrayThatIsChanged,
  arrayThatChanges,
  keyValuesToMatch,
  keysToMerge,
  logicalOperator = "AND"
) => {
  const result = [];

  arrayThatIsChanged.forEach((obj1) => {
    arrayThatChanges.forEach((obj2) => {
      if (logicalOperator.toUpperCase() === "AND") {
        keyValuesToMatch.every((key) => {
          if (key.dataFormat) {
            switch (key.dataFormat.option) {
              case 'substring':
                if (obj1[key.originalIdentificator].substring(key.dataFormat.start, key.dataFormat.end) === obj2[key.originalIdentificator].substring(key.dataFormat.start, key.dataFormat.end)) {                  
                  const mergedObj = { ...obj1 };
                  
                  keysToMerge.forEach((key) => {
                    mergedObj[key.newIdentificator] = obj2[key.originalIdentificator];
                  });

                  result.push(mergedObj);
                }
                break;
            
              default:
                if (obj1[key.originalIdentificator] === obj2[key.originalIdentificator]) {
                  const mergedObj = { ...obj1 };

                  keysToMerge.forEach((key) => {
                    mergedObj[key.newIdentificator] = obj2[key.originalIdentificator];
                  });

                  result.push(mergedObj);
                }
                break;
            }
          }

          if (!key.dataFormat) {
            obj1[key.originalIdentificator] === obj2[key.originalIdentificator]
          }
        });
      } else if (logicalOperator.toUpperCase() === "OR") {
        keyValuesToMatch.some((key) => {
          if (key.dataFormat) {
            switch (key.dataFormat.option) {
              case 'substring':
                if (obj1[key.originalIdentificator].substring(key.dataFormat.start, key.dataFormat.end) === obj2[key.originalIdentificator].substring(key.dataFormat.start, key.dataFormat.end)) {                  
                  const mergedObj = { ...obj1 };

                  keysToMerge.forEach((key) => {
                    mergedObj[key.newIdentificator] = obj2[key];
                  });

                  result.push(mergedObj);
                }
                break;
            
              default:
                if (obj1[key.originalIdentificator] === obj2[key.originalIdentificator]) {
                  const mergedObj = { ...obj1 };

                  keysToMerge.forEach((key) => {
                    mergedObj[key.newIdentificator] = obj2[key];
                  });

                  result.push(mergedObj);
                }
                break;
            }
          }

          if (!key.dataFormat) {
            if (obj1[key.originalIdentificator] === obj2[key.originalIdentificator]) {
              const mergedObj = { ...obj1 };

              keysToMerge.forEach((key) => {
                mergedObj[key.newIdentificator] = obj2[key];
              });

              result.push(mergedObj);
            }
          }
        });
      } else {
        throw new Error("Invalid logical operator. Supported values: AND, OR");
      }
    });
  });

  return result;
};

/**
 * Merges two arrays of objects by matching key-value pairs and adding specified keys from the second array to the first.
 *
 * @param {Array} arrayThatIsChanged - The array of objects to be updated with the keys from the second array.
 * @param {Array} arrayThatChanges - The array of objects whose keys will be added to the first array.
 * @param {Array} keyValuesToMatch - An array of objects containing the originalIdentificator to match the key-value pairs in both arrays.
 * @param {Array} keysToMerge - An array of objects containing the originalIdentificator and newIdentificator for the keys to be merged from the second array to the first.
 * @param {string} [logicalOperator="AND"] - The logical operator to use when matching key-value pairs ("AND" or "OR").
 * @returns {Array} The resulting array of merged objects.
 * @throws Will throw an error if the logicalOperator is not "AND" or "OR".
 */
const matchObjectsByKeyValueAndMerge = (
  arrayThatIsOverwrited,
  arrayThatOverwrites,
  keyValuesToMatch,
  logicalOperator = "AND"
) => {
  try {    
    const result = [];
  
    arrayThatIsOverwrited.forEach((obj1) => {
      arrayThatOverwrites.forEach((obj2) => {
        let match;
  
        if (logicalOperator.toUpperCase() === "AND") {
          match = keyValuesToMatch.every((key) => obj1[key] === obj2[key]);
        } else if (logicalOperator.toUpperCase() === "OR") {
          match = keyValuesToMatch.some((key) => obj1[key] === obj2[key]);
        } else {
          throw new Error("Invalid logical operator. Supported values: AND, OR");
        }
  
        if (match) {
          const mergedObj = { ...obj1, ...obj2 };
          result.push(mergedObj);
        }
      });
    });
  
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Creates a new array of objects by matching key-value pairs between two arrays and copying the objects from the second array.
 *
 * @param {Array} arrayToMatch - The array of objects to be used for matching key-value pairs.
 * @param {Array} arrayToBecomeTheNew - The array of objects to be copied when creating the new array.
 * @param {Array} keyValuesToMatch - An array containing the key names to match in both arrays.
 * @param {string} [logicalOperator="AND"] - The logical operator to use when matching key-value pairs ("AND" or "OR").
 * @returns {Array} The resulting array of matched and copied objects.
 * @throws Will throw an error if the logicalOperator is not "AND" or "OR".
 */
const matchObjectsByKeyValueAndCreateNewArray = (
  arrayToMatch,
  arrayToBecomeTheNew,
  keyValuesToMatch,
  logicalOperator = "AND"
) => {
  const result = [];

  arrayToBecomeTheNew.forEach((obj1) => {
    let match;
    arrayToMatch.forEach((obj2) => {
      if (logicalOperator.toUpperCase() === "AND") {
        match = keyValuesToMatch.every((key) => obj1[key] === obj2[key]);
      } else if (logicalOperator.toUpperCase() === "OR") {
        match = keyValuesToMatch.some((key) => obj1[key] === obj2[key]);
      } else {
        throw new Error("Invalid logical operator. Supported values: AND, OR");
      }
    });
    if (match) {
      result.push({ ...obj1 });
    }
  });

  return result;
};

/**
 * Creates a new array of objects by unmatching key-value pairs between two arrays and merging the objects.
 *
 * @param {Array} arrayThatIsOverwrited - The array of objects to be overwritten by the second array.
 * @param {Array} arrayThatOverwrites - The array of objects that overwrites the first array.
 * @param {Array} keyValuesToMatch - An array containing the key names to match in both arrays.
 * @param {string} [logicalOperator="AND"] - The logical operator to use when matching key-value pairs ("AND" or "OR").
 * @returns {Array} The resulting array of unmatched and merged objects.
 * @throws Will throw an error if the logicalOperator is not "AND" or "OR".
 */
const unmatchObjectsByKeyValueAndMerge = (
  arrayThatIsOverwrited,
  arrayThatOverwrites,
  keyValuesToMatch,
  logicalOperator = "AND"
) => {
  const result = [];

  arrayThatIsOverwrited.forEach((obj1) => {
    arrayThatOverwrites.forEach((obj2) => {
      let match;

      if (logicalOperator.toUpperCase() === "AND") {
        match = keyValuesToMatch.every((key) => obj1[key] === obj2[key]);
      } else if (logicalOperator.toUpperCase() === "OR") {
        match = keyValuesToMatch.some((key) => obj1[key] === obj2[key]);
      } else {
        throw new Error("Invalid logical operator. Supported values: AND, OR");
      }

      if (!match) {
        const mergedObj = { ...obj1, ...obj2 };
        result.push(mergedObj);
      }
    });
  });

  return result;
};

/**
 * Creates a new array of objects from 'arrayToBecomeTheNew' that do not match objects from 'arrayToMatch' based on provided key values.
 *
 * @param {Array} arrayToMatch - The array of objects to check for matching values.
 * @param {Array} arrayToBecomeTheNew - The array of objects to become the new array if unmatched.
 * @param {Array} keyValuesToMatch - An array of key values to be used for matching objects.
 * @param {string} logicalOperator - The logical operator to use for comparison. Supported values: 'AND', 'OR'. Default: 'AND'.
 * @returns {Promise<Array>} A new array of objects that do not match objects from 'arrayToMatch' based on provided key values.
 * @throws Will throw an error if the logical operator is invalid.
 */
const unmatchObjectsByKeyValueAndCreateNewArray = async(
  arrayToMatch,
  arrayToBecomeTheNew,
  keyValuesToMatch,
  logicalOperator = "AND"
) => {
  const result = [];

  for (let i = 0; i < arrayToBecomeTheNew.length; i++) {
    const obj1 = arrayToBecomeTheNew[i];
    let checkMatch = false;
    for (let j = 0; j < arrayToMatch.length; j++) {
      const obj2 = arrayToMatch[j];
      if (logicalOperator.toUpperCase() === "AND") {
        match = await keyValuesToMatch.every((key) => obj1[key] === obj2[key]);
        if (match) {
          checkMatch = true;
        }
      } else if (logicalOperator.toUpperCase() === "OR") {
        match = await keyValuesToMatch.some((key) => obj1[key] === obj2[key]);
        if (match) {
          checkMatch = true;
        }
      } else {
        throw new Error("Invalid logical operator. Supported values: AND, OR");
      }
    }
    
    if (!checkMatch) {
      result.push({ ...obj1 });
    }
  }

  return result;
};
  
// Simple arrays
/**
 * Removes elements from the given array that match any value in the 'value' array.
 *
 * @param {Array} array - The array from which elements will be removed.
 * @param {Array} value - An array containing the values to be removed from the input array.
 * @returns {Array} A new array with elements removed that match any value in the 'value' array.
 */
const removeByValue = (array = [], value = []) => {
  return array.filter((element) => !value.includes(element));
};

/**
 * Removes repeated values from the given array.
 *
 * @param {Array} array - The array from which repeated values will be removed.
 * @returns {Array} A new array with repeated values removed.
 */
const removeRepeatedValues = (array = []) => {
  return array.filter((element, index) => array.indexOf(element) === index);
};

/**
 * Creates an array of file names found in the specified folder.
 *
 * @param {string} folderPath - The path to the folder whose files should be listed.
 * @returns {string[]} An array of file names found in the specified folder.
 * @throws Will throw an error if there's an issue while reading the folder content.
 */
const createArrayOverFolderFiles = (folderPath) => {
  try {
    const result = chp.execSync(`ls`, { cwd: folderPath });

    return result.toString().split(/\n/);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  changeObjectKeyIdentificator,
  removeByValue,
  removeObjectByKeyValue,
  removeRepeatedValues,
  removeObjectPropertyByKeyIdentificator,
  keepObjectByKeyValue,
  keepObjectPropertyByKeyIdentificator,
  matchObjectsByKeyValueAndAddKeysToMerge,
  matchObjectsByKeyValueAndMerge,
  matchObjectsByKeyValueAndCreateNewArray,
  unmatchObjectsByKeyValueAndMerge,
  unmatchObjectsByKeyValueAndCreateNewArray,
  createArrayOverFolderFiles,
};
