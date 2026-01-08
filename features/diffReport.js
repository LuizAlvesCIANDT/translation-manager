/**
 * Flattens a nested object into a single-level object with dot-notation keys.
 */
const flattenObject = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix ? `${prefix}.` : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});

/**
 * Compares two objects and generates a report of added, removed, and changed items.
 */

const createDiffReport = (oldData, newData) => {
  const flatOld = flattenObject(oldData);
  const flatNew = flattenObject(newData);

  const report = {
    dictionary_item_added: {},
    dictionary_item_removed: {},
    values_changed: {},
  };

  const allKeys = new Set([...Object.keys(flatOld), ...Object.keys(flatNew)]);

  allKeys.forEach((key) => {
    const keyExistsInOld = key in flatOld;
    const keyExistsInNew = key in flatNew;

    if (!keyExistsInOld && keyExistsInNew) {
      report.dictionary_item_added[key] = flatNew[key];
    } else if (keyExistsInOld && !keyExistsInNew) {
      report.dictionary_item_removed[key] = flatOld[key];
    } else if (
      keyExistsInOld &&
      keyExistsInNew &&
      JSON.stringify(flatOld[key]) !== JSON.stringify(flatNew[key])
    ) {
      report.values_changed[key] = {
        old_value: flatOld[key],
        new_value: flatNew[key],
      };
    }
  });

  return report;
};

export { createDiffReport };
