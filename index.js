/**
 * A utility class for performing immutable updates on nested objects.
 */
class ImmutableUpdater {
  /**
   * Constructs an ImmutableUpdater instance.
   * @param {Object} obj - The initial object to operate on.
   */
  constructor(obj) {
    this.obj = obj;
  }

  /**
   * Checks if a given value is an object (excluding null).
   * @param {*} value - The value to check.
   * @returns {boolean} True if the value is an object, false otherwise.
   */
  static isObject(value) {
    return value !== null && typeof value === 'object';
  }

  /**
   * Recursively clones an object or array.
   * @param {*} value - The value to clone.
   * @returns {*} The cloned value.
   */
  static cloneDeep(value) {
    if (!ImmutableUpdater.isObject(value)) {
      return value;
    }

    const clone = Array.isArray(value) ? [] : {};
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        clone[key] = ImmutableUpdater.cloneDeep(value[key]);
      }
    }
    return clone;
  }

  /**
   * Parses a dot-separated path string into an array of keys.
   * @param {string} path - The path string to parse.
   * @returns {Array} An array of keys parsed from the path.
   * @throws {Error} If path is not a non-empty string.
   */
  static parsePath(path) {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const regex = /[^.[\]]+/g;
    return path.match(regex) || [];
  }

  /**
   * Sets a value at a specified path in the object and returns a new ImmutableUpdater instance with the updated object.
   * @param {string} path - The path where to set the value.
   * @param {*} value - The value to set at the specified path.
   * @returns {ImmutableUpdater} A new ImmutableUpdater instance with the updated object.
   * @throws {Error} If path is not a non-empty string or if the path does not exist in the object.
   */
  set(path, value) {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const keys = ImmutableUpdater.parsePath(path);
    const newObject = ImmutableUpdater.cloneDeep(this.obj);

    keys.reduce((acc, key, index) => {
      if (!acc || acc[key] === undefined) {
        throw new Error(`Path '${keys.slice(0, index + 1).join('.')}' does not exist.`);
      }

      if (index === keys.length - 1) {
        if (acc[key] === value) {
          return acc[key];
        }
        acc[key] = value;
      } else {
        if (!ImmutableUpdater.isObject(acc[key])) {
          acc[key] = isNaN(keys[index + 1]) ? {} : [];
        }
        acc[key] = ImmutableUpdater.cloneDeep(acc[key]);
      }
      return acc[key];
    }, newObject);

    return new ImmutableUpdater(newObject);
  }

  /**
   * Retrieves the value at a specified path in the object.
   * @param {string} [path=''] - The path from where to retrieve the value.
   * @returns {*} The value at the specified path, or undefined if the path does not exist.
   * @throws {Error} If path is not a non-empty string.
   */
  get(path = '') {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const keys = ImmutableUpdater.parsePath(path);
    return keys.reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, this.obj);
  }

  /**
   * Deletes the property at a specified path in the object and returns a new ImmutableUpdater instance with the updated object.
   * @param {string} path - The path of the property to delete.
   * @returns {ImmutableUpdater} A new ImmutableUpdater instance with the updated object.
   * @throws {Error} If path is not a non-empty string or if the path does not exist in the object.
   */
  delete(path) {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const keys = ImmutableUpdater.parsePath(path);
    const newObject = ImmutableUpdater.cloneDeep(this.obj);

    keys.reduce((acc, key, index) => {
      if (!acc || acc[key] === undefined) {
        throw new Error(`Path '${keys.slice(0, index + 1).join('.')}' does not exist.`);
      }

      if (index === keys.length - 1) {
        delete acc[key];
      } else {
        if (!ImmutableUpdater.isObject(acc[key])) {
          return {};
        }
        acc[key] = ImmutableUpdater.cloneDeep(acc[key]);
      }
      return acc[key];
    }, newObject);

    return new ImmutableUpdater(newObject);
  }

  /**
   * Merges an object into the property at a specified path in the object and returns a new ImmutableUpdater instance with the updated object.
   * @param {string} path - The path where to merge the object.
   * @param {Object} value - The object to merge at the specified path.
   * @returns {ImmutableUpdater} A new ImmutableUpdater instance with the updated object.
   * @throws {Error} If path is not a non-empty string, if the path does not exist in the object, or if value is not an object.
   */
  merge(path, value) {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    if (!ImmutableUpdater.isObject(value)) {
      throw new Error('Value must be an object.');
    }

    const keys = ImmutableUpdater.parsePath(path);
    const newObject = ImmutableUpdater.cloneDeep(this.obj);

    keys.reduce((acc, key, index) => {
      if (!acc || acc[key] === undefined) {
        throw new Error(`Path '${keys.slice(0, index + 1).join('.')}' does not exist.`);
      }

      if (index === keys.length - 1) {
        if (!ImmutableUpdater.isObject(acc[key])) {
          acc[key] = {};
        }
        acc[key] = { ...acc[key], ...value }; // Using spread syntax for merging
      } else {
        if (!ImmutableUpdater.isObject(acc[key])) {
          acc[key] = isNaN(keys[index + 1]) ? {} : [];
        }
        acc[key] = ImmutableUpdater.cloneDeep(acc[key]);
      }
      return acc[key];
    }, newObject);

    return new ImmutableUpdater(newObject);
  }
}

export default ImmutableUpdater;
