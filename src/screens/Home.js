import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ScreenContainer from '../components/core/ScreenContainer';
import Search from '../components/shared/Search';
import SearchResults from '../components/shared/SearchResults'
import CardSection from '../components/Home/CardSection';
import Text from '../components/core/Text';
import NewWatchlistModal from '../components/shared/NewWatchlistModal';
import WatchlistCardsSection from '../components/Home/WatchlistCardsSection';

import { refreshCryptoData } from '../redux/cryptoDataSlice';
import { updateWatchlists } from '../redux/watchlistsSlice';
import { updateTheme, changeStateCurrency } from '../redux/userPreferenceSlice';

import { getCurrentTheme, getCurrentCurrency } from '../storage/userpreference';

import { getWatchlists, initialCryptosToLoad, getWatchlistsByCrypto } from '../storage/watchlists';

import { getWinnersAndLosers, getCryptoNews, getCryptoData, searchCrypto } from '../api/cryptoDataApi';

import cardListConfig from '../config/cardListConfig';

export default function Home({ navigation }) {

  const dispatch = useDispatch();
  const { watchlists } = useSelector(state => state.watchlists)
  const { currency } = useSelector(state => state.userPreference)
 
  const [ newsData, setNewsData ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ newWatchlistModalVisible, setNewWatchlistModalVisible ] = useState(false);

  const onRefresh = useCallback( () => {
    setRefreshing(true);
    loadCryptoData({refresh: true})
    .catch(err => {
      console.log(err)
      setError(true);
    })
    .finally(() => {
      setRefreshing(false)
      error ? setError(false) : null;
    })  
  },[]);

  const addTagsToData = async (dataArr, tag) => {
    const tags = await Promise.all(dataArr.map(async data => await getWatchlistsByCrypto(data.slug)))
    const dataArrWithTags = await dataArr.map((data, i) => ({...data, tags: tag ?  [tag, ...tags[i]] : [...tags[i]] }))
    return dataArrWithTags;
  }

  const loadWatchlistCryptoData = async ({ initialCryptos, exclusions, curr }) => {
    const cryptosToLoad = removeAlreadyLoaded(initialCryptos, exclusions);
    if (cryptosToLoad.length > 0) {
      return await getCryptoData({slugs: cryptosToLoad, currency: curr});
    } else {
      return []
    }
  }

  const removeAlreadyLoaded = (dataToLoad, dataAlreadyLoaded) => {
    return dataToLoad.filter(item => !dataAlreadyLoaded.includes(item))
  }
  
  const loadCryptoData = async ({refresh}) => {
    //I dont like this, for some reason, when the currency is changed and screen is refreshed the redux state is producing
    //either the previous currency or null. this produces expected results but is hacky, needs to be fixed
    const currencyToUse = refresh ? await getCurrentCurrency() : currency

    // Get a list of the top 10 gaining and losing crypto's along with their associated data
    const topWinnersCryptoData = await getWinnersAndLosers({limit: 10, sortDir: 'desc', currency: currencyToUse});
    const topLosersCryptoData = await getWinnersAndLosers({limit: 10, sortDir: 'asc', currency: currencyToUse});

    // Create a new array of cryptos and their data adding in a property called "tags", which represents the lists
    // that the crypto belongs to. This could be a particular watchlist or manual tag which is the default homepage list
    const topWinnersCryptoDataWithTags = await addTagsToData(topWinnersCryptoData, "winners");
    const topLosersCryptoDataWithTags = await addTagsToData(topLosersCryptoData, "losers");

    // Get a list of the cryptos on the watchlists that are set to appear on the home screen
    const initialWatchlistCryptos = await initialCryptosToLoad();

    if (initialWatchlistCryptos.length > 0) {

      // List of crypto slugs that have already been loaded from the top winners and top losers lists
      const alreadyLoadedCryptoData = [
        ...topWinnersCryptoData.map(data => data.slug), 
        ...topLosersCryptoData.map(data => data.slug), 
      ]  

      // Getting the data for all of the cryptos that belong to watchlists that are set to appear on the
      // home screen. This also takes in a list of the crypots that have already been loaded so this data
      // not fetched twice unnessecarily
      const initialWatchlistCryptoData = await loadWatchlistCryptoData({
        initialCryptos: initialWatchlistCryptos, 
        exclusions: alreadyLoadedCryptoData,
        curr: currencyToUse
      });

      // Create a new array of cryptos and their data adding in a property called "tags", which represents the lists
      // that the crypto belongs to. This could be a particular watchlist or manual tag which is the default homepage list
      const initialWatchlistCryptoDataWithTags = await addTagsToData(initialWatchlistCryptoData);

      // Update our redux store with the data for all 3 lists, the top winners, the top losers, and the watchlist cryptos
      dispatch(refreshCryptoData([...topWinnersCryptoDataWithTags, ...topLosersCryptoDataWithTags, ...initialWatchlistCryptoDataWithTags]));

    } else {

      // If there were no cryptos from watchlists set to appear on the home screen, then just load the top winners and losers
      dispatch(refreshCryptoData([...topWinnersCryptoDataWithTags, ...topLosersCryptoDataWithTags]));  

    }
  }
  
  useEffect(() => {
    getCurrentCurrency()
      .then(result => dispatch(changeStateCurrency(result)))
      .catch(err => console.log(err))
    if (watchlists.length === 0) {
      getWatchlists()
        .then(result => dispatch(updateWatchlists(result)))
        .catch(err => console.log(err))
    }
    if (newsData.length === 0) {
      getCryptoNews()
        .then(result => setNewsData(result))
        .catch(err => console.log(err))
    }
    getCurrentTheme()
      .then(result => dispatch(updateTheme(result)))
      .catch(err => console.log(err))
  },[])

  useEffect(() => {
    if (currency) {
      loadCryptoData({refresh: false})
        .catch((err) => {
          console.log(err);
          setError(true);
        })
    }
  },[currency])
  
  return (
    <ScreenContainer>
      <Search 
        navigation={navigation} 
        searchFunction={searchCrypto}
      >
        <SearchResults />
      </Search>
      <ScrollView 
        scrollEventThrottle={50}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}} 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#F9E8DC'}
          />
        }
      >
        <WatchlistCardsSection 
          setModalVisible={setNewWatchlistModalVisible}
          navigation={navigation}
        />
        {!error ? cardListConfig.map((item, i) => (
          <CardSection
            key={`${item.type}-${i}`} 
            config={item}
            newsData={item.type === 'news' ? newsData : null} 
            navigation={navigation}
          />
        ))
        :
          <Text>Please check your connection and try again.</Text>
      }
      </ScrollView>
      <NewWatchlistModal 
        modalVisible={newWatchlistModalVisible}
        setModalVisible={setNewWatchlistModalVisible}
      />
    </ScreenContainer>
  )
}


