export class ObjectKeysTransformation {
  // !TODO implement formatter from snail to Camel case
  toCamelCase() {
    console.log('todo');
  }

  toSnailCase<T>(values: T) {
    for (const key in values) {
      let shouldDelete = false;
      const snakeCaseKey = key.replace(/[A-Z]/g, (letter, index) => {
        shouldDelete = true;
        return index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase();
      });
      Object.assign(values, { [snakeCaseKey]: values[key] });
      if (shouldDelete) {
        delete values[key];
        shouldDelete = false;
      }
    }
    return values;
  }
}
