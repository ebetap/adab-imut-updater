# ImmutableUpdater Documentation

The `ImmutableUpdater` class is a utility for performing immutable updates on nested objects. It allows for setting, getting, deleting, and merging values at specified paths within an object, ensuring that the original object remains unchanged.

## Class: ImmutableUpdater

### Constructor

#### `constructor(obj)`

Creates a new `ImmutableUpdater` instance.

- **Parameters:**
  - `obj` (Object): The initial object to operate on.

### Static Methods

#### `static isObject(value)`

Checks if a given value is an object (excluding null).

- **Parameters:**
  - `value` (*): The value to check.
- **Returns:**
  - `boolean`: True if the value is an object, false otherwise.

#### `static cloneDeep(value)`

Recursively clones an object or array.

- **Parameters:**
  - `value` (*): The value to clone.
- **Returns:**
  - `*`: The cloned value.

#### `static parsePath(path)`

Parses a dot-separated path string into an array of keys.

- **Parameters:**
  - `path` (string): The path string to parse.
- **Returns:**
  - `Array`: An array of keys parsed from the path.
- **Throws:**
  - `Error`: If the path is not a non-empty string.

### Instance Methods

#### `set(path, value)`

Sets a value at a specified path in the object and returns a new `ImmutableUpdater` instance with the updated object.

- **Parameters:**
  - `path` (string): The path where to set the value.
  - `value` (*): The value to set at the specified path.
- **Returns:**
  - `ImmutableUpdater`: A new `ImmutableUpdater` instance with the updated object.
- **Throws:**
  - `Error`: If the path is not a non-empty string or if the path does not exist in the object.

#### `get(path = '')`

Retrieves the value at a specified path in the object.

- **Parameters:**
  - `path` (string, optional): The path from where to retrieve the value.
- **Returns:**
  - `*`: The value at the specified path, or undefined if the path does not exist.
- **Throws:**
  - `Error`: If the path is not a non-empty string.

#### `delete(path)`

Deletes the property at a specified path in the object and returns a new `ImmutableUpdater` instance with the updated object.

- **Parameters:**
  - `path` (string): The path of the property to delete.
- **Returns:**
  - `ImmutableUpdater`: A new `ImmutableUpdater` instance with the updated object.
- **Throws:**
  - `Error`: If the path is not a non-empty string or if the path does not exist in the object.

#### `merge(path, value)`

Merges an object into the property at a specified path in the object and returns a new `ImmutableUpdater` instance with the updated object.

- **Parameters:**
  - `path` (string): The path where to merge the object.
  - `value` (Object): The object to merge at the specified path.
- **Returns:**
  - `ImmutableUpdater`: A new `ImmutableUpdater` instance with the updated object.
- **Throws:**
  - `Error`: If the path is not a non-empty string, if the path does not exist in the object, or if value is not an object.

## How to Use

### Initialization

To use the `ImmutableUpdater`, create an instance with the initial object:

```javascript
const initialObject = { a: { b: { c: 42 } } };
const updater = new ImmutableUpdater(initialObject);
```

### Setting a Value

To set a value at a specified path:

```javascript
const updated = updater.set('a.b.c', 100);
console.log(updated.obj); // { a: { b: { c: 100 } } }
```

### Getting a Value

To get a value from a specified path:

```javascript
const value = updater.get('a.b.c');
console.log(value); // 42
```

### Deleting a Property

To delete a property at a specified path:

```javascript
const updated = updater.delete('a.b.c');
console.log(updated.obj); // { a: { b: {} } }
```

### Merging an Object

To merge an object into the property at a specified path:

```javascript
const updated = updater.merge('a.b', { d: 50 });
console.log(updated.obj); // { a: { b: { c: 42, d: 50 } } }
```

## Error Handling

The methods in `ImmutableUpdater` will throw errors under certain conditions:
- If the path is not a non-empty string.
- If the specified path does not exist in the object.
- If the value to merge is not an object.

Make sure to handle these errors appropriately in your application.
