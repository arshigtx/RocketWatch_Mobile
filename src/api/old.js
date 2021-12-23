const getChartData = async (name) => {
  let timeNow = formatUnix(new Date().getTime());
  let last24Hrs = timeNow - (48 *3600);
  // console.log([timeNow, last24Hrs]);
  let matchedName = await replaceSlug(name);
  let response = await fetch(`https://api.coingecko.com/api/v3/coins/${matchedName}/market_chart/range?vs_currency=usd&from=${last24Hrs}&to=${timeNow}`);
  let json = await response.json();
  let formatJson = await formatChartData(json.prices);
  return await formatJson;
}

const getCryptoLogo = async (ids) => {
  let response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${ids}`, {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': '5f066acc-d545-430c-8bcf-31f90554e677'
    }
  }) 
  let json = await response.json();
  return ids.map((id) => ({
    id: id,
    logo: json.data[id.toString()].logo
  }))
}

//ask for feedback on this
const getCryptoData = async () => {
  setIsLoading(true);
  let data, ids, names, logos, chartData;
  try {
    let response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20`, {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': '5f066acc-d545-430c-8bcf-31f90554e677'
        }
      }
    );
    let json = await response.json();
    data = json.data.map((item) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      price: `$${item.quote.USD.price.toFixed(2)}`,
      change: `${item.quote.USD.percent_change_24h}%`,
      volume: item.quote.USD.volume_24h,
      slug: item.slug,
      direction: item.quote.USD.percent_change_24h >= 0 ? 'up' : 'down'
    }));
    ids = data.map((item) => item.id);
    names = data.map((item) => item.slug);
  } catch (error) {
    console.error(error);
  }
  try {
    logos = await getCryptoLogo(ids);
  } catch (error) {
    console.error(error);
  }
  try {
    chartData = await Promise.all(names.map((name) => getChartData(name)));
    // console.log(chartData);
  } catch (error) {
    console.error(error)
  }
  const mergedData = data.map((item, i) =>  ({
    ...item, 
    logo: logos[i].logo,
    chartData: chartData[i]
  }));
  setCryptoData([...mergedData]);
  setRefreshing(false)
  setIsLoading(false);
}
