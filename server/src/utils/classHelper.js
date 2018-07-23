/**
 * Returns the instance as a plain object filled with the getters
 */
function toPlainObject (instance) {
  const prototype = Object.getPrototypeOf(instance);
  const prototypeNames = Object.getOwnPropertyNames(prototype);
  const props = Object.getOwnPropertyNames(instance);
  const plainObject = {};
  // fill the plain object with the value of the getters
  prototypeNames.forEach(property => {
    if (Object.getOwnPropertyDescriptor(prototype, property).get) plainObject[property] = instance[property];
  });
  // fill the plain object with the public variables
  for (const prop of props) {
    if (prop.match(/^_/)) {
      continue;
    }
    plainObject[prop] = instance[prop];
  }
  return plainObject;
}

module.exports = { toPlainObject };
