import fetchAPI from './base';

export async function getTrendingCryptos(limit){
  return await fetchAPI('http://172.20.10.5:3000/graphql', 'POST', 
  {
    query:
    `{
      trending(limit: ${limit}){
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
  .then(result => result.data.trending)
  .catch(err => console.log(err));
}

export async function getCryptoMetadata(slugs){
  return await fetchAPI('http://172.20.10.5:3000/graphql', 'POST', 
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
  return await fetchAPI('http://172.20.10.5:3000/graphql', 'POST', 
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
  return await fetchAPI('http://172.20.10.5:3000/graphql', 'POST', 
  {
    query: 
    `{
      search(query: "${query}") {
        name,
        symbol,
        price,
        percent_change_24h,
        volume_24h,
        logo
      }
    }`
  })
  .then(result => result.data.search)
  .catch(err => console.log(err))
}

export async function getCryptoNews() {
  return await fetchAPI('http://172.20.10.5:3000/graphql', 'POST', 
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


