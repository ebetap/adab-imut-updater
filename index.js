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
    Object.entries(value).forEach(([key, val]) => {
      clone[key] = ImmutableUpdater.cloneDeep(val);
    });
    return clone;
  }

  static parsePath(path) {
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
      if (index === keys.length - 1) {
        if (acc[key] === value) {
          return acc[key]; // Skip if the value is the same
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

  get(path = null) {
    if (!path) {
      return this.obj;
    }

    const keys = ImmutableUpdater.parsePath(path);
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), this.obj);
  }

  delete(path) {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const keys = ImmutableUpdater.parsePath(path);
    const newObject = ImmutableUpdater.cloneDeep(this.obj);

    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        delete acc[key];
      } else {
        if (!ImmutableUpdater.isObject(acc[key])) {
          return {}; // Early exit if the path does not exist
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
      if (index === keys.length - 1) {
        if (!ImmutableUpdater.isObject(acc[key])) {
          acc[key] = {};
        }
        acc[key] = { ...acc[key], ...value };
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
    Object.entries(value).forEach(([key, val]) => {
      clone[key] = ImmutableUpdater.cloneDeep(val);
    });
    return clone;
  }

  static parsePath(path) {
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
      if (index === keys.length - 1) {
        if (acc[key] === value) {
          return acc[key]; // Skip if the value is the same
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

  get(path = null) {
    if (!path) {
      return this.obj;
    }

    const keys = ImmutableUpdater.parsePath(path);
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), this.obj);
  }

  delete(path) {
    if (typeof path !== 'string' || path === '') {
      throw new Error('Path must be a non-empty string.');
    }

    const keys = ImmutableUpdater.parsePath(path);
    const newObject = ImmutableUpdater.cloneDeep(this.obj);

    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        delete acc[key];
      } else {
        if (!ImmutableUpdater.isObject(acc[key])) {
          return {}; // Early exit if the path does not exist
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
      if (index === keys.length - 1) {
        if (!ImmutableUpdater.isObject(acc[key])) {
          acc[key] = {};
        }
        acc[key] = { ...acc[key], ...value };
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
