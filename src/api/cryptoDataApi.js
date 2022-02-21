import fetchAPI from './base';
import currencies from '../data/currencies';

const DEV_URL = 'http://192.168.0.15:3000/graphql';

export async function getWinnersAndLosers({limit, sortDir, currency}) {
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query:
    `{
      getTopWinnersAndLosersList(limit: ${limit}, sortDir: "${sortDir}", currency: "${currency}"){
        id,
        name,
        slug,
        symbol,
        url,
        description,
        logo,
        price,
        percent_change_24h,
        volume_24h,
        direction
      }
    }`
  })
  .then(result => result.data.getTopWinnersAndLosersList)
  .catch(err => console.log(err));
}

export async function getCryptoData({slugs, currency}) {
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query: 
    `{
      getCryptoData(slugs: ${JSON.stringify(slugs)}, currency: "${currency}") {
        id,
        name,
        slug,
        symbol,
        url,
        description,
        logo,
        price,
        percent_change_24h,
        volume_24h,
        direction
      } 
   }`
  })
  .then(result => result.data.getCryptoData)
  .catch(err => console.log(err))
}

export async function getOffsetCryptoData({limit, offset, currency}){
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query:
    `{
      allCryptoListOffset(limit: ${limit}, offset: ${offset}, currency: "${currency}"){
        name,
        slug,
        symbol,
        price,
        percent_change_24h,
        volume_24h,
        logo,
        direction
      }
    }`
  })
  .then(result => result.data.allCryptoListOffset)
  .catch(err => console.log(err));
}

export async function getChartData({slugs, range, currency}) {
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query: 
    `{
      chartData(slugs: ${JSON.stringify(slugs)}, range: "${range}", currency: "${currency}") {
        slug,
        chartData {
          price,
          time
        }
      } 
   }`
  })
  .then(result => result.data.chartData)
  .catch(err => console.log(err))
}

export async function searchCrypto({query, currency}) {
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query: 
    `{
      search(query: "${query}", currency: "${currency}") {
        name,
        slug,
        symbol,
        price,
        percent_change_24h,
        volume_24h,
        logo,
        direction
      }
    }`
  })
  .then(result => result.data.search)
  .catch(err => console.log(err))
}

export async function getCryptoNews() {
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query: 
    `{
      news {
        id,
        title,
        pubDate,
        link,
        source_id
      }
    }`
  })
  .then(result => result.data.news)
  .catch(err => console.log(err))
}

export function findCurrency({query}) {
  return currencies.filter(currency => (
    currency.symbol.startsWith(query.toUpperCase()) || currency.name.startsWith(query)
  ));
}



