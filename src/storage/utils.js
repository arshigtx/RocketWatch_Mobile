import AsyncStorage from '@react-native-async-storage/async-storage';

exports.initStorage = async () => {
 //NEED TO DO
  return await exports.asyncMultiSet(
    ['theme', 'dark'],
    ['currency', "USD"],
    ['watchlists', "[]"]
  )
  // await exports.asyncSetItem('theme', 'dark');
  // await exports.asyncSetItem('currency', "USD");
  // await exports.asyncSetItem('watchlists', "[]");
// return await exports.asyncGetItem('theme');
}

exports.asyncGetAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
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

exports.asyncMultiSet = async (kvp1, kvp2, kvp3) => {
  try {
    await AsyncStorage.multiSet([kvp1, kvp2, kvp3])
  } catch (error) {
    console.log(error)
  }
}
