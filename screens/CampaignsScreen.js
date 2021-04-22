import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import HeaderButton from '../components/HeaderButton';
import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
import { getDealerCampaignsRequest } from '../actions/dealerCampaigns';
// import { getDealerWipsRequest } from '../actions/dealerCampaigns';
// import { getDealerToolsRequest } from '../actions/dealerTools';
import CampaignsList from './CampaignsList';
import Colors from '../constants/Colors';
// import userDummyData from '../dummyData/userDummyData.js';
// import campaignsDummyData from '../dummyData/campaignsDummyData.js';
// import statsGrab from '../assets/images/stats.jpg';

const minSearchLength = 1;

export default DealerCampaignsScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const dealerCampaignsItems = useSelector(
    (state) => state.dealerCampaigns.dealerCampaignsItems
  );
  const [searchInput, setSearchInput] = useState('');
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const isLoading = useSelector((state) => state.stats.isLoading);
  const dataError = useSelector((state) => state.stats.error);
  const dataStatusCode = useSelector((state) => state.odis.statusCode);
  const dataErrorUrl = useSelector((state) => state.odis.dataErrorUrl);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const [filteredItems, setFilteredItems] = useState([]);
  const [uniqueDealerCampaignItems, setUniqueDealerCampaignItems] = useState(
    []
  );

  console.log('in campaigns screen - userDataObj is set to ', userDataObj);

  const userApiFetchParamsObj = {
    dealerId: (userDataObj && userDataObj.dealerId) || null,
    intId: (userDataObj && userDataObj.intId.toString()) || null,
  };

  console.log(
    'in campaigns screen - userApiFetchParamsObj is set to ',
    userApiFetchParamsObj,
    'dealerCampaignsItems ',
    dealerCampaignsItems
  );

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getDealerCampaignsData', getDealerCampaignsData);

  //   const { navigation } = props;

  const getItems = useCallback(async (userApiFetchParamsObj) => {
    console.log(
      'in campaigns getItems userApiFetchParamsObj',
      userApiFetchParamsObj
    );
    dispatch(getDealerCampaignsRequest(userApiFetchParamsObj)),
      [dealerCampaignsItems];
  });

  const getItemsAsync = async () => {
    console.log(
      'rendering DealerCampaigns screen, userApiFetchParamsObj:',
      userApiFetchParamsObj
    );

    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getItems(userApiFetchParamsObj);
    }
  };
  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in stats use effect');
  //     const getItemsAsync = async () => {
  //       setIsRefreshNeeded(false);
  //       getItems();
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     setIsRefreshNeeded(true);
  //   });

  //   useEffect(() => {
  //     // runs only once
  //     console.log('in campaigns useEffect', userApiFetchParamsObj);
  //     //   setGetWipsDataObj(userApiFetchParamsObj);
  //     getItemsAsync();
  //   }, [userApiFetchParamsObj]);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        revalidateUserCredentials({
          calledBy: 'Campaigns Screen',
        })
      );
      setSearchInput('');
      getItemsAsync();
    }, [userApiFetchParamsObj])
  );

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler');
    getItemsAsync();
  };

  //   if (!userIsValidated) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }
  //   const userDataPresent =
  //     (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  //   if (userDataPresent === true) {
  //     // console.log('in stats screen,userDataObj OK', userDataPresent);
  //   } else {
  //     // console.log('in stats screen, no userDataObj');
  //     getItems();
  //   }

  //   let uniqueDealerCampaignsSorted = sortObjectList(
  //     unsortedUniqueDealerCampaigns,
  //     'loanToolNo',
  //     'asc'
  //   );

  //   setUniqueDealerCampaignItems(dealerCampaignsItems);

  const dealerCampaignsItemsDataCount = 0;

  const searchInputHandler = (searchInput) => {
    setSearchInput(searchInput);
    if (searchInput && searchInput.length > minSearchLength) {
      let newFilteredItems = searchItems(
        uniqueDealerCampaignItems,
        searchInput
      );
      //   console.log(
      //     'LTP Screen  searchInputHandler for: ',
      //     searchInput && searchInput,
      //     'DealerCampaigns: ',
      //     DealerCampaigns && DealerCampaigns.length,
      //     'itemsToShow: ',
      //     itemsToShow && itemsToShow.length,
      //     'uniqueDealerCampaignItems: ',
      //     uniqueDealerCampaignItems && uniqueDealerCampaignItems.length,
      //     'newFilteredItems:',
      //     newFilteredItems && newFilteredItems.length,
      //     newFilteredItems
      //   );
      setFilteredItems(newFilteredItems);
    }
  };

  //   let itemsToShow = !isLoading
  //     ? searchInput && searchInput.length > minSearchLength
  //       ? filteredItems
  //       : uniqueDealerCampaignItems
  //     : [];

  const items = (!isLoading && !dataError && dealerCampaignsItems) || [];

  let itemsToShow =
    searchInput && searchInput.length > minSearchLength ? filteredItems : items;

  console.log('rendering DealerCampaigns screen, dataError:', dataError);

  return (
    <View style={baseStyles.containerFlexAndMargin}>
      <SearchBarWithRefresh
        dataName={'Campaigns items'}
        someDataExpected={true}
        refreshRequestHandler={refreshRequestHandler}
        searchInputHandler={searchInputHandler}
        searchInput={searchInput}
        dataError={dataError}
        dataStatusCode={dataStatusCode}
        isLoading={isLoading}
        dataCount={dealerCampaignsItems.length}
      />
      {dataError ? null : itemsToShow.length === 0 ? (
        searchInput.length >= minSearchLength ? (
          <View style={baseStyles.viewPromptRibbonNoneFound}>
            <Text style={baseStyles.textPromptRibbon}>
              Your search found no results.
            </Text>
          </View>
        ) : isLoading ? null : (
          <View style={baseStyles.viewPromptRibbon}>
            <Text style={baseStyles.textPromptRibbon}>
              No service measures to show. Try the refresh button.
            </Text>
          </View>
        )
      ) : (
        <View style={baseStyles.viewPromptRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Action these measures on the web site
          </Text>
        </View>
      )}
      {dataError ? (
        <ErrorDetails
          errorSummary={'Error syncing Service Measures'}
          dataStatusCode={dataStatusCode}
          errorHtml={dataError}
          dataErrorUrl={dataErrorUrl}
        />
      ) : (
        <View>
          <CampaignsList items={itemsToShow} />
        </View>
      )}
    </View>
  );
};
const titleString = 'S Measures';
// const tabBarLabelFunction = ({ focused }) => (
//   <BadgedTabBarText
//     showBadge={false}
//     text={titleString}
//     focused={focused}
//     value={0}
//   />
// );
export const screenOptions = (navData) => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,
    // tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarLabel: titleString,
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios' ? 'ios-checkbox-outline' : 'md-checkbox-outline'
        }
        size={size}
      />
    ),
  };
};
