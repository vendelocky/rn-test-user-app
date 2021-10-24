import AsyncStorage from "@react-native-async-storage/async-storage";

const parse = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.log(e);
  }

  return value;
};

const setItem = (key, value) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, JSON.stringify(value))
      .then(() => {
        resolve();
      })
      .catch((reason) => {
        console.error("AsyncStorage: ", reason.toString());
        reject(reason);
      });
  });
};

const getItem = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((value) => resolve(parse(value)))
      .catch((reason) => {
        console.error("AsyncStorage: ", reason.toString());
        reject(reason);
      });
  });
};

const removeItem = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(key)
      .then(() => {
        resolve();
      })
      .catch((reason) => {
        console.error("AsyncStorage: ", reason.toString());
        reject(reason);
      });
  });
};

const StringifyAsyncStorage = {
  setItem,
  getItem,
  removeItem,
};

export default StringifyAsyncStorage;
