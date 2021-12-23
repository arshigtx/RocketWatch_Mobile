
import {percentStringToNum} from '../utils/numberFormatting';

export function sortList(data, config) {
  const { sortBy, dir } = config;
  // console.log(sortBy);  
  const sortedList = dir === 'asc' 
    ? data.sort((a,b)  => percentStringToNum(b[sortBy]) - percentStringToNum(a[sortBy]))
    : data.sort((a,b)  => percentStringToNum(a[sortBy]) - percentStringToNum(b[sortBy]));

  // console.log(sortedList.map((item) => item.change))
  // console.log(sortedList)
  return sortedList;
}

