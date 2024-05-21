import { I } from "./generalObj";

// eslint-disable-next-line consistent-return
export const deepCopy = (obj: I) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj: I, key: string) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    }, {} as I);
  }
};