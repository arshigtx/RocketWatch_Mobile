
import {percentStringToNum} from '../utils/numberFormatting';

export function sortList(data, config) {
  const { sortBy, dir } = config;
  const sortedList = (dir === 'asc') 
    ? data.sort((a,b)  => b[sortBy] - a[sortBy])
    : data.sort((a,b)  => a[sortBy] - b[sortBy]);

  // console.log(sortedList.map((item) => item.change))
  // console.log(sortedList)
  return sortedList;
}

