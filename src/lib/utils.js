/**
 * Convert a JavaScript Map object to an array of plain objects
 * - Iterate over each key in the Map
 * - For each key, create a new object, place the corresponding Map value as
 *   the current object's value
 * - Return the new array of objects
 *
 *   @param m A Map object
 *   @return <Array>
 */
const mapToObjArray = (m) =>
  Array.from(m.keys()).map((k) => ({ [k]: m.get(k) }));

module.exports = {
  mapToObjArray,
};
