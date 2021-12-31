const cardListConfig = [
  {
    title: "Watchlist",
    type: 'price'
  }, 
  // {
  //   title: 'News',
  //   type: 'news'
  // },
  {
    title: "Top Winners",
    type: 'price', 
    sortBy: 'percent_change_24h',
    dir: 'asc'
  }, 
  {
    title: "Top Losers",
    type: 'price',
    sortBy: 'percent_change_24h',
    dir: 'desc'
  }];

export default cardListConfig;