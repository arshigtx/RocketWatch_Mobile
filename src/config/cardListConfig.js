const cardListConfig = [
  {
    title: "Watchlist",
    type: 'price'
  }, 
  {
    title: 'News',
    type: 'news'
  },
  {
    title: "Top Winners",
    type: 'price', 
    sortBy: 'change',
    dir: 'asc'
  }, 
  {
    title: "Top Losers",
    type: 'price',
    sortBy: 'change',
    dir: 'desc'
  }];

export default cardListConfig;