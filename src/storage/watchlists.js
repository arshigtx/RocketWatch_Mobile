import React, { useContext } from 'react';
import { asyncGetItem, asyncSetItem, asyncClearAll, asyncGetAllKeys } from '../storage/utils';
import uuid from 'react-native-uuid';

//Create new watchlist
exports.createWatchlist = async (name) => {
  const otherWatchlists = await exports.getWatchlists("watchlists");
  try {
    if (!otherWatchlists) {
      const jsonValue = JSON.stringify([{ 
        id: uuid.v4(), 
        name,
        data: []
      }]);
      await asyncSetItem("watchlists", jsonValue);
    } 
    else {
      const jsonValue = JSON.stringify([...otherWatchlists, { 
        id: uuid.v4(),
        name,
        data: []
      }]);
      await asyncSetItem("watchlists", jsonValue);
    }
    return exports.getWatchlists("watchlists");
  } catch (error) {
    console.log(error);
    return "Error: Watchlist could not be created";
  }
}

//Delete Watchlist 

exports.deleteWatchlist = async (id) => {
  const watchlists = await exports.getWatchlists("watchlists");
  try {
    const newWatchlists = watchlists.filter((watchlist) => watchlist.id !== id);
    const jsonValue = JSON.stringify(newWatchlists);
    await asyncSetItem("watchlists", jsonValue);
    return exports.getWatchlists("watchlists");
  } catch (error) {
    console.log(error);
    return `Not able to delete Watchlist id:${id}`
  }
}

//Add to existing watchlist
// exports.addToWatchlist = async (watchlist, cryptoData)

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
      "id": 1,
      "name": "watchlist1",
      "data": [
        {
          "id": "Int",
          "name": "String",
          "slug": "String",
          "logo": "String"
        },
        {
          "id": "Int",
          "name": "String",
          "slug": "String",
          "logo": "String"
        }
      ]
    },
    {
      "id": 1,
      "name": "watchlist1",
      "data": [
        {
          "id": "Int",
          "name": "String",
          "slug": "String",
          "logo": "String"
        },
        {
          "id": "Int",
          "name": "String",
          "slug": "String",
          "logo": "String"
        }
      ]
    },
    {
      "id": 1,
      "name": "watchlist1",
      "data": [
        {
          "id": "Int",
          "name": "String",
          "slug": "String",
          "logo": "String"
        },
        {
          "id": "Int",
          "name": "String",
          "slug": "String",
          "logo": "String"
        }
      ]
    }
  ]
}