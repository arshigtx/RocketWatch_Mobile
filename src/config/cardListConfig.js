const cardListConfig = [
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
  },
  {
    title: 'News',
    type: 'news'
  },
];

export default cardListConfig;