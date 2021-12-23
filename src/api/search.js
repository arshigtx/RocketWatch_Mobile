import data from '../data/data.json'

export default function search(query) {
  const rawResults = data.filter((item) => (item.name.startsWith(query) || item.symbol.startsWith(query.toUpperCase())));
  const results = rawResults.length > 0 ? 
  rawResults.map(({
    name,
    symbol,
    logo
  }) => ({ 
    name,
    symbol,
    logo
  })) 
  : [{name: "No results found", symbol: null}]
  return results;
}
