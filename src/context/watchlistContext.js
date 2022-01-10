import React, { createContext, useReducer } from 'react';

export const WatchlistContext = createContext([]);

export const WatchlistProvider = (props) => {

  const [state, dispatch] = useReducer(watchlistReducer, []);

  function updateWatchlists(newData) {
    dispatch({
      type: 'updateWatchlists',
      payload: newData
    });
  }

  return <WatchlistContext.Provider value={{ data: state, updateWatchlists}}>{props.children}</WatchlistContext.Provider>;
}

//reducer
export const watchlistReducer = (state, { type, payload }) => {
  switch(type) {
    case 'updateWatchlists':
      return payload
    default:
      return state;
  }
}

