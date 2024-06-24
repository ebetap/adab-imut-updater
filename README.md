### `ImmutableUpdater` Class Documentation

#### Overview

The `ImmutableUpdater` class provides methods to immutably update, retrieve, delete, and merge nested properties within an object. It ensures that operations do not mutate the original object and instead return new instances with the desired modifications.

#### Constructor

##### `new ImmutableUpdater(obj)`

- **Parameters:**
  - `obj` (`Object`): The initial object to be managed immutably.

- **Description:**
  Initializes an instance of `ImmutableUpdater` with the specified object (`obj`).

#### Static Methods

##### `ImmutableUpdater.isObject(value)`

- **Parameters:**
  - `value` (`any`): The value to check.

- **Returns:**
  - `boolean`: `true` if `value` is a non-null object, otherwise `false`.

- **Description:**
  Checks if the provided `value` is a non-null object.

##### `ImmutableUpdater.cloneDeep(value)`

- **Parameters:**
  - `value` (`any`): The value to deep clone.

- **Returns:**
  - `any`: A deep clone of the provided `value`.

- **Description:**
  Creates a deep copy of `value`, ensuring nested objects and arrays are also cloned recursively.

##### `ImmutableUpdater.parsePath(path)`

- **Parameters:**
  - `path` (`string`): The dot-separated path string.

- **Returns:**
  - `Array<string>`: An array of keys extracted from the path.

- **Description:**
  Parses the dot-separated `path` string into an array of individual keys.

#### Instance Methods

##### `set(path, value)`

- **Parameters:**
  - `path` (`string`): The dot-separated path where the value should be set.
  - `value` (`any`): The value to set at the specified path.

- **Returns:**
  - `ImmutableUpdater`: A new instance of `ImmutableUpdater` with the updated object.

- **Description:**
  Sets the `value` at the specified `path` within the object. If the path doesn't exist, it creates nested objects or arrays as necessary.

- **Throws:**
  - `Error`: If `path` is not a non-empty string.

##### `get(path = null)`

- **Parameters:**
  - `path` (`string`, optional): The dot-separated path of the property to retrieve. If not provided, returns the entire object.

- **Returns:**
  - `any`: The value found at the specified path within the object, or the entire object if `path` is not specified.

- **Description:**
  Retrieves the value at the specified `path` within the object. Returns `undefined` if the path doesn't exist.

##### `delete(path)`

- **Parameters:**
  - `path` (`string`): The dot-separated path of the property to delete.

- **Returns:**
  - `ImmutableUpdater`: A new instance of `ImmutableUpdater` with the modified object after deletion.

- **Description:**
  Deletes the property at the specified `path` within the object. Returns a new object without mutating the original.

- **Throws:**
  - `Error`: If `path` is not a non-empty string.

##### `merge(path, value)`

- **Parameters:**
  - `path` (`string`): The dot-separated path where the object `value` should be merged.
  - `value` (`Object`): The object to merge into the specified path.

- **Returns:**
  - `ImmutableUpdater`: A new instance of `ImmutableUpdater` with the merged object.

- **Description:**
  Merges the `value` object into the specified `path` within the object. Creates nested objects as necessary.

- **Throws:**
  - `Error`: If `path` is not a non-empty string or `value` is not an object.

#### Error Handling

- All methods that require a `path` parameter throw an `Error` if the `path` is not a non-empty string.
- The `merge` method throws an `Error` if the `value` to merge is not an object.

### Example Usage

```javascript
// Create an instance of ImmutableUpdater with an initial object
const initialObject = {
  user: {
    name: "John",
    details: {
      age: 30,
      address: {
        city: "New York"
      }
    }
  }
};
const updater = new ImmutableUpdater(initialObject);

// Example: Updating a nested property
const updatedUser = updater.set("user.details.age", 31).get();
console.log(updatedUser);
// Output: { user: { name: "John", details: { age: 31, address: { city: "New York" } } } }

// Example: Deleting a nested property
const deletedUser = updater.delete("user.details.address").get();
console.log(deletedUser);
// Output: { user: { name: "John", details: { age: 30 } } }

// Example: Merging an object into a nested property
const mergedUser = updater.merge("user.details", { email: "john@example.com" }).get();
console.log(mergedUser);
// Output: { user: { name: "John", details: { age: 30, email: "john@example.com" } } }
```

### Conclusion

The `ImmutableUpdater` class provides a robust solution for managing immutable updates to nested objects. It ensures clarity and safety by maintaining immutability and providing comprehensive error handling. By using this class, developers can effectively manage and manipulate complex nested data structures while adhering to immutability principles.
