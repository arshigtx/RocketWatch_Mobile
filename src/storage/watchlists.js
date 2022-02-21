import { asyncGetItem, asyncSetItem, asyncClearAll, asyncGetAllKeys, asyncMultiSet } from '../storage/utils';
import uuid from 'react-native-uuid';

exports.initWatchlistStorage = async () => {
  //WILL BE REPLACED WITH THE ONE IN UTILS.JS
  const watchlists = await exports.getWatchlists("watchlists");
  if (!watchlists) {
    const jsonValue = JSON.stringify([])
    await asyncSetItem("watchlists", jsonValue);
  }
}

exports.manual = async () => {
  const a =  [
    {
     "data":  [
       "digibyte",
       "ethereum",
       "bitcoin",
       "safemoon",
     ],
     "id": "313dc35a-66a0-4ae4-bff7-801192b050bb",
     "name": "real coins",
     "viewOnHome": true,
     "open": true,
     "date": 1644799786056,
   },
    {
     "data":  [
       "safemoon",
       "bitcoin",
     ],
     "id": "74bbce29-66ea-45cb-9174-591bf7f9b9d2",
     "name": "cool list",
     "viewOnHome": false,
     "open": true,
     "date": 1644799776056,
   },
 ]
 const jsonValue = JSON.stringify(a);

 await asyncSetItem("watchlists", jsonValue);

}
//Create new watchlist
exports.createWatchlist = async (name) => {
  const otherWatchlists = await exports.getWatchlists("watchlists");
  try {
    if (otherWatchlists.length === 0) {
      const jsonValue = JSON.stringify([{ 
        id: uuid.v4(), 
        name,
        data: [],
        viewOnHome: true,
        open: true,
        date: Date.now()
      }]);
      await asyncSetItem("watchlists", jsonValue);
    } 
    else {
      const jsonValue = JSON.stringify([...otherWatchlists, { 
        id: uuid.v4(),
        name,
        data: [],
        viewOnHome: false,
        open: true,
        date: Date.now()
      }]);
      await asyncSetItem("watchlists", jsonValue);
    }
    return await exports.getWatchlists("watchlists");
  } catch (error) {
    console.log(error);
    return "Error: Watchlist could not be created";
  }
}

//Delete Watchlist 
exports.deleteWatchlist = async (id) => {
  const watchlists = await exports.getWatchlists("watchlists");
  try {
    const newWatchlists = await watchlists.filter((watchlist) => watchlist.id !== id);
    const jsonValue = JSON.stringify(newWatchlists);
    await asyncSetItem("watchlists", jsonValue);
    return exports.getWatchlists("watchlists");
  } catch (error) {
    console.log(error);
    return `Not able to delete Watchlist id:${id}`
  }
}

//Add to existing watchlist
exports.addToWatchlist = async (id, { slug }) => {
  const watchlists = await exports.getWatchlists("watchlists");
  try {
    const updateWatchlist = await watchlists.filter((watchlist) => watchlist.id === id)[0];
    const watchlistData = updateWatchlist.data
    const doesCryptoExist = await watchlistData.includes(slug);
    if (!doesCryptoExist) {
      const newWatchlistData = [...watchlistData, slug];
      const newWatchlist = {...updateWatchlist};    
      newWatchlist.data = newWatchlistData
      const newWatchlists = [...watchlists].filter((watchlist) => watchlist.id !== id)
      newWatchlists.push(newWatchlist);
      const sortedArrs = newWatchlists.sort((a, b) => a.date - b.date);
      const jsonValue = JSON.stringify(sortedArrs);
      await asyncSetItem("watchlists", jsonValue);
    } 
    return await exports.getWatchlists("watchlists");
  } catch (error) {
    console.log(error)
    return `Not able to add to Watchlist id:${id}`
  }
}

//Remove from existing watchlist
exports.removeFromWatchlist = async (id, slug) => {
  const watchlists = await exports.getWatchlists("watchlists");
  try {
    const updateWatchlist = await watchlists.filter(watchlist => watchlist.id === id)[0];
    const watchlistData = updateWatchlist.data;
    const newWatchlistData = watchlistData.filter(data => data !== slug);
    const newWatchlist = {...updateWatchlist}
    newWatchlist.data = newWatchlistData
    const newWatchlists = [...watchlists].filter((watchlist) => watchlist.id !== id)
    newWatchlists.push(newWatchlist);
    const sortedArrs = newWatchlists.sort((a, b) => a.date - b.date);
    const jsonValue = JSON.stringify(sortedArrs);
    await asyncSetItem("watchlists", jsonValue);
    return await exports.getWatchlists("watchlists");
  } catch (error) {
    console.log(error)
  }
}

exports.getWatchlistsByCrypto = async (slug) => {
  const watchlists = await exports.getWatchlists("watchlists");
  try {
    return await watchlists.filter(watchlist => watchlist.data.includes(slug)).map(watchlist => watchlist.name)
  } catch (error) {
    console.log(error);
  }
}

exports.updateIsOpen = async (id) => {
  const watchlists = await exports.getWatchlists("watchlists");
  const watchlist = await watchlists.filter(watchlist => watchlist.id === id)[0];
  const indexOfWatchlist = await watchlists.findIndex(watchlist => watchlist.id === id);
  const newValue = !watchlist.open
  const updatedWatchlist = {...watchlist, open: newValue}
  const newWatchlists = [...watchlists].filter(watchlist => watchlist.id !== id)
  newWatchlists.splice(indexOfWatchlist, 0, updatedWatchlist);
  const jsonValue = JSON.stringify(newWatchlists);
  await asyncSetItem("watchlists", jsonValue);
  return newWatchlists;
} 
//Initial cryptos to load on homepage if visible
exports.initialCryptosToLoad = async () => {
  const watchlists = await exports.getWatchlists("watchlists");
  try {
    const viewOnHomeWatchlists = watchlists.filter((watchlist) => watchlist.viewOnHome);
    const arrOfData = viewOnHomeWatchlists.map(watchlist => watchlist.data)
    const flatArr = arrOfData.concat.apply([],arrOfData);
    const uniqueCryptos = flatArr.filter((item, i) => flatArr.indexOf(item) === i);
    return uniqueCryptos
  } catch (error) {
    console.log(error);
  }
}

//Delete from existing watchlist

//Delete Watchlist 

//Get watchlists
exports.getWatchlists = async () => {
  const result = await asyncGetItem("watchlists");
  const watchlists = JSON.parse(result);
  return watchlists
}

exports.clear = async () => {
  await asyncClearAll();
}

exports.allKeys = async () => {
  await asyncGetAllKeys();
}

const refernce = 
{
  "watchlists": [
    { 
      "id": 'Int',
      "name": 'String',
      "viewOnHome": 'Boolean',
      "open": 'Boolean',
      "data": 'Array<String>'
    }
  ]
}