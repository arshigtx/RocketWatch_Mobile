import AsyncStorage from '@react-native-async-storage/async-storage';

exports.asyncGetAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    return keys;
  } catch (error) {
    console.log(error)
  }
}

exports.asyncClearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(error) {
    console.log(error);
  }
}

exports.asyncSetItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(error) {
    console.log(error)
  }
}

exports.asyncGetItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
}
