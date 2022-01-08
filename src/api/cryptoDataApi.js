import fetchAPI from './base';

const DEV_URL = 'http://192.168.0.15:3000/graphql'

export async function getTrendingCryptos(limit){
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query:
    `{
      listing(limit: ${limit}){
        id,
        name,
        symbol,
        slug,
        price,
        percent_change_24h,
        volume_24h,
        direction
      }
    }`
  })
  .then(result => result.data.listing)
  .catch(err => console.log(err));
}

export async function getOffsetCryptoData(limit, offset){
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query:
    `{
      offsetListing(limit: ${limit}, offset: ${offset}){
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
  .then(result => result.data.offsetListing)
  .catch(err => console.log(err));
}

export async function getCryptoMetadata(slugs){
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query: 
    `{
      metaData(slugs: ${JSON.stringify(slugs)}) {
        slug,
        description,
        logo,
        url
      }
    }`
  })
  .then(result => result.data.metaData)
  .catch(err => console.log(err))
}

export async function getChartData(slugs, range) {
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query: 
    `{
      chartData(slugs: ${JSON.stringify(slugs)}, range: "${range}") {
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

export async function searchCrypto(query) {
  return await fetchAPI(DEV_URL, 'POST', 
  {
    query: 
    `{
      search(query: "${query}") {
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


