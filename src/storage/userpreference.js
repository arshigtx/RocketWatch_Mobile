import { asyncGetItem, asyncSetItem } from '../storage/utils';

exports.getCurrentTheme = async () => {
  const theme = await asyncGetItem('theme');
  return theme;
} 

exports.changeToDarkTheme = async () => {
  await asyncSetItem('theme', 'dark');
  return 'dark';
}

exports.changeToLightTheme = async () => {
  await asyncSetItem('theme', 'light');
  return 'light';
}

exports.getCurrentCurrency = async () => {
  const currency = await asyncGetItem('currency');
  return currency;
}
exports.changeLocalStorageCurrency = async (currency) => {
  await asyncSetItem('currency', currency);
  const newCurr = await exports.getCurrentCurrency('currency');
  return await exports.getCurrentCurrency('currency');
}
