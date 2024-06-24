class ImmutableUpdater {
  constructor(obj) {
    this.obj = obj;
  }

  static isObject(value) {
    return value !== null && typeof value === 'object';
  }

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

  static parsePath(path) {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const regex = /[^.[\]]+/g;
    return path.match(regex) || [];
  }

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

  get(path = '') {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const keys = ImmutableUpdater.parsePath(path);
    return keys.reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, this.obj);
  }

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
